import { forwardRef } from "react";

import "./styles/Card.css";

export interface ICard {
  children: React.ReactNode;
  style?: object;
  id?: string;
  className?: string;
}

// A simple but flexible card component
const Card = forwardRef<HTMLDivElement, ICard>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className={`card ${className}`} {...props} ref={ref}>
        {children}
      </div>
    );
  }
);

export default Card;
