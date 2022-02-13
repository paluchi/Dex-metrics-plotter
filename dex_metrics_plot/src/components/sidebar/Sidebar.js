import Item from "./components/item/Item";
import Logo from "./components/logo/Logo";
import User from "./components/user/user";

import "./styles/Sidebar.css";

function Sidebar({ items }) {
  const endPlaced = [];

  return (
    <aside className="sidebar">
      <div className="top">
        <Logo />
      </div>
      <div className="center">
        {items.map((item, index) => {
          if (item.placeEnd) endPlaced.push(item);
          else {
            return <Item {...item} key={`sidebar_top_${index}`} />;
          }
        })}
        <div className="placeEnd">
          {endPlaced.map((item, index) => {
            return <Item {...item} key={`sidebar_bottom_${index}`} />;
          })}
        </div>
      </div>
      <div className="bottom">
        <User />
      </div>
    </aside>
  );
}

export default Sidebar;
