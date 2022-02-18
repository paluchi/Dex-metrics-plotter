import React from "react";

import "./styles/Stat.css";

export interface IStat {
  value?: number | string;
  difference?: number;
  header?: string;
}

// This sections presets a set of cards with (currenly) dummy data
const Stat: React.FC<IStat> = ({ value, difference, header, ...props }) => {
  return (
    <div className="stat" {...props}>
      {header && <h6 className="statHeader">{header}</h6>}
      <span className="value">
        {value && value}
        {difference && (
          <span
            className={
              difference > 0 ? "differencePositive" : "differenceNegative"
            }
          >
            {value && ` (${difference}%)`}
            {!value && ` ${difference}%`}
          </span>
        )}
      </span>
    </div>
  );
};

export default Stat;
