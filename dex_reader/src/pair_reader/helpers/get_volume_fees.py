
# Roughly calcules and returns fees based on volume (ONLY FOR UNISWAP V2)
def get_volume_fees(volume):
    total_feesUSD = float(volume) * 0.003
    return total_feesUSD
