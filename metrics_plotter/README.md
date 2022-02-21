# Web application

##### A React based Web app that connects to an api server and displays a beautiful chart you can interact with!

---

## How it was made and Why?

- This Web app was created in base of several fundamental components
- This fundamental components aims to bring the modularity needed to create a very easy, responsive, fast and readeable way to create new components.
- All components aims to be fully responsive. Even a chart should be readable in a phone's vertical display
- Code duplication aims to be near to inexistent
- This app aims to be a good point of start for a web app templating library

## What can be improved?

- (bugfix) horizontal container with fixed width charts don't work at it's best
- Improve already existing fundamental components variability. Add a stats facade for complex statsSets interactions
- Add notification component, modal component and other fundamental components
- Make big improvements in the chart component by adding a lot more of variability and functionalities
- Improve re-rendeding
- Add components and funcionalities testing (is a must)
- Add accesibility properties to every component
- Add more content
- Add theme context, user context
- Add tracking driver, track user interaction over the Web app, create events and create an external Web app user interaction metrics system. (in very advanced development)

---

## Installation

##### Go to "metrics_plotter" directory and then:

### Using Docker:

##### Start using your web app using 127.0.0.1:3000

##### Then follow the root project readme

---

### NOT Using Docker:

###### Copy all the ".env.example" file content, create a new file called ".env" at previous file level, paste the content and save

###### Run:

```sh
npm install
npm start
```

##### Then follow the project's root directory's readme

---

## Usage

##### Start using your front end web app using localhost:3000

##### Use "dashboard" page to use the Annual Percentahe Rate Moving Average (APR MA)

##### Use other pages to watch dummy charts and stats sets with mixed display and loading status configurations
