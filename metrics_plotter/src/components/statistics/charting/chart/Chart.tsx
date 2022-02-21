import React from "react";

import Rechart, {
  IRechart,
  IDisplay as IChartDisplay,
} from "../../../../utils/components/rechart/Rechart";

import "./styles/Chart.css";

export type {
  IPoint as IChartPoint,
  IDisplay as IChartDisplay,
} from "../../../../utils/components/rechart/Rechart";

export interface IChart extends IRechart {}

// A chart presenter component. It uses rechart library to create the chart
const Chart: React.FC<IChart> = ({ id, data, ...chartVariables }) => {
  return (
    <>
      {data && !data.length ? (
        <LoadingChart {...chartVariables.display} />
      ) : (
        <Rechart data={data || []} id={id} {...chartVariables} />
      )}
    </>
  );
};

export default Chart;

// This component renders a chart placeholder
export const LoadingChart: React.FC<IChartDisplay> = ({
  width,
  height,
  aspect,
}) => {
  const processesHeight = height || (aspect && `${100 / aspect}%`) || 350;

  return (
    <div
      className="loadingChartContainer"
      style={{ width: width, height: processesHeight }}
    >
      <div className="loadingChartWrapper">
        <div className="loadingchartBar genericIsLoading" />
        <div className="loadingchartBar genericIsLoading" />
        <div className="loadingchartBar genericIsLoading" />
        <div className="loadingchartBar genericIsLoading" />
        <div className="loadingchartBar genericIsLoading" />
        <div className="loadingchartBar genericIsLoading" />
      </div>
      <span className="genericIsLoading">
        Looks like your chart is loading!
      </span>
    </div>
  );
};
