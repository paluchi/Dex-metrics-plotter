import "./styles/Searchbox.css";

import ISearchIcon from "../../../../components/icons/SearchIcon";

// A dummy  searchbox
const Searchbox: React.FC = () => {
  return (
    <div className="searchbox">
      <ISearchIcon className="searchboxIcon" />
      <input type="text" placeholder="Search..." />
    </div>
  );
};

export default Searchbox;
