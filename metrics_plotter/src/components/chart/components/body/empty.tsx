import React from "react";

import "./styles/Body.css";

// This component renders a "empty chart error"
const EmptyChart: React.FC = () => {
  return (
    <div className="emptyChartContainer">
      <span>It looks like your chart is empty!</span>
      <span>The given data was not enough to create a chart</span>
    </div>
  );
};

export default EmptyChart;
