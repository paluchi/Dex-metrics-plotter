# Service provider

##### A Node based server retrieves dex pairs liquidity pool metrics snapshots from a mongodb database

---

## How it was made and Why?

#### This project needs a service provider that retrieves hourly metrics snapshots based on a time range.

- Rest was chosen as the state transfer for it's simplicity and very fast development style
- Expressjs was chosen as server middleware framework because of it's very easy set up, development and very big community
- Mongodb was chosen as data base for it's super fast querying and saving technology and very easy use over the chosen framework
- To the sake of simplicity only one route has been created
- This route recieves an api key through headers to confirm the client, a fromDate ,toDate and pairAddress variables to request the metrics to the data based
- fromDate is a date variable and represents the date the snapshots creation are going to be requested from
- toDate is a date variable and represents the date the snapshots creation are going to be requested to
- pairAddress is a string variable and represents the Uniswap v2 liquidity pool pair address
- Three ReADMES were created:
- - README.md for project creation explanation
- - README.template.md for the app template system
- - README.project_documentation.md for specific logic documentation about this project

## What can be improved?

- Add mutiple dexes support
- Add mutiple metrics suport (should be a micro service for each metric to increase scalability and code maintenability)
- Use multi threading to increase performance at it's best

---

## Installation

---

##### Go to "service_provider" directory and then:

### NOT Using Docker

###### Copy all the ".env.example" file content, create a new file called ".env" at previous file level, paste the content and save

###### Install [Node.js][pln] an then run the following command:

```sh
npm install
npm start
```

##### Then follow the root directory project's readme

---

## Usage

##### Start using the testing provider or postman querying tool loading ./service_provider.postman.json

[pln]: https://nodejs.org/es/download/
