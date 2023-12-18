from ..grobid_client.grobid_client import GrobidClient
import tempfile
import os
import shutil
from app.services import aw_service
from ..traitement_json.process.process_xml2json import process_documents_json

def process_documents(pdf_file,filename, n=24):
    try:
        with tempfile.TemporaryDirectory() as temp_pdf_dir:
            # Copier le fichier PDF dans le dossier temporaire
            temp_pdf_path = os.path.join(temp_pdf_dir, os.path.basename(pdf_file))
            shutil.copy(pdf_file, temp_pdf_path)
            #temp_pdf_dir = temp_pdf_dir.replace('\\', '/')

            with tempfile.TemporaryDirectory() as temp_output_dir:
                client = GrobidClient("https://kermitt2-grobid.hf.space", 1)
                client.process("processFulltextDocument", temp_pdf_dir, n=n,
                            output=temp_output_dir, consolidate_header=True, 
                            consolidate_citations=True, force=True, segment_sentences=True)
                            
                xml_files = [os.path.join(temp_output_dir, f) for f in os.listdir(temp_output_dir) if f.endswith('.xml')]
                if xml_files:
                    filename_base, _ = os.path.splitext(filename)
                    print(filename_base)
                    filename_with_xml_extension = filename_base + ".json"
                    print(filename_with_xml_extension)
                    xml_s3_link = aw_service.upload(xml_files[0], os.path.basename(filename), "xml")
                    json_s3_link = process_documents_json(xml_files[0],filename_with_xml_extension)
                    return xml_s3_link, json_s3_link

    except Exception as e:
        print(f"Erreur lors du traitement des documents : {e}")
        return None
