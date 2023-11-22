from app.services import DatabaseService

class ArticleService:
    def __init__(self):
        self.db_service = DatabaseService()

    def get_articles(self, user_id):
        if user_id:
            user_articles = self.db_service.execute_query_all("""
                SELECT IDARTICLE, STATUS FROM USER_ARTICLE WHERE IDUSER = %(user_id)s;
            """, {'user_id': user_id})
            
            articles_data = []

            for article in user_articles:
                article_id = article[0]
                article_status = article[1]

                try:
                    article_info = self.db_service.execute_query("""
                        SELECT * FROM ARTICLE_SCIENTIFIQUE WHERE ID = %(article_id)s;
                    """, {'article_id': article_id})

                    if article_info:
                        article_columns = [col[0] for col in self.db_service.description()]
                        article_dict = dict(zip(article_columns, article_info))
                        article_dict['status'] = article_status  # Ajout du statut à l'objet article
                        articles_data.append(article_dict)
                except Exception as e:
                    print(f"Erreur lors de la récupération de l'article {article_id}: {str(e)}")
            
            formatted_articles = [{'id': article['ID'], 'title': article['TITRECONTRIBUTION'], 'status': article['status']} for article in articles_data]
            return formatted_articles