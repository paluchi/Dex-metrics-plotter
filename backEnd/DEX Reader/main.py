from dex_reader.reader import Reader

def main():
    p = Reader()

if __name__ == '__main__':
    main()

# Open mongoDB connection
# Read selected tracking pair from enviroment
# Retrieve las 48hs of liquidity, volume and fees data about selected pairs.
# Save data in db
# Start hourly retrieving data loop
# Save new data on each loop