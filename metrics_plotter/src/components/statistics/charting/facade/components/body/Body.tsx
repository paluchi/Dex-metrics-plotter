import React from "react";

import "./styles/Body.css";

const Body: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children }) => {
  return <div className="chartFacadeBodyContainer">{children}</div>;
};

export default Body;
