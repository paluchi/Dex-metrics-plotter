from .helpers.set_interval import set_interval
from .PairReader.PairReader import PairReader

from pymongo import MongoClient

from gql import Client
from gql.transport.requests import RequestsHTTPTransport


class ReaderOrchester:

    db_driver = None
    query_driver = None

    db_collection = None
    pairs = []

    def __init__(self, pairs_addresses, api_url, db_url):

        print("Initializing dex-reader")

        self.init_query_driver(api_url)
        self.init_db_driver(db_url)
        self.build_pairs(pairs_addresses)

        print("dex-reader fully Initialized")

    def build_pairs(self, addresses):
        # Create an individual pair reader for every address
        for address in addresses:
            new_pair = PairReader(
                address, self.query_driver, self.db_collection)
            self.pairs.append(new_pair)

    def init_query_driver(self, api_host):

        # Build the request framework
        transport = RequestsHTTPTransport(
            url=api_host, use_json=True)

        # Create the client
        self.query_driver = Client(transport=transport,
                                   fetch_schema_from_transport=True)

        print("graphQL driver Initialized")

    def init_db_driver(self, db_url):

        connection = MongoClient(db_url)
        connection.drop_database("dex_lectures")  # Delete db is already exists
        db = connection["dex_lectures"]  # Select db by "dex_lectures" name
        # Select db's collections by "pairs" name
        self.db_collection = db["pairs"]

        print("mongoDB driver Initialized")

    def start_reader(self):

        # Retrieves, parse save last 48 hours (if exist) of given pairs
        self.save_last_48h_snapshots()
        self.initAutoReader()  # Retrieves, parse save last hour (if exist) of given pairs
        print("dex-reader has started working")

    def initAutoReader(self):

        # Retrieve and save a new snapshot (if exists)
        set_interval(self.take_snapshot, 10)
        print("dex-reader auto reader has started working")

    def take_snapshot(self):

        for pair in self.pairs:
            pair.save_last_snapshot()

    def save_last_48h_snapshots(self):

        for pair in self.pairs:
            pair.save_snapshots_by_amount(48)

        print("Last 48 hours snapshots of all pairs has been saved")
