# Node server api template system

##### Use this template to work over this project

---

##### Basics of the template and how to add addons into the system (functions, controllers, routes, etc)

- This REST API server is made in such a way that Express could be very easily replaced by any other web framework
- Many abstraction layers are used for very distinct but seemsly equal purposes
- ./src/bin/www is where the server is created and some of it's basics parameters are configures
- ./src/app.js is used to configure the web framework (express in this case)
- ./src/frameworkName.js to configure request allowed params and policies
- ./src/loaders is used to initiate fundamental drivers like db connections, and others
- ./src/router stucture must be coded depending on your framework. post router level middlewares are loaded here and in this case are a query validator and a client validator
- Router works as a very important abstraction layer in this system, because posterior to the router only the parameters are going to be processed, so that posterior logic doesn't depend on your framework. This increases dependency decoupling
- ./src/functions is used to manake your main request needs. This set of function can make multiple operation between controllers in order to retrieve a processes result
- ./src/controllers locate the core funcionalities of the business logic. The most basic operations are coded here. like database operations, api requests, etc. So ./src/functions can manage more complex operations. This increases code scalability
- A generic status return function is used to comunicate between controllers, functions and the router
- At last a generic error handler middleware is added for your used web framework
- ./README.project_documentation.md must contain all usage instructions of new logic inside the above directories and this new logic's code must be self documentative too

---

##### Testing

- ./tests Must containt all kind of tests declarations
- A self descriptive set of directories are already added. New sub directories must be added to their respectively testing directory to test new logic.
- Every test directory must have unit testing and integration testing divided by distinct folders

---

##### Others

- Typescript Must be used to code every component over this system
- ./tsconfig.json Must contain all typescript related configurations
- ./Dockerfile must contain all instructions to successfully deploy the app with docker

---

## What can be improved?

- Add events driver
- Build an events framework
- Add a mailer driver
- Build an mailer framework
- Add errors tracking framework

[ejsn]: https://expressjs.com/
