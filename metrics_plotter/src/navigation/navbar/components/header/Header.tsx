import { useContext } from "react";

import {
  NavigationContext,
  INavigationContextData,
} from "../../../../context/NavigationContext";

import "./styles/Header.css";

// Render the current page header based on context
const Header: React.FC = () => {
  const { reducedPages }: INavigationContextData =
    useContext(NavigationContext);

  return (
    <header className="title">
      <h1>{reducedPages?.currentPage?.header}</h1>
    </header>
  );
};

export default Header;
