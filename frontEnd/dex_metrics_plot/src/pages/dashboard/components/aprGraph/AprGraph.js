import Chart from "../../../../components/chart/Chart";

function AprGraph() {
  const data = [
    {
      name: "January",
      Iphone: 4000,
    },
    {
      name: "March",
      Iphone: 1000,
    },
    {
      name: "May",
      Iphone: 4000,
    },
    {
      name: "July",
      Iphone: 800,
    },
    {
      name: "October",
      Iphone: 1500,
    },
  ];

  const header = "Annual Percentage Rate (APR)";

  const description =
    "APR (Annual Percentage Rate) is the annual rate of return — expressed as a percentage — before factoring in compound interest. APR only takes into account simple interest.";


  return (
    <div>
      <Chart header={header} description={description} data={data} />
    </div>
  );
}

export default AprGraph;
