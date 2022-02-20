import React from "react";

import getPairDataByDateRange, {
  IPair,
} from "../../queries/getPairDataByDateRange";
import parseAverageAPRPlotData, { IAprPlotData } from "./math/aprMath";
import ChartFacade, {
  IModifier,
} from "../../components/statistics/charting/facade/Facade";

// chart variables
const header: string = "Annual Percentage Rate Average";
const description: string = `APR (Annual Percentage Rate) is the annual rate of return,
                    expressed as a percentage, before factoring in compound interest.
                    APR only takes into account simple interest.`;
const plottingHours: number = 24; // amount of hours the chart is going to plot
const lastHoursSkip: number = 0; // Last hour is current on process so if it needs to be skipped use this
const updateInterval: number = 60 * 0.05; // every ho w many SECONDS it is going to update
const chartId: string = "dashboard_apr_chart";
const height = 350; //chart height
const width = undefined; //chart width
const aspect = undefined; //chart ascpect ratio (5.5 is best for big resolution)

interface IMyModifiers {
  apr_MA_pair: string;
  apr_MA_time_frame: number;
}

const getTimeFrame = (
  marginHours: number
): { fromDate: Date; toDate: Date } => {
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setHours(
    fromDate.getHours() - plottingHours - lastHoursSkip - marginHours + 1
  );

  return { fromDate, toDate };
};

// This sections presets the main chart of the dashboard
const AprMA: React.FC = () => {
  const loadPlotData = async ({
    apr_MA_pair,
    apr_MA_time_frame,
  }: IMyModifiers) => {
    // If some of the modifiers is not selected don't plot
    if (!apr_MA_pair || !apr_MA_time_frame) return [];

    // Create time range based on hours modifier
    const { fromDate, toDate } = getTimeFrame(apr_MA_time_frame);
    // Create time range based on hours modifier
    try {
      const pairData: IPair = await getPairDataByDateRange(
        apr_MA_pair,
        fromDate,
        toDate
      );

      // Set plot Line name and get the metrics
      const plotLineName: string = ` ${apr_MA_time_frame}hs APR moving average`;
      const data: IAprPlotData[] = parseAverageAPRPlotData(
        plotLineName,
        plottingHours,
        apr_MA_time_frame,
        pairData.snapshots
      );

      // At last set the parsed data to post. render
      return data;
    } catch (error) {
      // Set sort of error screen here
    }
  };

  // Present chart inside a card
  return (
    <ChartFacade
      header={header}
      description={description}
      modifiers={modifiers}
      id={chartId}
      display={{ height: height, width: width, aspect: aspect }}
      metricsLoader={loadPlotData}
      updateInterval={updateInterval}
    />
  );
};

export default AprMA;

// Chart modifiers
const modifiers: IModifier[] = [
  {
    // Pair address selector
    id: "apr_MA_pair",
    header: "Pair:",
    items: [
      {
        content: "USDC/WETH",
        value: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
        active: true,
      },
      {
        content: "WETH/RKFL",
        value: "0xbc9d21652cca70f54351e3fb982c6b5dbe992a22",
      },
    ],
  },
  {
    // Average time frame selector
    id: "apr_MA_time_frame",
    header: "Time frame:",
    items: [
      {
        content: "1h",
        value: 1,
      },
      {
        content: "4h",
        value: 4,
      },
      {
        content: "8h",
        value: 8,
      },
      {
        content: "12h",
        value: 12,
      },
      {
        content: "24h",
        value: 24,
        active: true,
      },
    ],
  },
];
