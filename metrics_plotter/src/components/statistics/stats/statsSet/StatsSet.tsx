import React from "react";
import CardsSet, { ICard } from "../../../../components/cardSet/CardsSet";
import Stat, { IStat } from "../stat/Stat";

export type { IStat } from "../stat/Stat";

interface IStatsSet {
  containerProps?: object;
  cardProps?: object;
  id: string;
  isLoading?: boolean;
  stats: IStat[];
}

const StatsSet: React.FC<IStatsSet> = ({
  stats,
  isLoading,
  containerProps,
  cardProps,
  id,
}): JSX.Element => {
  const cards: ICard[] = isLoading
    ? LoadingDummies()
    : stats.map(({ ...props }: IStat) => {
        const stat = <Stat key={`statsSet_stat_${id}`} {...props} />;
        return {
          children: stat,
          ...cardProps,
        };
      });

  return <CardsSet id={`statsSet_${id}`} cards={cards} {...containerProps} />;
};

export default StatsSet;

const LoadingDummies = () => {
  return Array.from({ length: 5 }).map(() => {
    return {
      children: <Stat isLoading={true} />,
    };
  });
};
