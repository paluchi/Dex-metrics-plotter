export const parseHourlyAPRPlotData = (plotLineName, snapshots) => {
  const data = [];

  snapshots.map(({ liquidity_usd, fees_usd }, index) => {
    const plotPoint = { name: `${index + 1}hs` };

    const value = getAPR(liquidity_usd, fees_usd);

    plotPoint[plotLineName] = value;

    data.push(plotPoint);
  });

  return data;
};

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
