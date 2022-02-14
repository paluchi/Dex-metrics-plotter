import { useContext, useEffect } from "react";

import { CurrentItemContext } from "../../../../context/CurrentItemContext";
import { Link } from "react-router-dom";

import "./styles/Item.css";

// An item inside the sidebar's center place 
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
  const { currentItem, setCurrentItem } = useContext(CurrentItemContext);

  useEffect(() => {
    active && handleClick();
  }, []);

  const handleClick = () => {
    setCurrentItem({ activeColor, path, ...extraData });
  };

  // Set active visuals based on selected item context
  const background = currentItem?.path === path ? activeBGColor : undefined;
  const color =
    currentItem?.path === path ? activeColor : unactiveColor || "#77767B";

  const preventDragHandler = (e) => {
    e.preventDefault();
  };

  // Render the item wrapped in a router updating component with the given path
  return (
    <Link to={path} className="item" onClick={handleClick}>
      <button
        style={{
          background,
        }}
        onDragStart={preventDragHandler}
      >
        <Icon fill={color} stroke={color} strokeWidth={0} className="icon" />
      </button>
    </Link>
  );
}

export default Item;
