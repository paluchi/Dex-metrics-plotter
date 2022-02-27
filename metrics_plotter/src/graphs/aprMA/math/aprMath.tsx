import { ISnapshot } from "../../../queries/getPairDataByDateRange";

export interface IAprPlotData {
  [propName: string]: string | number;
  name: string;
}

export interface IParseAverageAprPlotData {
  (
    plotLineName: string,
    hoursAverage: number,
    snapshots: ISnapshot[]
  ): IAprPlotData[];
}

const parseAverageAPRPlotData: IParseAverageAprPlotData = (
  plotLineName,
  hoursAverage,
  snapshots
): IAprPlotData[] => {
  const data: IAprPlotData[] = [];

  // If empty return empty array
  if (!snapshots.length) return [];

  // This variable stores the snapshots before the current to porteriorly calculate an average
  let backgroundSnapshots: ISnapshot[] = snapshots.splice(0, hoursAverage - 1);

  snapshots.map((snapshot) => {
    // Get average of prev. snapshot adding the current
    const averageAPR: number = getAverageAPR(
      backgroundSnapshots.concat([snapshot])
    );

    // Create the x axis name and add average as value
    const pointDate: Date = new Date(snapshot.date);
    const dayName: string = pointDate.toLocaleString(
      "en-us", // Use 'default' to get in english, 'fr' for france, or search more by "ECMAScript Internationalization API"
      { weekday: "narrow" } // 'long' full name of the month, 'short'  short name, 'narrow' minimal version
    );
    const plotPoint: IAprPlotData = {
      name: `${dayName} ${pointDate.getHours()}hs`,
    }
    plotPoint[plotLineName] = averageAPR;

    data.push(plotPoint);

    // Add current to background, remove the oldest from background and continue
    backgroundSnapshots = backgroundSnapshots.concat(snapshot);
    backgroundSnapshots.shift();
  });

  return data;
};

// This function is purely mathematical and calculates the apr of a snapshot
const getAPR = (liquidity: number, fees: number): number => {
  const hourlyFeesPerDollar: number = fees / liquidity;
  const daylyFeesPerDollar: number = hourlyFeesPerDollar * 24;
  const YearlyFeesPerDollar: number = daylyFeesPerDollar * 365;
  const apr: number = YearlyFeesPerDollar * 100;

  return apr;
};

// This function calculates the average of a serie of snapshots
const getAverageAPR = (snapshots: ISnapshot[]): number => {
  const ssAPR: number[] = snapshots.map(
    ({ liquidity_usd, fees_usd }: Omit<ISnapshot, "volume_usd" | "date">) => {
      return getAPR(liquidity_usd, fees_usd);
    }
  );

  const totalAverage = ssAPR.reduce((a, b) => a + b, 0) / ssAPR.length;

  return totalAverage;
};

export default parseAverageAPRPlotData;
