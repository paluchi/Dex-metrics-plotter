import logo from "../../../../assets/icons/logo.png";
import "./styles/Logo.css";

const preventDragHandler = (e) => {
  e.preventDefault();
};

function Logo() {
  return (
    <img
      src={logo}
      alt="logo"
      className="logo"
      onDragStart={preventDragHandler}
    ></img>
  );
}

export default Logo;
