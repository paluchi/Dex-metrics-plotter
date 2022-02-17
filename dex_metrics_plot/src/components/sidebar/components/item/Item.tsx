import { useContext, useEffect } from "react";

import {
  CurrentItemContext,
  ITodosContextData,
} from "../../../../context/CurrentItemContext";
import { Link } from "react-router-dom";

import "./styles/Item.css";

export interface INavigationItem {
  id: string;
  header?: string;
  Icon: any; // Icon that is going to render
  activeBGColor?: string; // backgorund color when hovered or active
  activeColor?: string; // Color when hovered or active
  unactiveColor?: string;
  unactiveBGColor?: string;
  active?: boolean;
  placeEnd?: boolean;
  callback?: Function;
  callbackParameters?: any;
  path?: string;
}

// An item inside the sidebar's center place
const Item: React.FC<INavigationItem> = ({
  id,
  Icon,
  activeBGColor,
  unactiveBGColor,
  activeColor,
  unactiveColor,
  path,
  placeEnd,
  active,
  callback,
  callbackParameters,
  ...extraData
}) => {
  const { currentItem, setCurrentItem }: ITodosContextData =
    useContext(CurrentItemContext);

  useEffect(() => {
    active && handleClick();
  }, []);

  const handleClick = () => {
    setCurrentItem({ activeColor, path, id, ...extraData });
    callback && callback(callbackParameters);
  };

  // Set active visuals based on selected item context
  const background = currentItem?.id === id ? activeBGColor : unactiveBGColor;
  const color = currentItem?.id === id ? activeColor : unactiveColor;

  const InnerContent: React.FC = () => {
    return (
      <button
        style={{
          background,
        }}
      >
        <Icon fill={color} stroke={color} strokeWidth={0} className="icon" />
      </button>
    );
  };

  // Render the item wrapped in a router updating component with the given path
  // If it's a pathed item then render wrapping it in a router's link component. if not then render without the link component
  if (path) {
    return (
      <li className="item">
        <Link to={path} onClick={handleClick} draggable={"false"}>
          <InnerContent />
        </Link>
      </li>
    );
  } else {
    return <InnerContent />;
  }
};

export default Item;
