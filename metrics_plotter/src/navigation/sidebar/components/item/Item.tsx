import { useContext } from "react";

import {
  NavigationContext,
  INavigationContextData,
} from "../../../../context/NavigationContext";

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
  callback,
  callbackParameters,
}) => {
  const { reducedPages }: INavigationContextData =
    useContext(NavigationContext);

  const handleClick = () => {
    callback && callback(callbackParameters);
  };

  // Set active visuals based on selected item context
  const background =
    reducedPages.currentPage?.id === id ? activeBGColor : unactiveBGColor;
  const color =
    reducedPages.currentPage?.id === id ? activeColor : unactiveColor;

  const InnerContent: React.FC<{
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }> = ({ onClick }) => {
    return (
      <button
        style={{
          background,
        }}
        onClick={onClick}
      >
        <Icon fill={color} stroke={color} strokeWidth={0} className="icon" />
      </button>
    );
  };

  // Render the item wrapped in a router updating component with the given path
  // If it's a pathed item then render wrapping it in a router's link component. if not then render without the link component
  return (
    <li className="item">
      {path ? (
        <Link to={path} draggable={"false"}>
          <InnerContent onClick={handleClick} />
        </Link>
      ) : (
        <InnerContent onClick={handleClick} />
      )}
    </li>
  );
};

export default Item;
