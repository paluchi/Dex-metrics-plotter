import Card, { ICard } from "../card/Card";

import "./styles/CardsSet.css";

export interface ICardsSet {
  cards: ICard[];
  style?: object;
}

// Presents a set of generic cards based on given array ob cards parameters
const CardsSet: React.FC<ICardsSet> = ({ cards, style }): JSX.Element => {
  return (
    <div className="cardsSet">
      {cards.map(({ children, header, key }: ICard, index) => {
        return (
          <Card
            header={header}
            style={style || { width: "206px", height: "70px" }}
            key={`card_set_${header}_${key}`}
          >
            {children}
          </Card>
        );
      })}
    </div>
  );
};

export default CardsSet;
