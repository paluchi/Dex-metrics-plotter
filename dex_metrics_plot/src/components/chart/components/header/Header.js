import { useState } from "react";

import Options from "./components/Options";

import { ReactComponent as ChartDescription } from "../../../../assets/icons/chartDescription.svg";

import "./styles/Header.css";


// Presents the chart header, a set of options and a description
function Header({ header, description, parentId, chartRef }) {
  return (
    <div className="headerContainer">
      <h5>{header}</h5>
      <Description text={description} />
      <Options
        parentId={`${parentId}`}
        chartRef={chartRef}
        imageName={header}
      />
    </div>
  );
}


// Render the description when the icon is hovered. Unrender if not Hovered
function Description({ text }) {
  const [showDescription, setShowDescription] = useState(false);

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
        <ChartDescription fill={"#808080"} strokeWidth={0} />
      </span>
      {showDescription && (
        <div className="chartDescriptionContainer">
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}

export default Header;
