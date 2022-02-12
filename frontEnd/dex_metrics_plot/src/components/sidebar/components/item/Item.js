import { useContext } from "react";

import { CurrentPageContext } from "../../../../context/CurrentPageContext";
import { Link } from "react-router-dom";

import "./styles/Item.css";

function Item({ Icon, activeColor, path, placeEnd, ...extraData }) {
  const { setCurrentPage } = useContext(CurrentPageContext);

  const handleClick = () => {
    setCurrentPage({ activeColor, path, ...extraData });
  };

  return (
    <Link to={path}>
      <button className="item" onClick={handleClick}>
        <Icon
          fill={"#77767B"}
          stroke={"#77767B"}
          strokeWidth={0}
          className="icon"
        />
      </button>
    </Link>
  );
}

export default Item;
