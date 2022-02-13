# Service provider

##### A Node based server retrieves dex pairs liquidity pool metrics snapshots from a mongodb database

---

## Installation

##### Go to "dex_metrics_plot" directory and then:

### Using Docker

###### Run:

```sh
docker build -t api-server .
```

##### Then follow the root project readme

---

### NOT Using Docker

###### Copy all the ".env.example" file content, create a new file called ".env" at previous file level, paste the content and save

###### Install [Node.js][pln] an then run the following command on "dex-reader" directory:

```sh
npm install
npm start
```

##### Then follow the "dex_metrics_plot" directory project's readme

[pln]: https://nodejs.org/es/download/
