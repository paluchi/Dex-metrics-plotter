import { useEffect, useState } from "react";

import getPairDataByDateRange from "../../../../queries/getPairDataByDateRange";

import Chart from "../../../../components/chart/Chart";
import Card from "../../../../components/card/Card";

import { parseAverageAPRPlotData } from "./math/aprMath";

// chart variables
const header = "Annual Percentage Rate (APR)";
const description = `APR (Annual Percentage Rate) is the annual rate of return,
                    expressed as a percentage, before factoring in compound interest.
                    APR only takes into account simple interest.`;
const chartId = "dashboard_apr_chart";
const plottingHours = 24; // amount of hours the chart is going to plot
const height = 350;
const width = undefined;
const aspect = undefined; //5.5 is best for big resolution

// This sections presets the main chart of the dashboard
function AprGraph() {
  const [plotData, setPlotData] = useState([]); // Chart parameters
  const [hoursAmountModifier, sethoursAmountModifierModifier] = useState(); // Hours modifier variable. Average margin for apr calculation
  const [pairAddressModifier, setpairAddressModifierModifier] = useState(); // Pair modifier variable. Which pair is the chart showing

  // At first render start the new metrics reader
  useEffect(() => {
    console.log("improve multirender issue");
    startNewMetricsReader();
  }, []);

  // If some modifier is updated the render again with updated data
  useEffect(() => {
    loadPlotData();
  }, [hoursAmountModifier, pairAddressModifier]);

  const startNewMetricsReader = async () => {
    loadPlotData();

    setInterval(async () => {
      loadPlotData();
    }, 1000 * 60);
  };

  const loadPlotData = async () => {
    // If some of the modifiers is not selected don't plot
    if (!pairAddressModifier || !hoursAmountModifier) return;

    // Create time range based on hours modifier
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setHours(
      fromDate.getHours() - plottingHours - hoursAmountModifier
    );

    // Create time range based on hours modifier
    try {
      const pairData = await getPairDataByDateRange(
        pairAddressModifier,
        fromDate,
        toDate
      );

      // Set plot Line name and get the metrics
      const plotLineName = `Average APR of last ${hoursAmountModifier}hs`;
      const data = parseAverageAPRPlotData(
        plotLineName,
        plottingHours,
        hoursAmountModifier,
        pairData.snapshots
      );

      // At last set the parsed data to post. render
      setPlotData(data);
    } catch (error) {
      // Set sort of error screen here
    }
  };

  // Chart modifiers
  const modifiers = [
    {
      // Pair address selector
      header: "Pair: ",
      items: [
        {
          content: "USDC/WETH",
          callback: setpairAddressModifierModifier,
          callbackParameters: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
          active: true,
        },
        {
          content: "WETH/RKFL",
          callback: setpairAddressModifierModifier,
          callbackParameters: "0xbc9d21652cca70f54351e3fb982c6b5dbe992a22",
        },
      ],
    },
    {
      // Average time frame selector
      header: "Time frame:",
      items: [
        {
          content: "1h",
          callback: sethoursAmountModifierModifier,
          callbackParameters: 1,
        },
        {
          content: "12h",
          callback: sethoursAmountModifierModifier,
          callbackParameters: 12,
        },
        {
          content: "24h",
          callback: sethoursAmountModifierModifier,
          callbackParameters: 24,
          active: true,
        },
      ],
    },
    ,
  ];

  // Present chart inside a card
  return (
    <Card style={{ padding: "0px", marginLeft: "0px" }}>
      <Chart
        header={header}
        description={description}
        data={plotData}
        modifiers={modifiers}
        id={chartId}
        width={width}
        height={height}
        aspect={aspect}
      />
    </Card>
  );
}

export default AprGraph;
