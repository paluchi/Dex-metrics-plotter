import { BrowserRouter as Router } from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
import { CurrentItemProvider } from "./context/CurrentItemContext";

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

function App() {
  const mainPages = [
    {
      Icon: dashboard,
      activeBGColor: "#E7F1FF",
      activeColor: "#2E71F0",
      path: "/",
      Component: Dashboard,
      header: "Dashboard",
      exact: true,
      active: true,
    },
    {
      Icon: strategies,
      activeBGColor: "#E7F1FF",
      activeColor: "#2E71F0",
      path: "/strategies",
      Component: Strategies,
      header: "Strategies",
    },
    {
      Icon: invoices,
      activeBGColor: "#E7F1FF",
      activeColor: "#2E71F0",
      path: "/invoices",
      Component: Invoices,
      header: "Invoices",
    },
    {
      Icon: discover,
      activeBGColor: "#E7F1FF",
      activeColor: "#2E71F0",
      path: "/discover",
      Component: Discover,
      header: "Discover",
    },
    {
      Icon: settings,
      activeBGColor: "#E7F1FF",
      activeColor: "#2E71F0",
      path: "/settings",
      Component: Settings,
      header: "Settings",
    },
    {
      activeBGColor: "#E7F1FF",
      activeColor: "#3232",
      unactiveColor: "#323232",
      Icon: notification,
      path: "/addRouteOrCallback",
      placeEnd: true,
    },
  ];

  return (
    <Router>
      <CurrentItemProvider>
        <Navbar tittle={"Dashboard"} />
        <Sidebar items={mainPages} />
      </CurrentItemProvider>
      <Main sections={mainPages} />
    </Router>
  );
}

export default App;
