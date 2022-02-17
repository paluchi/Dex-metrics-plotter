import React from "react";

import "./styles/Section.css";

export interface ISection {
  children: JSX.Element;
  header: string;
}

// Presents a section with a header prev to the content
const Section: React.FC<ISection> = ({ header, children }): JSX.Element => {
  return (
    <section className="section">
      {header && <h3 className="header">{header}</h3>}
      {children}
    </section>
  );
};

export default Section;
