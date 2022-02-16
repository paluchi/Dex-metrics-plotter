import "./styles/Card.css";

export interface ICard {
  header?: string;
  children: React.ReactNode;
  style?: object;
  key: string;
}

// A simple but flexible card component
const Card = ({ header, children, ...extras }: ICard): JSX.Element => {
  return (
    <div className="card" {...extras}>
      {header && <h6 className="cardHeader">{header}</h6>}
      {children}
    </div>
  );
};

export default Card;
