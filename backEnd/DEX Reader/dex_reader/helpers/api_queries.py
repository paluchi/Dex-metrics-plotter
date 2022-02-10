from .dex_api_helpers import get_volume_fees
from gql import gql


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

    pair_ss = driver.execute(query, variable_values=params)

    for ss in pair_ss["pairHourDatas"]:
        ss["unixTimestamp"] = ss.pop("hourStartUnix")
        ss["liquidityUSD"] = ss.pop("reserveUSD")
        ss["volumeUSD"] = ss.pop("hourlyVolumeUSD")
        ss.update({"feesUSD": get_volume_fees(ss["liquidityUSD"])})

    return pair_ss
