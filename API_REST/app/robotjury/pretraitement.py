import json
import spacy
import re
import os
from tqdm import tqdm  # Importez tqdm
#import pandas as pd  # Importez pandas

spacy.require_gpu()
# Initialisation de spaCy
nlp = spacy.load("en_core_web_sm")

def preprocess_text(text):
    # Suppression des caractères spéciaux et normalisation
    text = re.sub(r'[\r\n]+', ' ', text)  # Remplacement des sauts de ligne et retours chariot
    text = re.sub(r'\s+', ' ', text)  # Suppression des espaces multiples
    text = text.lower()  # Conversion en minuscules

    # Traitement NLP avec spaCy
    doc = nlp(text)
    tokens = []
    for token in doc:
        if not token.is_stop and not token.is_punct:
            tokens.append(token.lemma_)
    return ' '.join(tokens)

def lire_article_json(dossier_json):
    donnees_articles = []
    
    # Récupérez le nombre total d'articles pour la barre de progression
    nombre_total_articles = len([f for f in os.listdir(dossier_json) if f.endswith(".json")])
    
    # Créez une barre de progression
    with tqdm(total=nombre_total_articles, desc="Traitement des articles") as pbar:
        for fichier in os.listdir(dossier_json):
            if fichier.endswith(".json"):
                chemin_fichier = os.path.join(dossier_json, fichier)

                # Lire le JSON
                with open(chemin_fichier, 'r', encoding='utf-8') as file:
                    data = json.load(file)

                # Extraction des données de base
                id = data.get('ID', 'id non disponible')
                titre = preprocess_text(data.get('title', 'Titre non disponible'))
                #titre_init = data.get('title', 'Titre non disponible')
                resume = preprocess_text(data.get('abstract', 'Résumé non disponible'))
                auteurs = preprocess_text(data.get('authors', 'Auteurs non disponibles'))
                mots_cles = preprocess_text(data.get('keywords', 'Mots-clés non disponibles'))

                # Traitement du corps de l'article
                corps_data = data.get('body', {})
                corps_article = {}
                for section, contenu in corps_data.items():
                    if isinstance(contenu, list):
                        corps_article[section] = preprocess_text('\n'.join(contenu))
                    else:
                        corps_article[section] = 'Format de section non reconnu'

                # Traitement des références
                #references_data = data.get('References', [])
                #if isinstance(references_data, list):
                    #references = preprocess_text('\n'.join(references_data))
                #else:
                    #references = 'Format des références non reconnu'

                donnees_articles.append({
                    "ID":id,
                    "Titre_preprocess": titre,
                    "Resume_preprocess": resume,
                    "Auteurs_preprocess": auteurs,
                    "Mots_cles_preprocess": mots_cles,
                    "Corps_article_preprocess": corps_article,
                })
                
                # Mise à jour de la barre de progression
                pbar.update(1)

    chemin_fichier_json = "D:/robotjury/lastDataSet/articles_pretraites.json"
    with open(chemin_fichier_json, 'w', encoding='utf-8') as fichier_json:
        json.dump(donnees_articles, fichier_json, ensure_ascii=False, indent=4)
    # Convertissez les données en DataFrame pandas
    #df = pd.DataFrame(donnees_articles)
    
    # Sauvegardez le DataFrame dans un fichier CSV
    #df.to_csv("D:/robotjury/lastDataSet/articles_pretraites.csv", index=False)

    #return donnees_articles  

if __name__ == "__main__":
    dossier_json = 'D:/robotjury/datasets2/json/'
    lire_article_json(dossier_json)