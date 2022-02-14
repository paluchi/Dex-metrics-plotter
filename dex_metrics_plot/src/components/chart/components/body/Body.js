import { forwardRef } from "react";

import "./styles/Body.css";

// A not so simple wrapper that reference his first child
const Body = forwardRef(({ children }, ref) => {
  return (
    <div className="bodyContainer" ref={ref}>
      {children}
    </div>
  );
});

export default Body;
