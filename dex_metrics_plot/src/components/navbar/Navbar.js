import Tittle from "./components/tittle/Tittle";
import Seachbox from "./components/searchbox/Searchbox";

import "./styles/Navbar.css";

function Navbar({ tittle }) {
  return (
    <nav className="navbar">
        <Tittle tittle={tittle} />
        <Seachbox />
    </nav>
  );
}

export default Navbar;
