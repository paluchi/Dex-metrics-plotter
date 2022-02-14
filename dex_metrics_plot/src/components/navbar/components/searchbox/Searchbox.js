import "./styles/Searchbox.css";
import { ReactComponent as SearchIcon } from "../../../../assets/icons/searchIcon.svg";


// A dummy  searchbox
function Searchbox() {
  return (
    <div className="searchbox">
      <SearchIcon className="searchboxIcon"/>
      <input type="text" placeholder="Search..." />
    </div>
  );
}

export default Searchbox;
