# Dex reader

##### A Python based script that saves UniSwap v2 liquidity pool pairs hourly metrics

###### It is important to me to clear out that this script is very limited and can only work with Uniswap v2 metrics. It can be greatly improved as a template too

---

## How it was made and Why?

#### This project needs an isolated proccess to read, parse and save UniSwap v2 liquidity pool pairs hourly metrics

- Python was used for it's very easy scrips creation usage, and show a little bit of my language flexibility
- It is true that nodejs may be the best option because of it's non blocking technology and the poor compiling nature of python
- Mongodb was chosen as data base for it's super fast querying and saving technology and very easy use over the chosen framework
- 2 main entities were coded to create this program, the pair reader and the pair's reader orchester
- The pair readers request, parse and save their relative hourly snapshots based on a given pair address, a db client and a graphql client
- The Orcherster is in charge or make the pair readers make a readment over the metrics API. First at init, by last 48 hours, and then hourly with the help of a small function that set an interval
- I found this 2 entities the most suitable to make the most scalable, easy to code, understand and improve of this task
- Three ReADMES were created:
- - README.md for project creation explanation
- - README.template.md for the app template system
- - README.project_documentation.md for specific logic documentation about this project
- Add more documentation

## What can be improved?

- Add suport to multiple Dexes (a new "dex" entity must be added to keep scalability)
- Use gql subscription to retrieve data automatically in real time
- The interval is not async... (It must be)
- Must add code testing functions

---

## Installation

##### Go to "dex_reader" directory and then:

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
