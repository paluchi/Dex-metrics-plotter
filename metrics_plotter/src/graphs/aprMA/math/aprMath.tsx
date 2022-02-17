import { ISnapshot } from "../../../queries/getPairDataByDateRange";

export interface IAprPlotData {
  [propName: string]: string | number;
  name: string;
}

export interface IParseAverageAprPlotData {
  (
    plotLineName: string,
    plottingHours: number,
    hoursAverage: number,
    snapshots: ISnapshot[]
  ): IAprPlotData[];
}

const parseAverageAPRPlotData: IParseAverageAprPlotData = (
  plotLineName,
  plottingHours,
  hoursAverage,
  snapshots
): IAprPlotData[] => {
  const data: IAprPlotData[] = [];

  if (!snapshots.length) return [];

  let backgroundSnapshots: ISnapshot[] = snapshots.splice(0, hoursAverage - 1);

  for (let i = plottingHours; i > 0; i--) {
    const averageAPR: number = getAverageAPR(
      backgroundSnapshots.concat([snapshots[i]])
    );

    const pointDate: Date = new Date();
    pointDate.setHours(pointDate.getHours() - i - 1);
    const dayName: string = pointDate.toLocaleString(
      "en-us", // Use 'default' to get in english, 'fr' for france, or search more by "ECMAScript Internationalization API"
      { weekday: "narrow" } // 'long' full name of the month, 'short'  short name, 'narrow' minimal version
    );

    const plotPoint: IAprPlotData = {
      name: `${dayName} ${pointDate.getHours()}hs`,
    };

    plotPoint[plotLineName] = averageAPR;

    data.push(plotPoint);

    backgroundSnapshots = backgroundSnapshots.concat(snapshots[i]);
    backgroundSnapshots.shift();
  }
  return data;
};

const getAPR = (liquidity: number, fees: number): number => {
  const hourlyFeesPerDollar: number = fees / liquidity;
  const daylyFeesPerDollar: number = hourlyFeesPerDollar * 24;
  const YearlyFeesPerDollar: number = daylyFeesPerDollar * 365;
  const apr: number = YearlyFeesPerDollar * 100;
  console.log("getAPR ~ hourlyFeesPerDollar", hourlyFeesPerDollar);
  console.log("getAPR ~ daylyFeesPerDollar", daylyFeesPerDollar);
  console.log("getAPR ~ YearlyFeesPerDollar", YearlyFeesPerDollar);
  console.log("getAPR ~ apr", apr); 

  return apr;
};

export const getAverageAPR = (snapshots: ISnapshot[]): number => {
  const ssAPR: number[] = snapshots.map(
    ({ liquidity_usd, fees_usd }: Omit<ISnapshot, "volume_usd" | "date">) => {
      return getAPR(liquidity_usd, fees_usd);
    }
  );

  const totalAverage = ssAPR.reduce((a, b) => a + b, 0) / ssAPR.length;

  return totalAverage;
};

export default parseAverageAPRPlotData;
