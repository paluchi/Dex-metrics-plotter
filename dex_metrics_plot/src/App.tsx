import { BrowserRouter as Router } from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Main, { IMainPage } from "./pages/main/Main";
import { CurrentItemProvider } from "./context/CurrentItemContext";

import { INavigationItem } from "./components/sidebar/components/item/Item";

import Dashboard from "./pages/dashboard/Dashboard";
import Strategies from "./pages/Strategies/Strategies";
import Invoices from "./pages/invoices/Invoices";
import Discover from "./pages/discover/Discover";
import Settings from "./pages/settings/Settings";
import Notifications from "./pages/notifications/Notifications";

import dashboard from "./assets/icons/dashboard.svg";
import strategies from "./assets/icons/strategies.svg";
import invoices from "./assets/icons/invoices.svg";
import discover from "./assets/icons/discover.svg";
import settings from "./assets/icons/settings.svg";
import notification from "./assets/icons/notification.svg";

interface IDeclaredComponentsPlusIcon {
  path: string;
  id: string;
  itemData: Omit<INavigationItem, "id" | "path">;
  componentData: Omit<IMainPage, "id" | "path">;
}

// Web app initiator
const App: React.FC = () => {
  let components: IMainPage[] = [];
  let items: INavigationItem[] = [];

  mainComponents.map(
    ({ path, id, itemData, componentData }: IDeclaredComponentsPlusIcon) => {
      components.push({ path, id, ...componentData });
      items.push({ path, id, ...itemData });
    }
  );

  // Render the sidebar, navbar and the main component with all the prev. declared screens
  // the prev pages are passes to sidebar too so it can create the navigation buttons
  return (
    <Router>
      <CurrentItemProvider>
        <>
          <Navbar />
          <Sidebar items={items} />
        </>
      </CurrentItemProvider>
      <Main sections={components} />
    </Router>
  );
};

export default App;

// This array contains the web's main pages (dashboard, strategies, invoices, etc), their icon in navbar, header, path, and other variables
// This is the place where you insert the pages and callbacks you interact with when using the navbar
const mainComponents: IDeclaredComponentsPlusIcon[] = [
  {
    path: "/",
    id: "page_Dashboard",
    itemData: {
      header: "Dashboard",
      icon: dashboard,
      activeBGColor: "#E7F1FF",
      activeColor: "#2E71F0",
      active: true,
    },
    componentData: {
      Component: <Dashboard />,
      exact: true,
    },
  },
  {
    id: "page_Strategies",
    path: "/strategies",
    itemData: {
      header: "Strategies",
      icon: strategies,
      activeBGColor: "#E7F1FF",
      activeColor: "#2E71F0",
    },
    componentData: {
      Component: <Strategies />,
    },
  },
  {
    id: "page_Invoices",
    path: "/invoices",
    itemData: {
      header: "Invoices",
      icon: invoices,
      activeBGColor: "#E7F1FF",
      activeColor: "#2E71F0",
    },
    componentData: {
      Component: <Invoices />,
    },
  },
  {
    id: "page_Discover",
    path: "/discover",
    itemData: {
      header: "Discover",
      icon: discover,
      activeBGColor: "#E7F1FF",
      activeColor: "#2E71F0",
    },
    componentData: {
      Component: <Discover />,
    },
  },
  {
    id: "page_Settings",
    path: "/settings",
    itemData: {
      header: "Settings",
      icon: settings,
      activeBGColor: "#E7F1FF",
      activeColor: "#2E71F0",
    },
    componentData: {
      Component: <Settings />,
    },
  },
  {
    id: "page_Notifications",
    path: "/invoices",
    itemData: {
      header: "Notifications",
      activeBGColor: "#E7F1FF",
      activeColor: "#3232",
      unactiveColor: "#323232",
      icon: notification,
      placeEnd: true,
    },
    componentData: {
      Component: <Notifications />,
    },
  },
];
