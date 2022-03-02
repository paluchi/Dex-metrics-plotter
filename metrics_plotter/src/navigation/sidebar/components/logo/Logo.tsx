import { useContext } from "react";

import {
  NavigationContext,
  INavigationContextData,
} from "../../../../context/NavigationContext";

import LogoIcon from "../../../../components/icons/Logo";
import "./styles/Logo.css";

// A simple logo component
const Logo: React.FC = () => {
  const { reducedPages }: INavigationContextData =
    useContext(NavigationContext);

  return (
    <div className="logoContainer">
      <LogoIcon className="logo" fill={reducedPages.currentPage?.activeColor} style={{transition:".3s"}}/>
    </div>
  );
};

export default Logo;
