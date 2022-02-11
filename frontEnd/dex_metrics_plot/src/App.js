import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";

import "./App.css";
import { ReactComponent as dashboard }  from "./assets/icons/dashboard.svg";
import { ReactComponent as strategies }  from "./assets/icons/strategies.svg";
import { ReactComponent as invoices }  from "./assets/icons/invoices.svg";
import { ReactComponent as discover }  from "./assets/icons/discover.svg";
import { ReactComponent as settings }  from "./assets/icons/settings.svg";
import { ReactComponent as notification }  from "./assets/icons/notification.svg";

function App() {
  const sidebarItems = [
    {
      Icon: dashboard,
      activeColor: "blue",
      route: "/route1",
    },
    {
      Icon: strategies,
      activeColor: "green",
      route: "/route3",
    },
    {
      Icon: invoices,
      activeColor: "red",
      route: "/route2",
    },
    {
      Icon: discover,
      activeColor: "green",
      route: "/route3",
    },
    {
      Icon: settings,
      activeColor: "green",
      route: "/route3",
    },
    {
      Icon: notification,
      route: "/route3",
      placeEnd: true,
    },
  ];

  return (
    <Router>
      <Navbar tittle={"Dashboard"} />
      <Sidebar items={sidebarItems} />
      <Main sections={[Home]} />
    </Router>
  );
}

function Home() {
  /* All <Route path> and <Link to> values in this
     component will automatically be "mounted" at the
     /users URL prefix since the <Users> element is only
     ever rendered when the URL matches /users/*
  */
  return (
    <div>
      <h1>HOLAAAAASASDASDASD</h1>
    </div>
  );
}

function Users() {
  /* All <Route path> and <Link to> values in this
     component will automatically be "mounted" at the
     /users URL prefix since the <Users> element is only
     ever rendered when the URL matches /users/*
  */
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>
    </div>
  );
}

export default App;
