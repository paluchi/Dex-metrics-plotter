import { useContext } from "react";

import { CurrentItemContext } from "../../../../context/CurrentItemContext";

import "./styles/Header.css";


// Render the current page header based on context
function Header() {
  const { currentItem } = useContext(CurrentItemContext);

  return (
    <header className="title">
      <h1>{currentItem?.header}</h1>
    </header>
  );
}

export default Header;
