import logo from "../../../../assets/icons/logo.png";
import "./styles/Logo.css";

const preventDragHandler = (e) => {
  e.preventDefault();
};


// A simple logo component
function Logo() {
  return (
    <div className="logoContainer">
      <img
        src={logo}
        alt="logo"
        className="logo"
        onDragStart={preventDragHandler}
      ></img>
    </div>
  );
}

export default Logo;
