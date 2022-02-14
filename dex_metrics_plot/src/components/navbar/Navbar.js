import Header from "./components/header/Header";
import Seachbox from "./components/searchbox/Searchbox";

import "./styles/Navbar.css";

// The top web app navbar (just prints the current page header based on the context and a dummy searchbox)
function Navbar() {
  return (
    <nav className="navbar">
      <Header />
      <Seachbox />
    </nav>
  );
}

export default Navbar;
