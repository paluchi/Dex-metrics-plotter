from .helpers.dex_api_helpers import get_volume_fees, set_interval
from .helpers.api_queries import get_pair_address, get_pair_hourly_snapshots

from pymongo import MongoClient

from gql import Client
from gql.transport.requests import RequestsHTTPTransport


class Reader:
    db_driver = None
    query_driver = None

    token0 = None
    token1 = None
    pair_address = None

    collection = None

    def __init__(self, token0, token1, api_host, db_host, db_port):

        print("Initializing dex-reader")

        self.token0 = token0
        self.token1 = token1
        self.init_query_driver(api_host)
        self.pair_address = self.request_pair_address(token0, token1)
        self.init_db_driver(db_host, db_port)
        self.add_pair(self.pair_address, self.token0, self.token1)

        print("dex-reader fully Initialized")

    def init_query_driver(self, api_host):

        # Build the request framework
        transport = RequestsHTTPTransport(
            url=api_host, use_json=True)

        # Create the client
        self.query_driver = Client(transport=transport,
                                   fetch_schema_from_transport=True)

        print("graphQL driver Initialized")

    def init_db_driver(self, db_host, db_port):

        connection = MongoClient("{}:{}".format(db_host, db_port))
        connection.drop_database("dex_lectures")
        db = connection["dex_lectures"]
        self.collection = db["pair"]

        print("mongoDB driver Initialized")

    def start_reader(self):

        self.save_last_48h_snapshots()
        self.initAutoReader()
        print("dex-reader has started working")

    def initAutoReader(self):

        set_interval(self.save_last_snapshot, 5)
        print("dex-reader auto reader has started working")

    def request_pair_address(self, token0, token1):

        response = get_pair_address(self.query_driver, token0, token1)
        pair_address = response["pairs"][0]["id"]

        print("The tokens pair's Adress is: {}".format(pair_address))

        return pair_address

    def save_last_snapshot(self):

        snapshot = self.request_snapshots(self.pair_address, 1)
        self.add_snapshots(self.pair_address, snapshot)
        self.delete_last_snapshot(self.pair_address)

        print("New snapshot has been taken")

    def save_last_48h_snapshots(self):

        last_48hs_ss = self.request_snapshots(self.pair_address, 48)
        print(last_48hs_ss)
        self.add_snapshots(self.pair_address, last_48hs_ss)
        print("Last 48 hours snapshots has been saved")

    def request_snapshots(self, pair_address, amount):

        pair_ss = get_pair_hourly_snapshots(
            self.query_driver, pair_address, amount)

        print("An amount of {} snapshots has been retrieved".format(amount))

        return pair_ss["pairHourDatas"]

    def delete_last_snapshot(self, pair_address):
        # finish
        pass

    def add_snapshots(self, pair_address, snapshots):

        for ss in snapshots:
            ss.update({"feesUSD": get_volume_fees(ss["hourlyVolumeUSD"])})
            self.collection.update_one({
                "pair_address": {"$eq": "{}".format(pair_address)}
            },
                {'$push': {'snapshots': ss}})

    def add_pair(self, pair_address, token0, token1):

        # Parse data
        data = {"pair_address": pair_address,
                "token0": token0, "token1": token1, "snapshots": []}

        # Save pair data
        self.collection.insert_one(data)

        print("A new pair has been genereated: {}".format(data))
