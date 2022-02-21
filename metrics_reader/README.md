# Dex reader

##### A Python based script that saves UniSwap v2 liquidity pool pairs hourly metrics

---

## How it was made and Why?

- It is important to clear out that this script is very limited and can only work with Uniswap v2 metrics. It can ve greatly improved.
- 2 main entities were coded to create this program, the pair reader and the pair's reader orchester
- The pair readers request, parse and save their relative hourly snapshots based on a given pair address, a db client and a graphql client
- The Orcherster is in charge or make the pair readers make a readment over the metrics API. First at init, by last 48 hours, and then hourly with the help of a small function that set an interval
- I found this 2 entities the most suitable to make the most scalable, easy to code, understand and improve of this task

## What can be improved?

- Add suport to multiple Dexes (a new "dex" entity must be added to keep scalability)
- Use gql subscription to retrieve data automatically in real time
- The interval is not async... (It should be)
- Must add code testing functions

---

## Installation

##### Go to "dex_reader" directory and then:

### Using Docker

##### Start using your web app using [This link][pllg]

##### Then follow the root project readme

---

### NOT Using Docker

###### Copy all the ".env.example" file content, create a new file called ".env" at previous file level, paste the content and save

###### Install [MongoDB][plmdb] on your machine. Then open a terminal and run:

```sh
mongod
```

###### Install [Python 3][plpt3] or using your python version run the following command:

(having python3 installed)

```sh
pip3 install -r dependencies.txt
python3 main.js
```

##### Then follow the root directory project's readme

---

## Usage

##### This script is automatic and currently hasn't a single interaction method

[plpt3]: https://www.python.org/downloads/
[plmdb]: https://docs.mongodb.com/manual/installation/
[pllg]: https://localhost:3000
