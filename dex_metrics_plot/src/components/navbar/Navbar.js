import Header from "./components/header/Header";
import Seachbox from "./components/searchbox/Searchbox";

import "./styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Header />
      <Seachbox />
    </nav>
  );
}

export default Navbar;
