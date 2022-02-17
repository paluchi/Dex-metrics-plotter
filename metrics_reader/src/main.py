from .MetricsReader.ReaderOrchester import ReaderOrchester


# Initial function
def main(pairs, api_url, db_url):

    # Create the reader ans start it
    reader = ReaderOrchester(pairs, api_url, db_url)

    reader.start_reader()
