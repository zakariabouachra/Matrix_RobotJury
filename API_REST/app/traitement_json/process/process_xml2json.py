import os
from lxml import etree
import json
from ..convert.convert_structure import convert_structure
from app.services import aw_service

def process_documents_json(xml_file_path, filename):
    try:
        if not filename:
            raise ValueError("Le nom de fichier est invalide.")
        
        if not os.path.isfile(xml_file_path):
            raise FileNotFoundError(f"Le fichier XML spécifié n'existe pas : {xml_file_path}")

        tree = etree.parse(xml_file_path)
        root = tree.getroot()
        converted_result = convert_structure(root)

        json_data = json.dumps(converted_result, ensure_ascii=False, indent=4)
        if json_data:
            json_file_path = os.path.splitext(filename)[0] + ".json"
            with open(json_file_path, 'w', encoding='utf-8') as json_file:
                json_file.write(json_data)
            json_s3_link = aw_service.upload(json_file_path, filename, "json")
            return json_s3_link

    except etree.ParseError as parse_error:
        print(f"Erreur de parsing XML : {parse_error}")
    except json.JSONDecodeError as json_error:
        print(f"Erreur de décodage JSON : {json_error}")
    except FileNotFoundError as file_error:
        print(file_error)
    except Exception as e:
        print(f"Erreur lors du traitement des documents : {e}")
        return None
