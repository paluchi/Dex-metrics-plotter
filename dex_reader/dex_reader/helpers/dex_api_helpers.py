import threading
from datetime import datetime


def get_volume_fees(volume):
    total_feesUSD = float(volume) * 0.03
    return total_feesUSD

def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t
