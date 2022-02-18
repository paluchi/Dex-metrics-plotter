import React from "react";
import StatsSet, {
  IStat,
} from "../../../../components/statistics/stats/statsSet/StatsSet";

import "./styles/AnnualizedReturns.css";

// This sections presets a set of cards with (currenly) dummy data
const AnnualizedReturns: React.FC = (): JSX.Element => {
  const stats: IStat[] = [
    { header: "All-Time", difference: 8.838 },
    { header: "30-Day", difference: 8.838 },
    { header: "7-Day", difference: 7.382 },
    { header: "24-Day", difference: 7.765 },
  ];

  return <StatsSet id={"dashboard_annualizedReturns"} stats={stats} />;
};

export default AnnualizedReturns;
