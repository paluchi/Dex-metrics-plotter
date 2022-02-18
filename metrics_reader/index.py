from src.main import main
from os import environ
from dotenv import load_dotenv
import json


# initial function. project starts in main
def runFirst():

    if(environ.get("ENVIRONMENT", "development") != "production"):
        load_dotenv()  # Loads .env file as environment variables

    # Tracking pairs
    pairs = json.loads(environ.get(
        "PAIRS", "[0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2]"))

    print(pairs)
    # Server to ask for pairs
    api_url = environ.get(
        "DEX_API_URL", "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2")

    # Database route
    db_url = environ.get("MONGO_DB_URL", "127.0.0.1:27017")

    

    main(pairs, api_url, db_url)


if __name__ == '__main__':
    runFirst()
