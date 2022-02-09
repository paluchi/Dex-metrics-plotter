from drivers.graphql_driver import graphql_driver
from drivers.mongodb_driver import mongodb_driver
from helpers.dex_api_helpers import get_volume_fees, set_interval
from helpers.api_queries import get_pair_address, get_pair_hourly_snapshots


class Reader:
    db_driver = None
    query_driver = None

    token0 = None
    token1 = None

    def __init__(self, token0, token1):
        self.init_db()
        self.query_driver = graphql_driver() #pass props
        self.token0 = token0
        self.token1 = token1
        self.init_db()
        self.save_last_48h_snapshots()
        self.initAutoReader()

    def init_db(self):
        self.db_driver = mongodb_driver() #pass props
        #finish

    def initAutoReader(self):
        set_interval(60*60, self.save_last_snapshot)

    def save_last_snapshot(self):
        snapshot = self.request_snapshots(1)
        self.add_snapshots(snapshot)
        self.delete_last_snapshot()

    def save_last_48h_snapshots(self):
        last_48hs_ss = self.request_snapshots(48)
        self.add_snapshots(last_48hs_ss)

    def request_snapshots(self, amount):
        pair_address_query_data = get_pair_address(self.token0, self.token1)
        pair_address = self.query_driver.request(
            pair_address_query_data.query, pair_address_query_data.params)

        pair_ss_query_data = self.query_driver.request(pair_address, amount)
        pair_ss = self.query_driver.request(
            pair_ss_query_data.query, pair_ss_query_data.params)

        return pair_ss

    def delete_last_snapshot(self, a, b):
        #finish
        pass

    def add_snapshots(self, snapshots):
        #finish
        pass

    def create_pair(self, a, b):
        pass
