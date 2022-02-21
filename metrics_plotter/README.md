# Web application

##### A React based Web app that connects to an api server and displays a beautiful chart you can interact with!

---

## How it was made and Why?

#### This project needs a way to show a chart based on a series of parameters.

- Create react app was chosen as templating system. Typescript template was chosen to have more easy and readable code
- Axios was chosen as http request library for it's very easy use and big community
- This Web app was created in base of several fundamental components
- This fundamental components aims to bring the modularity needed to create a very easy, responsive, fast and readeable way to create new components.
- All components aims to be fully responsive. Even a chart should be readable in a phone's vertical display
- Code duplication aims to be near to inexistent
- This app aims to be a good point of start for a web app templating library
- Four ReADMES were created:
- - README.md for project creation explanation
- - README.template.md for the app template system
- - README.project_documentation.md for specific logic documentation about this project
- - README.create_react_app.md for basics for create react app framework

## What can be improved?

- Add components and funcionalities testing (is a must)
- Add multiline, line customization and multiple chart tyles functionalities to charting components
- (bugfix) horizontal container with fixed width charts don't work at it's best
- Improve already existing fundamental components variability. Add a stats facade for complex statsSets interactions
- Add notification component, modal component and other fundamental components
- Make big improvements in the chart component by adding a lot more of variability and functionalities
- Improve re-rendeding
- Add accesibility properties to every component
- Add more content
- Add theme context, user context
- Add tracking driver, track user interaction over the Web app, create events and create an external Web app user interaction metrics system. (in very advanced development)
- Add more documentation

---

## Installation

##### Go to "metrics_plotter" directory and then:

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

##### Start using the front end web app using localhost:3000

##### Use "dashboard" page to use the Annual Percentaje Rate Moving Average (APR MA)

##### Use other pages to watch dummy charts and stats sets with mixed display and loading status configurations
