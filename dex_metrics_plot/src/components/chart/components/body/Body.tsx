import { forwardRef } from "react";

import "./styles/Body.css";

type Props = React.HTMLProps<HTMLDivElement>;

// A not so simple wrapper that reference his first child
const Body = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <div className="bodyContainer" ref={ref}>
      {props.children}
    </div>
  );
});

export default Body;
