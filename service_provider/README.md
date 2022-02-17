# Service provider

##### A Node based server retrieves dex pairs liquidity pool metrics snapshots from a mongodb database

---

## How it was made and Why?

- This REST API server is made in such a way that Express could be very easily replaced by any other web framework.
- Many abstraction layers are used for very distinct but seemsly equal purposes
- src/bin/www is where the server is created and the basics parameters are configures.
- src/app.js is used to configure the web framework (express in this case), using src/frameworkName.js to configure request allowed params and policies
- src/loaders is used to initiate fundamental drivers like db connections, and others
- src/router stucture must be coded depending on your framework. post router level middlewares are loaded here and in this case are a query validator and a client validator
- Router works as a very important abstraction layer in this system, because post router only the parameters are going to be processed, in a way that post logic does'nt depend on your framework
- src/functions is used to manake your main request need. this set of function can make multiple operation between controllers in order to retrieve a processes result.
- src/controllers locate the core funcionalities of the business logic. The most basic operations are coded here. like database operations, api requests, etc. So src/functions can manage more complex operations
- A generic status return function is used to comunicate between controllers, functions and the router
- At last a generic error handler middleware is added for your used web framework

## What can be improved?

- Remove dependency from status util and use try catch only

---

## Installation

---

### NOT Using Docker

##### Go to "dex_metrics_plot" directory and then:

###### Copy all the ".env.example" file content, create a new file called ".env" at previous file level, paste the content and save

###### Install [Node.js][pln] an then run the following command on "dex-reader" directory:

```sh
npm install
npm start
```

##### Then follow the "dex_metrics_plot" directory project's readme

[pln]: https://nodejs.org/es/download/
