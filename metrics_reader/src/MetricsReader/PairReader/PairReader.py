from .helpers.api_queries import get_pair_data, get_pair_hourly_snapshots


class PairReader:
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

        self.request_pair_data()  # Request some pair's variables and save locally
        self.save_pair()  # Save local pair dana on db (creates new document in collection)

    def request_pair_data(self):

        response = get_pair_data(self.api, self.id)["pair"]
        self.token0 = response["token0"]
        self.token1 = response["token1"]
        self.name = "{}/{}".format(self.token0["symbol"],
                                   self.token1["symbol"])

    def save_pair(self):

        # Parse data
        data = {"id": self.id, "name": self.name,
                "token0": self.token0, "token1": self.token1, "snapshots": []}

        # Save pair data
        self.pairs_coll.insert_one(data)

        print("A new pair has been genereated: {}".format(data["name"]))

    def save_last_snapshot(self):

        snapshot = self.request_snapshots()

        if snapshot[0]["date"] != self.last_snapshot["date"]:
            self.add_snapshots(snapshot)
            print("New hourly snapshot has been taken for: {}".format(self.name))
        # else:
        elif snapshot[0]["liquidity_usd"] != self.last_snapshot["liquidity_usd"] or snapshot[0]["volume_usd"] != self.last_snapshot["volume_usd"] or snapshot[0]["fees_usd"] != self.last_snapshot["fees_usd"]:
            self.update_last_snapshot(snapshot[0])
            print("Last hourly snapshot has been updated for: {}".format(self.name))

    def save_snapshots_by_amount(self, amount):

        snapshots = self.request_snapshots(amount)
        self.add_snapshots(snapshots)

        print("The last {} snapshots has been requested for: {} pair. An amount of {} has been retrieved and saved".format(
            amount, self.name, len(snapshots)))

    def request_snapshots(self, amount=1):

        pair_ss = get_pair_hourly_snapshots(
            self.api, self.id, amount)

        return pair_ss

    def add_snapshots(self, snapshots):

        for ss in snapshots:
            self.pairs_coll.update_one({
                "id": {"$eq": "{}".format(self.id)}
            },
                {'$push': {'snapshots': ss}})

        self.last_snapshot = snapshots[0]

    def update_last_snapshot(self, snapshot):

        self.pairs_coll.update_one({
            "id": {"$eq": "{}".format(self.id)},
            "snapshots.date": snapshot["date"]
        },
            {'$set': {
                'snapshots.$.liquidity_usd': snapshot["liquidity_usd"],
                'snapshots.$.volume_usd': snapshot["volume_usd"],
                'snapshots.$.fees_usd': snapshot["fees_usd"]
            }}
        )

        self.last_snapshot = snapshot
