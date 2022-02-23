# Front end template system

##### Use this template to work over this project

---

##### New addons into the system (components and others)

- The fundamentals of this directories system and some of its scripts relies over [Create React App][cran] node module. Read ./README.create_react_app.md or check their web docs to get a more indeep explanation about their framework basics
- ./src/assets contains all custom fonts files, icons, images or any other static type files
- ./src/components contains the most generic components of the system. This components must have very extended usage and may contain very complex logic that needs to be centralized
- ./src/components/icons contains componentized sgvs for every pursope usage
- ./src/context must contain all generic contexts. Like user, theme, from simple but very reusable context to very complex but distributed contexts
- ./src/graphs contains fully built graphs logic that could be requested all over the web app pages
- ./src/queries contains all the queries to external APIs that could be used all over the web app logic
- ./src/utils contains a fix of multiple small tools. hooks, libraries basics components (rechart for example) are stored here
- All the components mentioned above can contain sub directories for styles, specific sub compomponents or other specific logics. The above components can have dependencies between each other to build themself with the least amount of duplicated logics.
- The above explained directories are part of the fundamental logic components of this system. They compose the ui library and could be wrapped into an independient node module and installed as the ui dependency of this specific system. This new independient module increases distributivity and scalability. New tools could be installed in this independient ui module to test icons
- ./README.project_documentation.md must contain all usage instructions of new components inside the above directories and this new component's code must be self documentative too

##### The next directories must use all components resumed above to create in a very easy, scalable and simple way all sections and pages of our web

###### Navigation

- ./App is the component used to declare all the navigation components
- All navigation components are related between each other through a context provider declared in ./app
- ./src/navigation is the directory were navbars and navigation related components are stores
- ./src/navigation/main contains the logic used to add routing and other properties to the pages. It is used as the pages container. This component will receive a set of declared pages from ./App
- ./src/navigation/navbar contains the logic of the principal navigation bar
- ./src/navigation/sidebar contains the logic of side navbar
- ./src/navigation/{newNavComponent} must be created for a new navigation related component

###### pages

- ./src/App is the component used to declare pages based on a declared set of objects that contains props related to the page (path, icon, header, etc). Then ./src/navigation/main will use it's logic to render this pages
- ./src/pages contains all the pages of the web app. They are composed by a main file a styles subdirectory, a components subdirectory, a tests subdirectory and any other directory can be added to contain very specific logic related to this page. Sub components can contain styles and nested components directories if needed
- ./src/pages/{somePage}/components must contain a serie of section components. This components must reclare a page's section logic
- ./src/pages don't need to have documentation sections in this readme, but have documentation alongside the code

---

##### Testing

- Every page directory inside ./src/pages must have a tests directory that contains all testing logic related to it's parent page logic
- ./src/tests Must containt all kind of tests declarations
- A self descriptive set of directories are already added. New sub directories must be added to their respectively testing directory to test new logic
- Every test directory must have unit testing and integration testing divided by distinct folders

---

##### Others

- Typescript Must be used to code every component over this system
- ./tsconfig.json Must contain all typescript related configurations
- ./src/index.css Must contain the very generic styles lie loading animationn, overall font, etc
- ./Dockerfile must contain all instructions to successfully deploy the app with docker

---

## What can be improved?

-

[cran]: https://www.npmjs.com/package/create-react-app
