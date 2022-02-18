import React from "react";
import CardsSet, { ICard } from "../../../../components/cardSet/CardsSet";
import Stat, { IStat } from "../stat/Stat";

export type { IStat } from "../stat/Stat";

interface IStatsSet {
  stats: IStat[];
  containerProps?: object;
  cardProps?: object;
  id: string;
}

const StatsSet: React.FC<IStatsSet> = ({
  stats,
  containerProps,
  cardProps,
  id,
}): JSX.Element => {
  const cards: ICard[] = stats.map(({ ...props }: IStat, index) => {
    const stat = <Stat key={`statsSet_stat_${id}`} {...props} />;
    return {
      children: stat,
      ...cardProps,
    };
  });

  return <CardsSet id={`statsSet_${id}`} cards={cards} {...containerProps} />;
};

export default StatsSet;
