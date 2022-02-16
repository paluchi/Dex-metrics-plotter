import "./styles/Searchbox.css";

import searchIcon from "../../../../assets/icons/searchIcon.svg";

// A dummy  searchbox
const Searchbox: React.FC = () => {
  return (
    <div className="searchbox">
      <img src={searchIcon} className="searchboxIcon" />
      <input type="text" placeholder="Search..." />
    </div>
  );
};

export default Searchbox;
