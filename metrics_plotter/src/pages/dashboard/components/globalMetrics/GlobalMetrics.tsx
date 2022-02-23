import React from "react";
import StatsSet, {
  IStat,
} from "../../../../components/statistics/stats/statsSet/StatsSet";

import "./styles/GlobalMetrics.css";

// This sections presets a set of cards with (currenly) dummy data
const GlobalMetrics: React.FC = (): JSX.Element => {
  const stats: IStat[] = [
    {
      header: "Total Allocation",
      value: "$2,533,557.32",
    },
    {
      header: "Day Change",
      value: "+$4,482.29",
      difference: -0.18,
    },
    {
      header: "YTD Change",
      value: "+$1,360,225",
      difference: 115.93,
    },
    {
      header: "Average Annualized Yield",
      value: "23%",
    },
    {
      header: "Total Deployed",
      value: "$21,000,000",
    },
  ];

  return <StatsSet stats={stats} id={"dashboard_globalMetrics"} />;
};

export default GlobalMetrics;
