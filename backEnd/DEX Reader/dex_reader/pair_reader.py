from .helpers.api_queries import get_pair_data, get_pair_hourly_snapshots

class Pair_reader:
    api = None
    pairs_coll = None

    id = None
    name = None
    token0 = {
        "name": None,
        "id": None,
        "symbol": None
    }
    token1 = {
        "name": None,
        "id": None,
        "symbol": None
    }
    last_snapshot = None

    def __init__(self, address, api, pairs_coll):

        print("Initializing new pair with address: {}".format(address))

        self.api = api
        self.pairs_coll = pairs_coll
        self.id = address

        self.request_pair_data()
        self.save_pair()

    
    def request_pair_data(self):

        response = get_pair_data(self.api, self.id)["pair"]
        self.token0 = response["token0"]
        self.token1 = response["token1"]
        self.name = "{}/{}".format(self.token0["symbol"],self.token1["symbol"])
    

    def save_pair(self):

        # Parse data
        data = {"id": self.id, "name": self.name,
                "token0": self.token0, "token1": self.token1, "snapshots": []}

        # Save pair data
        self.pairs_coll.insert_one(data)

        print("A new pair has been genereated: {}".format(data["name"]))

    def save_last_snapshot(self):

        snapshot = self.request_snapshots(1)

        if snapshot[0]["unix_timestamp"] != self.last_snapshot["unix_timestamp"]:
            self.add_snapshots(snapshot)

            print("New snapshot has been taken for: {}".format(self.name))

    def save_snapshots_by_amount(self, amount):

        snapshots = self.request_snapshots(amount)
        self.add_snapshots(snapshots)

        print("An amount of {} snapshots has been saved for: {}".format(amount, self.name))

    def request_snapshots(self, amount):

        pair_ss = get_pair_hourly_snapshots(
            self.api, self.id, amount)

        return pair_ss["pairHourDatas"]

    def add_snapshots(self, snapshots):

        for ss in snapshots:
            self.pairs_coll.update_one({
                "id": {"$eq": "{}".format(self.id)}
            },
                {'$push': {'snapshots': ss}})
        
        self.last_snapshot = snapshots[0]