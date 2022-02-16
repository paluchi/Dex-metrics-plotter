import React from "react";
import CardsSet from "../../../../components/cardSet/CardsSet";
import { ICard } from "../../../../components/card/Card";

import "./styles/AnnualizedReturns.css";

interface IMetrics {
  header: string;
  difference: number;
  key: string;
}

// This sections presets a set of cards with (currenly) dummy data
const AnnualizedReturns: React.FC = (): JSX.Element => {
  const metrics: IMetrics[] = [
    { header: "All-Time", difference: 8.838, key: "annualizedReturnsAll-Time" },
    { header: "30-Day", difference: 8.838, key: "annualizedReturns30-Day" },
    { header: "7-Day", difference: 7.382, key: "annualizedReturns7-Day" },
    { header: "24-Day", difference: 7.765, key: "annualizedReturns24-Day" },
  ];

  const CreateBody: React.FC<Omit<IMetrics, "header" | "key">> = ({
    difference,
  }): JSX.Element => {
    return (
      <span className="value">
        <span
          className={
            difference > 0 ? "differencePositive" : "differenceNegative"
          }
        >{`${difference}%`}</span>
      </span>
    );
  };

  const cards: ICard[] = metrics.map(
    ({ header, difference, key }: IMetrics): ICard => {
      const children: JSX.Element = <CreateBody difference={difference} />;

      return { header, children, key };
    }
  );

  return <CardsSet cards={cards} />;
};

export default AnnualizedReturns;
