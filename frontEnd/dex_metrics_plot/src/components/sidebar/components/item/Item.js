import { useContext, useEffect } from "react";

import { CurrentPageContext } from "../../../../context/CurrentPageContext";
import { Link } from "react-router-dom";

import "./styles/Item.css";

function Item({
  Icon,
  activeBGColor,
  activeColor,
  unactiveColor,
  path,
  placeEnd,
  active,
  ...extraData
}) {
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);

  useEffect(() => {
    active && handleClick();
  }, []);

  const handleClick = () => {
    setCurrentPage({ activeColor, path, ...extraData });
  };

  const background = currentPage?.path === path ? activeBGColor : undefined;
  const color =
    currentPage?.path === path ? activeColor : unactiveColor || "#77767B";

  const preventDragHandler = (e) => {
    e.preventDefault();
  };

  return (
    <button
      className="item"
      style={{
        background,
      }}
      onClick={handleClick}
      onDragStart={preventDragHandler}
    >
      <Link to={path}>
        <Icon fill={color} stroke={color} strokeWidth={0} className="icon" />
      </Link>
    </button>
  );
}

export default Item;
