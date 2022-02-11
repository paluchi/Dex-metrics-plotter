import { useContext } from "react";

import { CurrentPageContext } from "../../../../context/CurrentPageContext";

import "./styles/Tittle.css";

function Tittle() {
  const { currentPage } = useContext(CurrentPageContext);

  return (
    <header className="tittle">
      <h1>{currentPage?.header}</h1>
    </header>
  );
}

export default Tittle;
