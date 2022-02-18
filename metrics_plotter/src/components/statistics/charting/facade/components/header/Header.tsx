import React from "react";

import { useState } from "react";

import Options from "./components/options/Options";

import "./styles/Header.css";

import Info from "../../../../../icons/Info";

interface IHeader {
  header: string;
  description: string;
  id: string;
  chartRef: React.RefObject<HTMLDivElement>;
}

// Presents the chart header, a set of options and a description
const Header: React.FC<IHeader> = ({ header, description, id, chartRef }) => {
  return (
    <div className="headerContainer">
      <h5>{header}</h5>
      <Description text={description} />
      <Options id={`${id}_header`} chartRef={chartRef} imageName={header} />
    </div>
  );
};

// Render the description when the icon is hovered. Unrender if not Hovered
const Description: React.FC<{ text: string }> = ({ text }) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const onHover = () => {
    setShowDescription(true);
  };
  const onUnhover = () => {
    setTimeout(() => {
      setShowDescription(false);
    }, 100);
  };

  return (
    <div>
      <span onMouseOver={onHover} onMouseLeave={onUnhover}>
        <Info fill={"#808080"} strokeWidth={0} />
      </span>
      {showDescription && (
        <div className="chartDescriptionContainer">
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default Header;
