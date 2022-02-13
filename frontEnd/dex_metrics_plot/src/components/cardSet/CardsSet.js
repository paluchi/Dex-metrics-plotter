import Card from "../card/Card";

import "./styles/CardsSet.css";

function CardsSet({ cards, style }) {
  return (
    <div className="cardsSet">
      {cards.map(({ body, header }, index) => {
        return (
          <Card
            header={header}
            style={style || { width: "206px", height: "70px" }}
            key={`card_set_${header}_${index}`}
          >
            {body}
          </Card>
        );
      })}
    </div>
  );
}

export default CardsSet;
