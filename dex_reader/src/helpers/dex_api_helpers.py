import threading

# Roughly calcules and returns fees based on volume (ONLY FOR UNISWAP V2)
def get_volume_fees(volume):
    total_feesUSD = float(volume) * 0.03
    return total_feesUSD

# Function that call every given seconds
def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t
