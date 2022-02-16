import React from "react";
import CardsSet from "../../../../components/cardSet/CardsSet";
import { ICard } from "../../../../components/card/Card";

import "./styles/GlobalMetrics.css";

interface IMetrics {
  header: string;
  value: string;
  difference?: number;
  key: string;
}

// This sections presets a set of cards with (currenly) dummy data
const GlobalMetrics: React.FC = (): JSX.Element => {
  const metrics: IMetrics[] = [
    {
      header: "Total Allocation",
      value: "$2,533,557.32",
      key: "globalMetricsTotalAllocation",
    },
    {
      header: "Day Change",
      value: "+$4,482.29",
      difference: -0.18,
      key: "globalMetricsDayChange",
    },
    {
      header: "YTD Change",
      value: "+$1,360,225",
      difference: 115.93,
      key: "globalMetricsYTDChange",
    },
    {
      header: "Average Annualized Yield",
      value: "23%",
      key: "globalMetricsAverageAnnualizedYield",
    },
    {
      header: "Total Depolyed",
      value: "$21,000,000",
      key: "globalMetricsTotalDepolyed",
    },
  ];

  const CreateBody: React.FC<Omit<IMetrics, "header" | "key">> = ({
    value,
    difference,
  }): JSX.Element => {
    return (
      <span className="value">
        {value}
        {difference && (
          <span
            className={
              difference > 0 ? "differencePositive" : "differenceNegative"
            }
          >{` (${difference}%)`}</span>
        )}
      </span>
    );
  };

  const cards: ICard[] = metrics.map(
    ({ header, value, difference, key }: IMetrics): ICard => {
      const children: JSX.Element = (
        <CreateBody value={value} difference={difference} />
      );

      return { header, children, key };
    }
  );

  return <CardsSet cards={cards} />;
};

export default GlobalMetrics;
