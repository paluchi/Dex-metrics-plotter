import "./styles/Section.css"

// Presents a section with a header prev to the content
function Section({ header, children }) {
  return (
    <section className="section">
      {header && <h3 className="header">{header}</h3>}
      {children}
    </section>
  );
}

export default Section;
