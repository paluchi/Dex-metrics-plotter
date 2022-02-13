# Dex reader

##### A Python based script that saves UniSwap v2 liquidity pool pairs hourly metrics

---

## Installation

##### Go to "dex_reader" directory and then:

### Using Docker

###### Run:

```sh
docker build -t dex-reader .
```

##### Then follow the root project readme

---

### NOT Using Docker

###### Copy all the ".env.example" file content, create a new file called ".env" at previous file level, paste the content and save

###### Install  [MongoDB][plmdb] on your machine. Then open a terminal and run:

```sh
mongod
```

###### Install [Python 3][plpt3] or using your python version run the following command on "dex-reader" directory:

(having python3 installed)

```sh
python3 main.js
```

##### Then follow the "service_provider" directory project's readme


[plpt3]: https://www.python.org/downloads/
[plmdb]: https://docs.mongodb.com/manual/installation/
