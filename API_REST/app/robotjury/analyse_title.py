import spacy
from sentence_transformers import SentenceTransformer, util
import language_tool_python
import pandas as pd
from tqdm import tqdm
import json
import os

spacy.require_gpu()
# Initialisation de spaCy
nlp = spacy.load("en_core_web_sm")

# Charger le modèle SentenceTransformer
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

# Initialiser l'outil de vérification de la langue
tool = language_tool_python.LanguageTool('en-US')

# Lire les données prétraitées du fichier JSON
chemin_json_pretraites = 'D:/robotjury/lastDataSet/articles_pretraites.json'
with open(chemin_json_pretraites, 'r', encoding='utf-8') as file:
    donnees_pretraitees = json.load(file)
donnees_pretraitees_dict = {article['ID']: article for article in donnees_pretraitees}

# Liste pour stocker les données de tous les articles
donnees_tous_articles = []

# Parcourir les fichiers JSON dans le dossier
dossier_json = 'json/'
fichiers_json = [f for f in os.listdir(dossier_json) if f.endswith(".json")]

with tqdm(total=len(fichiers_json), desc="Traitement des titres") as pbar:
    for nom_fichier in fichiers_json:
        chemin_fichier = os.path.join(dossier_json, nom_fichier)
        with open(chemin_fichier, 'r', encoding='utf-8') as file:
            article = json.load(file)
            id_article = str(article["ID"])
            titre_init = article["title"]

        if id_article in donnees_pretraitees_dict:
            donnees_article = donnees_pretraitees_dict[id_article]
            titre = donnees_article["Titre_preprocess"]
            resume = donnees_article["Resume_preprocess"]
            corps_article = donnees_article["Corps_article_preprocess"]

            # Calculer les embeddings du titre et du résumé
            titre_embedding = model.encode(titre, convert_to_tensor=True)
            resume_embedding = model.encode(resume, convert_to_tensor=True)

            corps_embeddings = []

            for section, texte in corps_article.items():
                body = f"{section}\n:{texte}\n"
                corps_embedding = model.encode(body, convert_to_tensor=True)
                corps_embeddings.append(corps_embedding)

            similarity_titre_resume = util.pytorch_cos_sim(titre_embedding, resume_embedding).item()
            seuil_similarite_resume = 0.7

            similarity_titre_corps_sections = [util.pytorch_cos_sim(titre_embedding, corps_embedding).item() for corps_embedding in corps_embeddings]

            seuil_similarite_body = 0.4

            similarite_sections = {}  # Un dictionnaire pour stocker la similarité pour chaque section

            for i, similarity in enumerate(similarity_titre_corps_sections):
                section = list(corps_article.keys())[i]
                similarite_sections[section] = similarity  # Stockez la similarité pour chaque section

            # Somme des similarités de toutes les sections
            somme_similarites = sum(similarite_sections.values())

            # Seuil global
            seuil_global = 2.0  # Remplacez ceci par votre seuil global souhaité

            # Comparer la somme des similarités au seuil global
            pertinence = somme_similarites >= seuil_global

            # Vérification de la clarté du titre
            doc = nlp(titre_init)
            erreurs_grammaticales_syntaxe = tool.check(titre)
            erreurs_presentes = len(erreurs_grammaticales_syntaxe) > 0
            structure_grammaticale_correcte = not erreurs_presentes
            mots_du_titre = titre.split()
            longueur_titre = len(mots_du_titre)
            est_trop_long = longueur_titre > 150
            mots_uniques = list(set(mots_du_titre))
            proportion_mots_uniques = len(mots_uniques) / len(mots_du_titre)
            seuil_proportion_mots_uniques = 0.5
            resultat_clarte_titre = (
                structure_grammaticale_correcte and
                not est_trop_long and
                proportion_mots_uniques >= seuil_proportion_mots_uniques and
                not erreurs_presentes
            )

            # Stocker les données de l'article
            donnees_tous_articles.append({
                "Titre": titre_init,
                "Similarite title-abstract": similarity_titre_resume,
                "Similarite title-body": somme_similarites,
                "structure_grammaticale_correcte": structure_grammaticale_correcte,
                "est_trop_long": est_trop_long,
                "proportion_mots_uniques": proportion_mots_uniques,
                "erreurs_presentes": erreurs_presentes,
                "Clarte": resultat_clarte_titre,
                "Pertinence": pertinence
            })
        else:
            print(f"ID {id_article} non trouvé dans le CSV.")
            continue
        pbar.update(1)


# Créer un DataFrame à partir des données de tous les articles
df = pd.DataFrame(donnees_tous_articles)

# Enregistrer le DataFrame au format CSV
df.to_csv('D:/robotjury/lastDataSet/analyse_titres.csv', index=False)
print(df)
