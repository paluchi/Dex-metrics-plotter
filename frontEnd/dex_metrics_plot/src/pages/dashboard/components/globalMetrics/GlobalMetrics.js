import CardsSet from "../../../../components/cardSet/CardsSet";

import "./styles/GlobalMetrics.css";

function GlobalMetrics() {
  const metrics = [
    { header: "Total Allocation", value: "$2,533,557.32" },
    { header: "Day Change", value: "+$4,482.29", difference: -0.18 },
    { header: "YTD Change", value: "+$1,360,225", difference: 115.93 },
    { header: "Average Annualized Yield", value: "23%" },
    { header: "Total Depolyed", value: "$21,000,000" },
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
          >{` (${difference}%)`}</span>
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

export default GlobalMetrics;
