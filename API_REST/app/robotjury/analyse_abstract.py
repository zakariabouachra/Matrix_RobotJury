import spacy
from sentence_transformers import SentenceTransformer, util
import language_tool_python
import pandas as pd
from tqdm import tqdm
import json
import os
from textblob import TextBlob
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np
from collections import Counter
from transformers import AutoTokenizer, AutoModel
from sklearn.metrics.pairwise import cosine_similarity
import torch

# Initialisation de spaCy
nlp = spacy.load("en_core_web_sm")

# Charger le modèle SentenceTransformer
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

# Initialiser l'outil de vérification de la langue
tool = language_tool_python.LanguageTool('en-US')

# Fonction pour extraire les mots-clés
def extract_keywords(text, num_keywords=5):
    vectorizer = CountVectorizer(stop_words='english').fit([text])
    token_count = vectorizer.transform([text]).toarray()[0]
    keywords = [word for word, count in zip(vectorizer.get_feature_names_out(), token_count) if count > 0]
    return sorted(keywords, key=lambda x: -token_count[vectorizer.vocabulary_[x]])[:num_keywords]

# Lire les données prétraitées du fichier JSON
chemin_json_pretraites = 'D:/robotjury/lastDataSet/articles_pretraites.json'
with open(chemin_json_pretraites, 'r', encoding='utf-8') as file:
    donnees_pretraitees = json.load(file)
donnees_pretraitees_dict = {article['ID']: article for article in donnees_pretraitees}

# Parcourir les fichiers JSON dans le dossier
dossier_json = 'json/'
fichiers_json = [f for f in os.listdir(dossier_json) if f.endswith(".json")]

donnees_tous_articles = []


