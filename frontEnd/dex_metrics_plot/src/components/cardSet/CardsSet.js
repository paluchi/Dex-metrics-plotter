import Card from "../card/Card";

import "./styles/CardsSet.css";

function CardsSet({ cards }) {
  return (
    <div className="cardsSet">
      {cards.map(({ body, header }, index) => {
        return (
          <Card header={header} style={{ width: "206px", height: "70px" }}>
            {body}
          </Card>
        );
      })}
    </div>
  );
}

export default CardsSet;
