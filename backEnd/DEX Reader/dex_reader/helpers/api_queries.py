def get_pair_address(token0, token1):
    query = """
            {
                {
                pairs(
                    where:{
                    token0: $token0,
                    token1: $token1
                    }
                ) {
                    id
                }
                }
            }
            """

    params = {"token0": token0, "token0": token1}

    return {"query": query, "params": params}


def get_pair_hourly_snapshots(pair_address, amount=1):
    query = """
            {
                pairHourDatas(first: $amount, orderBy:hourStartUnix orderDirection: desc,
                where: {pair: $pair_address})
                {
                hourlyVolumeUSD
                reserveUSD
                }
            }
            """

    params = {"pair_address": pair_address, "amount": amount}

    return {"query": query, "params": params}
