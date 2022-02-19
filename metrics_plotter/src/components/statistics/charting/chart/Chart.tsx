import React from "react";

import Rechart, {
  IRechart,
} from "../../../../utils/components/rechart/Rechart";

import "./styles/Chart.css";

export type { IPoint } from "../../../../utils/components/rechart/Rechart";

export interface IChart extends IRechart {}

// A chart presenter component. It uses rechart library to create the chart
const Chart: React.FC<IChart> = ({ id, data, ...chartVariables }) => {
  return (
    <div>
      <Rechart data={data || []} id={id} {...chartVariables} />
    </div>
  );
};

export default Chart;
