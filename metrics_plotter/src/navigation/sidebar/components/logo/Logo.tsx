import ILogo from "../../../../components/icons/Logo";
import "./styles/Logo.css";

// A simple logo component
const Logo: React.FC = () => {
  return (
    <div className="logoContainer">
      <ILogo className="logo" />
    </div>
  );
};

export default Logo;
