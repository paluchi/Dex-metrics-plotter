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
                    hourlyVolumeUSD
                    reserveUSD
                    }
                }
            """)

    params = {"pair_address": pair_address, "amount": amount}

    return driver.execute(query, variable_values=params)
