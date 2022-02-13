import "./styles/Card.css";

function Card({ header, style, children }) {
  return (
    <div className="card" style={style}>
      {header && <h6 className="cardHeader">{header}</h6>}
      {children}
    </div>
  );
}

export default Card;
