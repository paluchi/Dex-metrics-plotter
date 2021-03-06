import { BrowserRouter as Router } from "react-router-dom";

import Sidebar from "./navigation/sidebar/Sidebar";
import Navbar from "./navigation/navbar/Navbar";
import Main, { IPage } from "./navigation/main/Main";
import useNotification from "./navigation/notifications/useNotification";
import NavigationProvider from "./context/NavigationContext";

import Dummy from "./pages/dummy/DummyPage";
import Dashboard from "./pages/dashboard/Dashboard";

import IDashboard from "./components/icons/Dashboard";
import IStrategies from "./components/icons/Strategies";
import IInvoices from "./components/icons/Invoices";
import IDiscover from "./components/icons/Discover";
import ISettings from "./components/icons/Settings";
import INotification from "./components/icons/Notification";

// Web app initiator
const App: React.FC = () => {
  const [Notifications, toggleNotifications] = useNotification();

  // This array contains the web's main pages (dashboard, strategies, invoices, etc), their icon in navbar, header, path, and other variables
  // This is the place where you insert the pages and callbacks you interact with when using the navbar
  const mainPages: IPage[] = [
    {
      path: "/",
      id: "page_Dashboard",
      Component: <Dashboard />,
      exactRoute: true,
      iconProps: {
        header: "Dashboard",
        Icon: IDashboard,
        activeBGColor: "#E7F1FF",
        activeColor: "#2E71F0",
        unactiveColor: "#77767B",
      },
      active: true,
    },
    {
      id: "page_Strategies",
      path: "/strategies",
      Component: <Dummy />,
      iconProps: {
        header: "Dummy components",
        Icon: IStrategies,
        activeBGColor: "#e8ffea",
        activeColor: "#2fcc44",
        unactiveColor: "#77767B",
      },
    },
    {
      id: "page_Invoices",
      path: "/invoices",
      Component: <Dummy />,
      iconProps: {
        header: "Dummy components",
        Icon: IInvoices,
        activeBGColor: "#fff6e8",
        activeColor: "#a68247",
        unactiveColor: "#77767B",
      },
    },
    {
      id: "page_Discover",
      path: "/discover",
      Component: <Dummy />,
      iconProps: {
        header: "Dummy components",
        Icon: IDiscover,
        activeBGColor: "#fbebff",
        activeColor: "#c02ef0",
        unactiveColor: "#77767B",
      },
    },
    {
      id: "page_Settings",
      path: "/settings",
      Component: <Dummy />,
      iconProps: {
        header: "Dummy components",
        Icon: ISettings,
        activeBGColor: "#ffe6e6",
        activeColor: "#f02e68",
        unactiveColor: "#77767B",
      },
    },
    {
      id: "notifications",
      iconProps: {
        header: "Dummy components",
        activeBGColor: "#E7F1FF",
        activeColor: "#FFD700",
        unactiveColor: "#323232",
        Icon: INotification,
        placeEnd: true,
        callback: toggleNotifications,
      },
    },
  ];

  // Render the sidebar, navbar and the main component with all the prev. declared screens
  // the prev pages are passes to sidebar too so it can create the navigation buttons
  return (
    <Router>
      <NavigationProvider>
        <Navbar />
        <Sidebar />
        <Notifications />
        <Main pages={mainPages} />
      </NavigationProvider>
    </Router>
  );
};

export default App;
