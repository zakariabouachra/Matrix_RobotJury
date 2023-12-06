import openai
from transformers import BertTokenizer, BertModel
import torch
import PyPDF2
#from googletrans import Translator
import warnings
warnings.filterwarnings('ignore')
from sklearn.model_selection import KFold, cross_val_score
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.neural_network import MLPClassifier

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
 
        text = ''
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text += page.extract_text()
            text = text[:15000]
            #translator = Translator()
            #text  = translator.translate(text, src='auto', dest='fr')
 
    return text
 
#Traduction
#txt="L'article intitulé Walwei, Ulrich Article plus âgé: réserve du personnel pour le travail de resserrement et les travailleurs qualifiés?"" met en lumière la difficulté croissante des entreprises à recruter non seulement des travailleurs qualifiés, mais aussi du personnel pour des activités plus simples. L'auteur, Ulrich Walwei, suggère que la situation du marché du travail pourrait continuer de s'aggraver en raison des évolutions démographiques, de la numérisation et de la décarbonisation, entrainant ainsi une pénurie et un vieillissement simultané de l'offre de main-d'"

def Prediction(pdf):

    text = extract_text_from_pdf(pdf)
 
    #Extraire le resume avec openai
    openai.api_key = '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'
    response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-1106",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Resumer le texte suivant : \n{text}"}
            ],
            max_tokens=150
        )
    
    sum = response['choices'][0]['message']['content'].strip()
    
    #Embeddings
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    model = BertModel.from_pretrained('bert-base-uncased')
    input_ids = tokenizer.encode(sum, add_special_tokens=True)
    input_ids = torch.tensor([input_ids])
    with torch.no_grad():
        outputs = model(input_ids)
        last_hidden_states = outputs.last_hidden_state
        embedding = torch.mean(last_hidden_states, dim=1).squeeze().numpy()
    embedding = embedding.reshape(1, -1)
    #prediction
    # model = joblib.load(r'C:\Users\Admin\Documents\2023\Automne\Documentation_Technique\Projet\Entrainement')


    filename = r'C:\Users\zikot\OneDrive\Documents\MESCOURSTECCART\Matrix_RobotJury\API_REST\RobotJury\embeddingsEtq.csv'
    data = pd.read_csv(filename)
    label_encoder = LabelEncoder()
    data['Classe'] = label_encoder.fit_transform(data['Classe'])

    #array = data.values
    X = data.drop(columns=['Classe'])
    Y = data['Classe']
    #num_fold = 7
    #seed = 10
    final_model = MLPClassifier()
    #kfold = KFold(n_splits = num_fold, random_state = seed, shuffle = True)
    #accuracy_scores = cross_val_score(final_model, X, Y, cv=kfold, scoring='accuracy')
    #precision = cross_val_score(final_model, X, Y, cv=kfold, scoring='precision')
    #recall = cross_val_score(final_model, X, Y, cv=kfold, scoring='recall')
    final_model.fit(X, Y)
    prediction = final_model.predict(embedding)
    #print (prediction)

    return prediction