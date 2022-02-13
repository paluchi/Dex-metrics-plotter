import { useEffect, useState } from "react";

import getPairDataByUnixTS from "./queries/getPairDataByUnixTS";

import Chart from "../../../../components/chart/Chart";
import Card from "../../../../components/card/Card";

import { getAverageAPR, parsePlotData } from "./math/aprMath";

// Printed variables
const header = "Annual Percentage Rate (APR)";
const description = `APR (Annual Percentage Rate) is the annual rate of return,
                    expressed as a percentage, before factoring in compound interest.
                    APR only takes into account simple interest.`;
const plotLineName = "APR";

// Start of aprGraph fuction
function AprGraph() {
  const [plotData, setPlotData] = useState([]);
  const [hourlyAverage, setHourlyAverage] = useState();
  const [pairAddress, setPairAddress] = useState();

  // At first render start the reader
  useEffect(() => {
    startNewMetricsReader();
  }, []);

  // If some modifier is updated the render again with updated data
  useEffect(() => {
    loadPlotData();
  }, [hourlyAverage, pairAddress]);

  const startNewMetricsReader = async () => {
    loadPlotData();

    setInterval(async () => {
      loadPlotData();
    }, 1000 * 60);
  };

  const loadPlotData = async () => {
    if (!pairAddress || !hourlyAverage) return;

    const currentDate = new Date();
    const toUnixDate = Math.round(currentDate.getTime() / 1000);
    const fromUnixDate = currentDate.setHours(
      currentDate.getHours() - hourlyAverage
    );

    const pairData = await getPairDataByUnixTS(
      pairAddress,
      fromUnixDate,
      toUnixDate
    );

    const averageAPR = getAverageAPR(pairData.snapshots);
    const data = parsePlotData(plotLineName, averageAPR);

    setPlotData(data);
  };

  // Chart modifiers
  const modifiers = [
    {
      // Average time frame selector
      header: "Average time frame:",
      items: [
        { content: "1h", callback: setHourlyAverage, callbackParameters: 1 },
        {
          content: "12h",
          callback: setHourlyAverage,
          callbackParameters: 12,
        },
        {
          content: "24h",
          callback: setHourlyAverage,
          callbackParameters: 24,
          active: true,
        },
      ],
    },
    ,
    {
      // Pair address selector
      header: "Pair: ",
      items: [
        {
          content: "pair 1",
          callback: setPairAddress,
          callbackParameters: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
          active: true,
        },
        {
          content: "pair 2",
          callback: setPairAddress,
          callbackParameters: "0xbc9d21652cca70f54351e3fb982c6b5dbe992a22",
        },
      ],
    },
    ,
  ];

  return (
    <Card style={{ padding: "0px", marginLeft: "0px" }}>
      <Chart
        header={header}
        description={description}
        data={plotData}
        modifiers={modifiers}
      />
    </Card>
  );
}

export default AprGraph;
