import { useContext } from "react";

import {
  CurrentItemContext,
  ITodosContextData,
} from "../../../../context/CurrentItemContext";

import "./styles/Header.css";

// Render the current page header based on context
const Header: React.FC = () => {
  const { currentItem }: ITodosContextData = useContext(CurrentItemContext);

  return (
    <header className="title">
      <h1>{currentItem?.header}</h1>
    </header>
  );
};

export default Header;
