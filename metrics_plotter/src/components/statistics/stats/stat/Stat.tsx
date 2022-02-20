import React from "react";

import "./styles/Stat.css";

export interface IStat {
  header?: string;
  isLoading?: boolean;
  value?: number | string;
  difference?: number;
}

// This sections presets a set of cards with (currenly) dummy data
const Stat: React.FC<IStat> = ({
  value,
  difference,
  header,
  isLoading = false,
  ...props
}) => {
  return (
    <>
      {isLoading ? (
        <LoadingStat />
      ) : (
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
      )}
    </>
  );
};

export default Stat;

const LoadingStat = () => {
  return (
    <div className="stat dontLoads">
      <div className="loadingStatHeader genericIsLoading"></div>
      <div className="loadingValue genericIsLoading"></div>
      <div className="loadingDifference genericIsLoading"></div>
    </div>
  );
};
