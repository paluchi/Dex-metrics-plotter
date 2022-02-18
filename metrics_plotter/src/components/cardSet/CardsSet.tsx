import Card, { ICard } from "../card/Card";

import "./styles/CardsSet.css";

export type { ICard } from "../card/Card";

export interface ICardsSet {
  cards: ICard[];
  style?: object;
  id: string;
}

// Presents a set of generic cards based on given array ob cards parameters
const CardsSet: React.FC<ICardsSet> = ({
  cards,
  id,
  ...containerProps
}): JSX.Element => {
  return (
    <div className="cardsSet" {...containerProps}>
      {cards.map(({ children, ...props }: ICard, index) => {
        return (
          <Card
            key={`card_set_${id}_${index}`}
            style={props.style || { width: "206px", height: "70px" }}
            {...props}
          >
            {children}
          </Card>
        );
      })}
    </div>
  );
};

export default CardsSet;
