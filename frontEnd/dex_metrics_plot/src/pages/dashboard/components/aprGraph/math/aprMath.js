export const getAverageAPR = (snapshots) => {
  const ssAPR = snapshots.map(({ liquidity_usd, fees_usd }) => {
    return liquidity_usd / fees_usd;
  });

  const totalAverage = ssAPR.reduce((a, b) => a + b, 0) / ssAPR.length;

  return totalAverage;
};

export const parsePlotData = (plotLineName, averageAPR) => {
  const data = [];
  // Fancy way of create an array of monthly revenue.
  // We could use ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"] too
  [...Array(12).keys()].map((value, index) => {
    const monthName = new Date(2022, index, 1).toLocaleString(
      "en-us", // Use 'default' to get in english, 'fr' for france, or search more by "ECMAScript Internationalization API"
      { month: "short" } // 'long' full name of the month, 'short'  short name, 'narrow' minimal version
    );
    const plotPoint = { name: monthName };
    plotPoint[plotLineName] = averageAPR;
    data.push(plotPoint);
  });

  return data;
};
