import "./styles/Section.css"

function Section({ header, children }) {
  return (
    <section className="section">
      <h3 className="header">{header}</h3>
      {children}
    </section>
  );
}

export default Section;
