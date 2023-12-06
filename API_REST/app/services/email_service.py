from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

class EmailService:
    def __init__(self):
        self.sender_email = 'matrixscientifiqueevolution@gmail.com'

    def send_verification_email(self, email, verification_token, user_name):
        receiver_email = email
        subject = 'Email Verification - Matrix Scientifique Evolution'

        # Création du message Multipart
        message = MIMEMultipart("alternative")
        message["Subject"] = subject
        message["From"] = self.sender_email
        message["To"] = receiver_email

        # Lien de vérification dans le corps du message HTML
        verification_link = f"http://localhost:5000/verify/{verification_token}"

        # Corps du message en format HTML avec styles CSS intégrés et logo de l'entreprise
        html = f"""
        <html>
        <head>
            <style>
            body {{
                font-family: Arial, sans-serif;
                background-color: #f7f7f7;
                margin: 0;
                padding: 20px;
            }}
            .container {{
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }}
            img {{
                max-width: 100%;
                height: auto;
            }}
            h1 {{
                color: #333333;
                font-size: 24px;
            }}
            p {{
                font-size: 16px;
                color: #555555;
                margin-bottom: 15px;
            }}
            .btn {{
                display: inline-block;
                padding: 10px 20px;
                background-color: #0066cc;
                color: white;
                text-decoration: none;
                border-radius: 5px;
            }}
            .footer-text {{
                font-style: italic;
                color: #999999;
                margin-top: 20px;
            }}
            </style>
        </head>
        <body>
            <div class="container">
            <img src="lien_vers_votre_logo" alt="Matrix Scientifique Evolution Logo">
            <h1>Hello {user_name},</h1>
            <p>Your administrator has requested you to verify your email address.</p>
            <p>To complete email verification, please click the button below:</p>
            <a href="{verification_link}" class="btn" style="color: white; text-decoration: none;">Verify your email address</a>
            <p>This link will expire in 7 days.</p>
            <p class="footer-text">Regards,<br />The Matrix Scientifique Evolution Team</p>
            </div>
        </body>
        </html>
        """

        html_part = MIMEText(html, "html")
        message.attach(html_part)

        try:
            smtp_server = smtplib.SMTP('smtp.gmail.com', 587)
            smtp_server.starttls()
            smtp_server.login(self.sender_email, 'wafd vtyr aris faqj')
            smtp_server.sendmail(self.sender_email, receiver_email, message.as_string())
            smtp_server.quit()
            print('E-mail envoyé avec succès!')
        except Exception as e:
            print(f'Erreur lors de l\'envoi de l\'e-mail : {str(e)}')

    def send_confirmation_email(self, email, article_data, user_name):
            receiver_email = email
            subject = 'Confirmation de la réception de votre article - Matrix Scientifique Evolution'

            message = MIMEMultipart("alternative")
            message["Subject"] = subject
            message["From"] = self.sender_email
            message["To"] = receiver_email


            # Corps du message en HTML
            html = f"""
            <html>
            <head>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        background-color: #f7f7f7;
                        margin: 0;
                        padding: 20px;
                    }}
                    .container {{
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }}
                    h1 {{
                        color: #333333;
                        font-size: 24px;
                    }}
                    p, ul, li {{
                        font-size: 16px;
                        color: #555555;
                        margin-bottom: 15px;
                    }}
                    ul {{
                        margin: 10px 0;
                        padding-left: 20px;
                    }}
                    .footer-text {{
                        font-style: italic;
                        color: #999999;
                        margin-top: 20px;
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Bonjour {user_name},</h1>
                    <p>Nous avons bien reçu votre article intitulé <strong>"{article_data['TITRECONTRIBUTION']}"</strong>.</p>
                    <p>Numéro de contribution : <strong>{article_data['NOCONTRIBUTION']}</strong></p>
                    <p>Voici un récapitulatif de votre soumission :</p>
                    <ul>
                        <li>Titre de l'article: {article_data['TITRECONTRIBUTION']}</li>
                        <li>Institution: {article_data['INSTITUTION']}</li>
                        <li>Track Preference : {article_data['TRRACKPREFERENCE']}</li>
                        <li>Type de contribution: {article_data['CONTRIBUTIONTYPE']}</li>
                        <li>Sujet principal: {article_data['MAINTOPIC']}</li>
                        <li>Abstract: {article_data['ABSTRACT']}</li>
                    </ul>
                    <p>Votre article sera examiné par notre robot jury et traité dans les plus brefs délais.</p>
                    <p class="footer-text">Cordialement,<br />L'équipe Matrix Scientifique Evolution</p>
                </div>
            </body>
            </html>
            """

            html_part = MIMEText(html, "html")
            message.attach(html_part)
            try:
                smtp_server = smtplib.SMTP('smtp.gmail.com', 587)
                smtp_server.starttls()
                smtp_server.login(self.sender_email, 'wafd vtyr aris faqj')
                smtp_server.sendmail(self.sender_email, receiver_email, message.as_string())
                smtp_server.quit()
                print('E-mail envoyé avec succès!')
            except Exception as e:
                print(f'Erreur lors de l\'envoi de l\'e-mail : {str(e)}')