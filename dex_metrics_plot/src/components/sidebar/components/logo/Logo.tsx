import logo from "../../../../assets/icons/logo.svg";
import "./styles/Logo.css";

const preventDragHandler: React.DragEventHandler<HTMLImageElement> = (e) => {
  e.preventDefault();
};

// A simple logo component
const Logo: React.FC = () => {
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
};

export default Logo;
