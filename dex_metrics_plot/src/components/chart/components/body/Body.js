import { forwardRef } from "react";

import "./styles/Body.css";

const Body = forwardRef(({ children }, ref) => {
  return (
    <div className="bodyContainer" ref={ref}>
      {children}
    </div>
  );
});

export default Body;
