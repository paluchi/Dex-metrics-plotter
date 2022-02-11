import Item from "./components/item/Item";
import Logo from "./components/logo/Logo";

import "./styles/Sidebar.css";

function Sidebar({ items }) {
  const endPlaced = [];

  return (
    <aside className="sidebar">
      <div className="top">
        <Logo />
      </div>
      <div className="center">
        {items.map((item) => {
          if (item.placeEnd) endPlaced.push(item);
          else {
            return <Item {...item} />;
          }
        })}
        <div className="placeEnd">
          {endPlaced.map((item) => {
            return <Item {...item} />;
          })}
        </div>
      </div>
      <div className="bottom">A</div>
    </aside>
  );
}

export default Sidebar;
