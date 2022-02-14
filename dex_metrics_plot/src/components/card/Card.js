import "./styles/Card.css";


// A simple but flexible card component
function Card({ header, children, ...extras}) {
  return (
    <div className="card" {...extras}>
      {header && <h6 className="cardHeader">{header}</h6>}
      {children}
    </div>
  );
}

export default Card;
