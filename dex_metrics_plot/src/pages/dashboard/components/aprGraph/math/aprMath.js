export const parseAverageAPRPlotData = (
  plotLineName,
  plottingHours,
  hoursAverage,
  snapshots
) => {
  const data = [];
  snapshots.reverse();

  if (!snapshots.length) return [];

  let backgroundSnapshots = snapshots.splice(0, hoursAverage - 1);

  for (let i = 1; i < plottingHours; i++) {
    const averageAPR = getAverageAPR(
      backgroundSnapshots.concat([snapshots[i]])
    );
    const plotPoint = { name: `${i + 1}hs` };

    plotPoint[plotLineName] = averageAPR;

    data.push(plotPoint);

    backgroundSnapshots = backgroundSnapshots.concat(snapshots[i]);
    backgroundSnapshots.shift();
  }
  return data;
};

const getAPR = (liquidity, fees) => {
  return (fees / liquidity) * 365;
};

export const getAverageAPR = (snapshots) => {
  const ssAPR = snapshots.map(({ liquidity_usd, fees_usd }) => {
    return getAPR(liquidity_usd, fees_usd);
  });

  const totalAverage = ssAPR.reduce((a, b) => a + b, 0) / ssAPR.length;

  return totalAverage;
};
// ----------------------------------------------------------------------------------------------------------------
// Not what the test is asking for but an interest piece of code
export const parseIncreasingRevenuePlotData = (
  plotLineName,
  initialAmount,
  averageAPR
) => {
  const data = [];

  // Fancy way of create an array of monthly revenue.
  // We could use ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"] too

  [...Array(12).keys()].map((value, monthNumber) => {
    const monthName = new Date(2022, monthNumber, 1).toLocaleString(
      "en-us", // Use 'default' to get in english, 'fr' for france, or search more by "ECMAScript Internationalization API"
      { month: "short" } // 'long' full name of the month, 'short'  short name, 'narrow' minimal version
    );
    const plotPoint = { name: monthName };

    const revenuedAmount =
      initialAmount + initialAmount * ((averageAPR / 12) * monthNumber);
    plotPoint[plotLineName] = revenuedAmount;

    data.push(plotPoint);
  });

  return data;
};
