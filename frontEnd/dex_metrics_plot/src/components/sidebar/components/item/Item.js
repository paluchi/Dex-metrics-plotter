import { Link } from "react-router-dom";

import "./styles/Item.css";

function Item({ Icon, activeColor, route, placeEnd }) {
  const handleClick = (event) => {};

  return (
    <button className="item" onClick={handleClick}>
      <Icon
        fill={"#77767B"}
        stroke={"#77767B"}
        stroke-width={0}
        className="icon"
      />
    </button>
  );
}

export default Item;
