import { useContext } from "react";

import {
  NavigationContext,
  INavigationContextData,
} from "../../context/NavigationContext";

import Item, { INavigationItem } from "./components/item/Item";
import Logo from "./components/logo/Logo";
import User from "./components/user/user";

import "./styles/Sidebar.css";

// Main web app navigation bar. get a set of objest and seach for icon related data like path, icon component, position, etc
const Sidebar: React.FC = () => {
  const { reducedPages }: INavigationContextData =
    useContext(NavigationContext);

  const endPlaced: INavigationItem[] = [];

  // 3 sections in column. top with the logo, center with the items and bottom with user item
  // Render items while filtering the end placing items
  // Then render the end Placing

  return (
    <aside className="sidebar">
      <div className="top">
        <Logo />
      </div>
      <div className="center">
        <ul>
          {reducedPages.pages.map((icon: INavigationItem, index: number) => {
            if (icon.placeEnd) endPlaced.push(icon);
            else {
              return <Item {...icon} key={`sidebar_top_${index}`} />;
            }
          })}
        </ul>
        <div className="placeEnd">
          <ul>
            {endPlaced.map((item, index) => {
              return <Item {...item} key={`sidebar_bottom_${index}`} />;
            })}
          </ul>
        </div>
      </div>
      <div className="bottom">
        <User />
      </div>
    </aside>
  );
};

export default Sidebar;
