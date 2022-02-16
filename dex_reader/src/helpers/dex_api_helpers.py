import asyncio


# Roughly calcules and returns fees based on volume (ONLY FOR UNISWAP V2)


def get_volume_fees(volume):
    total_feesUSD = float(volume) * 0.03
    return total_feesUSD

# Function that call every given seconds


async def set_interval(func, sec):
    async def func_wrapper():
        asyncio.create_task(func())
        await set_interval(func, sec)
    await asyncio.sleep(sec)
    await func_wrapper()
