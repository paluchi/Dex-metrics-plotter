from pymongo import MongoClient


class Db_driver:
    connection = None
    host = None
    port = None
    user = None
    password = None
    db = None
    collection = None

    def __init__(self, host, port, user, password):
        self.host = host
        self.port = port
        self.user = user
        self.password = password

    def open_connection(self):
        self.connection = MongoClient(
            self.host, Port=self.port, user=self.user, password=self.password)

    def use_db(self, db_name):
        if self.connection:
            self.db = self.connection[db_name]

    def drop_db(self, db_name):
        if self.connection:
            self.connection.drop_database(db_name)

    def add_collection(self, col_name):
        if self.connection and self.db:
            self.collection = self.db[col_name]

    def add(self):
        if self.connection:
            pass
