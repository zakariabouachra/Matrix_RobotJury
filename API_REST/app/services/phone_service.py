from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException

class PhoneService:
    def __init__(self, account_sid='AC0c76d0d744f8895b95de670a3a45298e', auth_token='6c635fb35f83e007e2bff3bfde0b0a2b', verify_sid='VA1791c076d647f635b1042470055b00dc'):
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
