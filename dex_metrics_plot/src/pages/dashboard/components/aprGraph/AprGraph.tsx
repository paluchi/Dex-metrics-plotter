import React, { useEffect, useState } from "react";

import getPairDataByDateRange, {
  IPair,
} from "../../../../queries/getPairDataByDateRange";

import Chart, { IModifier } from "../../../../components/chart/Chart";
import Card from "../../../../components/card/Card";

import parseAverageAPRPlotData, { IAprPlotData } from "./math/aprMath";

// chart variables
const header = "Annual Percentage Rate Average";
const description = `APR (Annual Percentage Rate) is the annual rate of return,
                    expressed as a percentage, before factoring in compound interest.
                    APR only takes into account simple interest.`;
const plottingHours = 24; // amount of hours the chart is going to plot
const chartId = "dashboard_apr_chart";
const height = 350;
const width = undefined;
const aspect = undefined; //5.5 is best for big resolution

// This sections presets the main chart of the dashboard
const AprGraph = () => {
  const [plotData, setPlotData] = useState([] as IAprPlotData[]); // Chart parameters
  const [hoursAmountModifier, sethoursAmountModifierModifier] =
    useState<number>(24); // Hours modifier variable. Average margin for apr calculation
  const [pairAddressModifier, setpairAddressModifierModifier] =
    useState<string>(""); // Pair modifier variable. Which pair is the chart showing

  // At first render start the new metrics reader
  useEffect(() => {
    //console.log("improve multirender");
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
    }, 1000 * 60 * 10);
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
      const pairData: IPair = await getPairDataByDateRange(
        pairAddressModifier,
        fromDate,
        toDate
      );

      // Set plot Line name and get the metrics
      const plotLineName: string = ` ${hoursAmountModifier}hs APR moving average`;
      const data: IAprPlotData[] = parseAverageAPRPlotData(
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
  const modifiers: IModifier[] = [
    {
      // Pair address selector
      id: "pairSelector",
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
      id: "timeFrameSelector",
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
  ];

  // Present chart inside a card
  return (
    <Card style={{ padding: "0px", marginLeft: "0px" }} key={"apr_ma_chart"}>
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
};

export default AprGraph;
