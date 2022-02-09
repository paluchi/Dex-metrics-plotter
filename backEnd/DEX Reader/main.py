from dex_reader.reader import Reader
from os import environ
from dotenv import load_dotenv


def main():
    load_dotenv()

    token0 = environ.get(
        "TOKEN0", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2")
    token1 = environ.get(
        "TOKEN1", "0xf035f1fbdae1aedb952f904c641e7db1a2a52537")
    api_host = environ.get(
        "DEX_API", "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2")
    db_host = environ.get("DB_HOST", "127.0.0.1")
    db_port = environ.get("DB_PORT", 27017)

    reader = Reader(token0, token1, api_host, db_host, db_port)
    reader.start_reader()
    pass


if __name__ == '__main__':
    main()

# Open mongoDB connection
# Read selected tracking pair from enviroment
# Retrieve las 48hs of liquidity, volume and fees data about selected pairs.
# Save data in db
# Start hourly retrieving data loop
# Save new data on each loop
