from .helpers import get_volume_fees
from gql import gql
from datetime import datetime
from gql import gql, Client
#from gql.transport.websockets import WebsocketsTransport # Remove

# This function request and retrieves some an addres based on their token's names (not in use)
def get_pair_address(driver, token0, token1):
    query = gql("""
                query getPairs ($token0: String!, $token1: String!){
                    pairs(
                        where:{
                        token0: $token0,
                        token1: $token1
                        }
                    ) {
                        id
                    }
                }
            """)

    params = {"token0": token0, "token1": token1}

    return driver.execute(query, variable_values=params)

# This function request and retrieves some given pair variables
def get_pair_data(driver, address):
    query = gql("""
                query getPair ($address: ID!){
                    pair(id:$address) {
                        token0{
                            name
                            id
                            symbol
                        }
                        token1{
                            name
                            id
                            symbol
                        }
                    }
                }
            """)

    params = {"address": address}

    return driver.execute(query, variable_values=params)


# This function request, parse and return last given amount of a given pair snapshots
def get_pair_hourly_snapshots(driver, pair_address, amount=1):
    query = gql("""
                query getPairHourDatas($amount: Int!, $pair_address: String!){
                    pairHourDatas(
                        first: $amount,
                        orderBy:hourStartUnix,
                        orderDirection: desc,
                        where: {
                            pair: $pair_address
                        }
                    )
                    {
                    hourStartUnix
                    hourlyVolumeUSD
                    reserveUSD
                    }
                }
            """)

    params = {"pair_address": pair_address, "amount": amount}

    # Request data
    pair_ss = driver.execute(query, variable_values=params)

    # Parse data
    for ss in pair_ss["pairHourDatas"]:
        date = datetime.utcfromtimestamp(
            ss["hourStartUnix"])
        ss["date"] = date
        ss.pop("hourStartUnix")

        ss["liquidity_usd"] = ss.pop("reserveUSD")
        ss["volume_usd"] = ss.pop("hourlyVolumeUSD")
        ss.update({"fees_usd": get_volume_fees(ss["volume_usd"])})

    return pair_ss["pairHourDatas"]


# Delete
# async def test(driver, pair_address, amount=1):
#     query = gql("""
#                 subscription getPairHourDatas{
#                     pairHourDatas(
#                         first: 1,
#                         orderBy:hourStartUnix,
#                         orderDirection: desc,
#                         where: {
#                             pair: "0xbc9d21652cca70f54351e3fb982c6b5dbe992a22"
#                         }
#                     )
#                     {
#                     hourStartUnix
#                     hourlyVolumeUSD
#                     reserveUSD
#                     }
#                 }
#             """)

#     transport = WebsocketsTransport(
#         url='wss://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2')

#     client = Client(
#         transport=transport,
#         fetch_schema_from_transport=True,
#     )

#     results = client.subscribe(query)

#     print(results)

#     for result in client.subscribe(query):
#         print(result)
