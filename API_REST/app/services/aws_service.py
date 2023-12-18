import boto3
import os
from dotenv import load_dotenv
import requests
import tempfile

load_dotenv()

class AWSService:
    def __init__(self):
        aws_access_key_id = os.getenv('AWS_ACCESS_KEY_ID')
        aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')
        aws_bucket_name = os.getenv('AWS_BUCKET_NAME')
        aws_region = os.getenv('AWS_REGION')

        self.bucket_name = aws_bucket_name
        self.region = aws_region

        self.s3 = boto3.client(
            's3',
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key,
            region_name=aws_region
        )

    def upload(self, local_file_path, s3_file_name, folder):
        try:
            s3_path = f"{folder}/{s3_file_name}" if folder else s3_file_name

            self.s3.upload_file(local_file_path, self.bucket_name, s3_path)
            return f"https://{self.bucket_name}.s3.{self.region}.amazonaws.com/{s3_path}"
        except Exception as e:
            print(f"Erreur lors de l'upload du fichier : {str(e)}")
            return None
        
    def download_pdf_to_temp(self, url):
        try:
            response = requests.get(url)
            response.raise_for_status()

            temp_pdf = tempfile.NamedTemporaryFile(suffix=".pdf", delete=False)
            temp_pdf_path = temp_pdf.name
            temp_pdf.write(response.content)
            temp_pdf.close()

            return temp_pdf_path
        except Exception as e:
            print(f"Erreur lors du téléchargement du fichier : {str(e)}")
            return None
