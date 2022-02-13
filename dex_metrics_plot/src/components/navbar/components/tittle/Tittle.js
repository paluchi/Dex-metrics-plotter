import { useContext } from "react";

import { CurrentItemContext } from "../../../../context/CurrentItemContext";

import "./styles/Tittle.css";

function Tittle() {
  const { currentItem } = useContext(CurrentItemContext);

  return (
    <header className="tittle">
      <h1>{currentItem?.header}</h1>
    </header>
  );
}

export default Tittle;
