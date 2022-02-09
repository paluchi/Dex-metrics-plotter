from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport


class Graphql_driver:
    url = None
    header = None
    transport = None
    client = None

    def __init__(self, url):
        self.url = url

        # Define our authentication process.
        self.header = {'Authorization': '',
                       'Content-Type': "application/json"}

        # Build the request framework
        self.transport = RequestsHTTPTransport(
            url=self.url, headers=self.header, use_json=True)

        # Create the client
        self.client = Client(transport=self.transport,
                             fetch_schema_from_transport=True)

    def request(self, query, params):
        newQuery = gql(query)

        response = self.client.execute(newQuery, variable_values=params)

        return response
