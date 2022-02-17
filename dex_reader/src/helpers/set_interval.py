import asyncio

# Function that call every given seconds


async def set_interval(func, sec):
    async def func_wrapper():
        asyncio.create_task(func())
        await set_interval(func, sec)
    await asyncio.sleep(sec)
    await func_wrapper()
