import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
import { CurrentPageProvider } from "./context/CurrentPageContext";

import Dashboard from "./pages/dashboard/Dashboard";
import Strategies from "./pages/Strategies/Strategies";
import Invoices from "./pages/invoices/Invoices";
import Discover from "./pages/discover/Discover";
import Settings from "./pages/settings/Settings";

import { ReactComponent as dashboard } from "./assets/icons/dashboard.svg";
import { ReactComponent as strategies } from "./assets/icons/strategies.svg";
import { ReactComponent as invoices } from "./assets/icons/invoices.svg";
import { ReactComponent as discover } from "./assets/icons/discover.svg";
import { ReactComponent as settings } from "./assets/icons/settings.svg";
import { ReactComponent as notification } from "./assets/icons/notification.svg";

// APR = [(Fees + Interest)/Principal] x (Number of Years) x 100

function App() {
  const sidebarItems = [
    {
      Icon: dashboard,
      activeColor: "blue",
      path: "/",
      Component: Dashboard,
      header: "Dashboard",
      exact: true,
    },
    {
      Icon: strategies,
      activeColor: "green",
      path: "/strategies",
      Component: Strategies,
      header: "Strategies",
    },
    {
      Icon: invoices,
      activeColor: "green",
      path: "/invoices",
      Component: Invoices,
      header: "Invoices",
    },
    {
      Icon: discover,
      activeColor: "green",
      path: "/discover",
      Component: Discover,
      header: "Discover",
    },
    {
      Icon: settings,
      activeColor: "green",
      path: "/settings",
      Component: Settings,
      header: "Settings",
    },
    {
      Icon: notification,
      path: "/test",
      placeEnd: true,
    },
  ];

  return (
    <Router>
      <CurrentPageProvider>
        <Navbar tittle={"Dashboard"} />
        <Sidebar items={sidebarItems} />
      </CurrentPageProvider>
      <Main sections={sidebarItems} />
    </Router>
  );
}

export default App;
