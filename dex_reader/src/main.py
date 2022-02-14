from .readerOrchester import Reader
from os import environ
from dotenv import load_dotenv
import json


# Initial function
def main():
    load_dotenv() # Loads .env file as environment variables

    # Tracking pairs 
    pairs = json.loads(environ.get(
        "PAIRS", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"))
    # Server to ask for pairs
    api_host = environ.get(
        "DEX_API", "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2")

    # Database route
    db_host = environ.get("DB_HOST", "127.0.0.1")
    db_port = environ.get("DB_PORT", 27017)

    # Create the reader ans start it
    reader = Reader(pairs, api_host, db_host, db_port)
    reader.start_reader()