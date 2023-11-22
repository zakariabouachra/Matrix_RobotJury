import boto3
import os
from dotenv import load_dotenv

load_dotenv()

class PdfService:
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

    def upload_pdf(self, local_file_path, s3_file_name):
        try:
            self.s3.upload_file(local_file_path, self.bucket_name, s3_file_name)
            return f"https://{self.bucket_name}.s3.{self.region}.amazonaws.com/{s3_file_name}"
        except Exception as e:
            print(f"Erreur lors de l'upload du fichier : {str(e)}")
            return None
