import snowflake.connector

class DatabaseService:
    def __init__(self):
        self.conn = snowflake.connector.connect(
            user='zakariabouachra',
            password='Lilopipo09@',
            account='iwphmqq-ht33884',
            warehouse='COMPUTE_WH',
            database='MATRIX',
            schema='PUBLIC'
        )
        self.cur = self.conn.cursor()

    def execute_query(self, query, params=None):
        if params:
            self.cur.execute(query, params)
        else:
            self.cur.execute(query)
        return self.cur.fetchone()
    
    def execute_query_all(self, query, params=None):
        if params:
            self.cur.execute(query, params)
        else:
            self.cur.execute(query)
        return self.cur.fetchall()

    def commit(self):
        self.conn.commit()

    def description(self):
        return self.cur.description

    def close_connection(self):
        self.cur.close()
        self.conn.close()
