import { forwardRef } from "react";

import "./styles/Card.css";

export interface ICard {
  children: React.ReactNode;
  style?: object;
}

// A simple but flexible card component
const Card = forwardRef<HTMLDivElement, ICard>(
  ({ children, ...props }, ref) => {
    return (
      <div className={"card"} {...props} ref={ref}>
        {children}
      </div>
    );
  }
);

export default Card;
