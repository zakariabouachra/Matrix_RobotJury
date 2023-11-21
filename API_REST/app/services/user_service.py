from app.services import DatabaseService

class UserService:
    def __init__(self):
        self.db_service = DatabaseService()

    def get_user_info(self, user_id):
        user_data = self.db_service.execute_query("""
            SELECT 
                u.*, c.*, a.*, p.*
            FROM 
                Utilisateur u
            INNER JOIN 
                Coordonnees c ON u.ID = c.id_user
            LEFT JOIN 
                adresse a ON u.ID = a.id_user
            LEFT JOIN
                PAIEMENT p ON u.ID = p.ID_USER
            WHERE 
                u.ID = %s
        """, (user_id,))
        
        if user_data:
            user_columns = [col[0] for col in self.db_service.description()]
            user_info = dict(zip(user_columns, user_data))

            combined_info = {
                'user_id': user_id,
                'nom': user_info['NOM'],
                'prenom': user_info['PRENOM'],
                'datedenaisance': user_info['DATEDENAISANCE'],
                'sexe': user_info['SEXE'],
                'email': user_info['EMAIL'],
                'phonenumber': user_info['PHONENUMBER'],
                'email_verified': user_info['EMAIL_VERIFIED'],
                'phone_verified': user_info['PHONE_VERIFIED'],
                'verification_token' : user_info['VERIFICATION_TOKEN'],
                'motdepasse': user_info['MOTDEPASSE'],
                'country': user_info['COUNTRY'],
                'city': user_info['CITY'],
                'adresse': user_info['ADRESSE'],
                'codepostal': user_info['CODEPOSTAL'],
                'credit_number': user_info['CREDITNUMBER'],
                'name_card':user_info['NAME_CARD'],
                'expiration_date': user_info['EXPIRATIONDATE'],
                'cvv': user_info['CVV']
            }
            return combined_info
