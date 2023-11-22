from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
import os
from dotenv import load_dotenv

load_dotenv()

class PhoneService:
    def __init__(self):
        account_sid = os.getenv('TWILIO_ACCOUNT_SID')
        auth_token = os.getenv('TWILIO_AUTH_TOKEN')
        verify_sid = os.getenv('TWILIO_VERIFY_SID')

        self.client = Client(account_sid, auth_token)
        self.verify_sid = verify_sid

    def initiate_verification(self, phone_number):
        self.verified_number = phone_number 
        verification = self.client.verify.v2.services(self.verify_sid) \
            .verifications \
            .create(to=self.verified_number, channel="sms")
        return verification

    def check_verification(self, phone_number, otp_code):
        try:
            if phone_number:
                verification_check = self.client.verify.v2.services(self.verify_sid) \
                    .verification_checks \
                    .create(to=phone_number, code=otp_code)
                return verification_check
            else:
                raise ValueError("Aucun numéro de téléphone spécifié pour la vérification")
        except TwilioRestException as e:
            return None
