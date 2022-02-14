import CardsSet from "../../../../components/cardSet/CardsSet";

import "./styles/AnnualizedReturns.css";

// This sections presets a set of cards with (currenly) dummy data
function AnnualizedReturns() {
  const metrics = [
    { header: "All-Time", difference: 8.838 },
    { header: "30-Day", difference: 8.838 },
    { header: "7-Day", difference: 7.382 },
    { header: "24-Day", difference: 7.765 },
  ];

  const createBody = (value, difference) => {
    return (
      <span className="value">
        {value}
        {difference && (
          <span
            className={
              difference > 0 ? "differencePositive" : "differenceNegative"
            }
          >{` ${difference}%`}</span>
        )}
      </span>
    );
  };

  const cards = metrics.map(({ header, value, difference }) => {
    const body = createBody(value, difference);

    return { header, body };
  });

  return <CardsSet cards={cards} />;
}

export default AnnualizedReturns;
