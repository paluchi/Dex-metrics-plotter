from pymongo import MongoClient


class Db_driver:
    connection = None
    host = None
    port = None
    user = None
    password = None
    db = None

    def __init__(self, host, port, user, password):
        self.host = host
        self.port = port
        self.user = user
        self.password = password
        self.connection = MongoClient(
            host, Port=port, user=user, password=password)

    def connect(self, host, port):
        if self.connection:
            pass

    def set_db(self,dbName):
        if self.connection:
            self.db = self.connection[dbName]

    def add(self):
        if self.connection:
            pass

    def clear_collections(self):
        if self.connection:
            pass
