import "./styles/Card.css";

export interface ICard {
  children: React.ReactNode;
  style?: object;
}

// A simple but flexible card component
const Card = ({ children, ...props }: ICard): JSX.Element => {
  return (
    <div className={"card"} {...props}>
      {children}
    </div>
  );
};

export default Card;