with tqdm(total=len(fichiers_json), desc="Traitement des abstracts") as pbar:
    for nom_fichier in fichiers_json:
        chemin_fichier = os.path.join(dossier_json, nom_fichier)
        with open(chemin_fichier, 'r', encoding='utf-8') as file:
            article = json.load(file)
            id_article = str(article["ID"])
            abstract_init = article["abstract"]

            if id_article in donnees_pretraitees_dict:
                donnees_article = donnees_pretraitees_dict[id_article]
                titre = donnees_article["Titre_preprocess"]
                resume = donnees_article["Resume_preprocess"]
                corps_article = donnees_article["Corps_article_preprocess"]

                # Analyse de sentiment de l'abstract
                sentiment_analysis = TextBlob(abstract_init).sentiment
                polarite = sentiment_analysis.polarity
                subjectivite = sentiment_analysis.subjectivity

                # Extraction des mots-clés de l'abstract
                mots_cles_abstract = extract_keywords(abstract_init)

                # Vérifier la présence des mots-clés dans le titre
                mots_cles_dans_titre = [mot for mot in mots_cles_abstract if mot in titre]


                # Calculer la similarité de l'abstract 
                abstract_embedding = model.encode(abstract_init, convert_to_tensor=True)
                titre_embedding = model.encode(titre, convert_to_tensor=True)
                corps_embeddings = [model.encode(section_text, convert_to_tensor=True) for section_text in corps_article.values()]
                similarite_titre_abstract = util.pytorch_cos_sim(titre_embedding, abstract_embedding).item()
                similarites = [util.pytorch_cos_sim(abstract_embedding, corps_emb).item() for corps_emb in corps_embeddings]
                similarite_moyenne = np.mean(similarites)

                # Interprétations basées sur les analyses
                interpretation_polarite = "Positif" if polarite > 0 else "Négatif" if polarite < 0 else "Neutre"
                interpretation_subjectivite = "Subjectif" if subjectivite > 0.5 else "Objectif"
                interpretation_similarite = "Élevée" if similarite_moyenne > 0.5 else "Faible"
                interpretation_mots_cles = f"Mots-clés trouvés dans le titre: {'Oui' if mots_cles_dans_titre else 'Non'}"

                # Critères de pertinence
                pertinence_criteria = {
                    "similarite_titre_abstract": similarite_titre_abstract > 0.5,
                    "similarite_moyenne_corps": similarite_moyenne > 0.5,
                    "mots_cles_dans_titre": bool(mots_cles_dans_titre),
                    "ton_positif": polarite > 0,
                    "ton_neutre": polarite == 0,
                    "objectivite": subjectivite < 0.5
                }

                # Calculer le score de pertinence (nombre de critères respectés)
                score_pertinence = sum(pertinence_criteria.values())
                est_pertinent = score_pertinence >= 4
                interpretation_pertinence = est_pertinent

                # Conclusion sur la pertinence
                #conclusion_pertinence = (
                    #f"Analyse de pertinence de l'Abstract ID {id_article}:\n"
                    #f" - Pertinence de l'abstract: {interpretation_pertinence} ({score_pertinence} sur {len(pertinence_criteria)} critères respectés)\n"
                    #f" - Similarité titre-abstract: {similarite_titre_abstract:.2f}\n"
                    #f" - Similarité moyenne avec le corps: {similarite_moyenne:.2f}\n"
                    #f" - Mots-clés dans le titre: {'Oui' if mots_cles_dans_titre else 'Non'}\n"
                    #f" - Polarité: {polarite:.2f}, Subjectivité: {subjectivite:.2f}\n"
                #)
                #print(conclusion_pertinence)


                # Analyse de répétition des mots et longueur de l'abstract
                mots = abstract_init.split()
                frequence_mots = Counter(mots)
                repetitions_elevées = any(freq > 10 for mot, freq in frequence_mots.items()) 
                longueur_abstract = len(mots)
                est_trop_long = longueur_abstract > 1000  # Vérifier si l'abstract est trop long

                # Vérification de la clarté de l'abstract
                erreurs_grammaticales = tool.check(abstract_init)
                erreurs_presentes = len(erreurs_grammaticales) > 0
                mots_uniques = len(set(mots))
                diversite_vocabulaire = mots_uniques / longueur_abstract if longueur_abstract > 0 else 0

                clarte_abstract = True if not erreurs_grammaticales and diversite_vocabulaire > 0.5 and not repetitions_elevées and not est_trop_long else False

                # Conclusion sur la clarté
                #conclusion_clarte = (
                    #f"Évaluation de la clarté de l'Abstract ID {id_article}:\n"
                    #f" - Clarté de l'abstract: {clarte_abstract}\n"
                    #f" - Erreurs grammaticales: {len(erreurs_grammaticales)}\n"
                    #f" - Diversité du vocabulaire: {diversite_vocabulaire:.2f}\n"
                    #f" - Répétitions excessives: {'Oui' if repetitions_elevées else 'Non'}\n"
                    #f" - Longueur excessive: {'Oui' if est_trop_long else 'Non'} (Mots: {longueur_abstract})\n"
                #)
                #print(conclusion_clarte)

                # Stocker les données de l'article
                donnees_tous_articles.append({
                    "Abstract": abstract_init,
                    "Similarite abstract-title": similarite_titre_abstract,
                    "Similarite abstract-body": similarite_moyenne,
                    "Mots-cles in title": True if mots_cles_dans_titre else False,
                    "est_trop_long": est_trop_long,
                    "divirsite": diversite_vocabulaire,
                    "erreurs_presentes": erreurs_presentes,
                    "repetitions_elevees" : True if repetitions_elevées else False,
                    "Clarte": clarte_abstract,
                    "Pertinence": interpretation_pertinence
                })


            else:
                print(f"ID {id_article} non trouvé dans les données prétraitées.")
                continue

            pbar.update(1)

# Créer un DataFrame à partir des données de tous les articles
df = pd.DataFrame(donnees_tous_articles)

# Enregistrer le DataFrame au format CSV
df.to_csv('D:/robotjury/lastDataSet/analyse_abstracts.csv', index=False)
print(df)