# Dex metrics plotter

##### A full MERN stack application (and Python) that retrieves, save, provide and plots Uniswap v2 pair's hourly metrics APR's.

---

## How it was made and Why?

- This REST API server is made in such a way that Express could be very easily replaced by any other web framework.
- Many abstraction layers are used for very distinct but seemsly equal purposes
- src/bin/www.js is where the server is created and the basics parameters are configures.
- src/app.js is used to configure the web framework (express in this case), using src/frameworkName.js to configure request allowed params
- src/loaders is used to initiate fundamental drivers like db connections, and others
- src/router stucture must be coded depending on your framework. post router level middlewares are loaded here and in this case are a query validator and a client validator
- Router works as a very important abstraction layer in this system, because post router only the parameters are going to be processed, in a way that post logic does'nt depend on your framework
- src/functions is used to manake your main request need. this set of function can make multiple operation between controllers in order to retrieve a processes result.
- src/controllers locate the core funcionalities of the business logic. The most basic operations are coded here. like database operations, api requests, etc. So src/functions can manage more complex operations
- A generic status return function is used to comunicate between controllers, functions and the router
- This could be a good template for a very robust REST API

## What can be improved?

- Add testing (must)
- Pass to typescript (must)

===

## Installation

### Using Docker

###### Step on this project root's directory

###### Run:

```sh
docker-compose up --build
```

##### Start using your web app using [This link][pllg]

---

### NOT Using Docker

##### Go to "dex_reader" directory and follow the readme instructions

##### Go to "service_provider" directory and follow the readme instructions

##### Go to "dex_metrics_plot" directory and follow the readme instructions

##### Start using your web app using [This link][pllg]

[pllg]: https://localhost:3000
