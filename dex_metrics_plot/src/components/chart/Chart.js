import React, { createRef } from "react";

import Rechart from "../../utils/components/rechart/Rechart";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import MultipleSelector from "../multipleSelector/MultipleSelector";

import "./styles/Chart.css";

function Chart({
  header,
  id,
  description,
  data,
  modifiers,
  ...chartVariables
}) {
  const ref = createRef(null);

  return (
    <div className="chart">
      <Body ref={ref}>
        {modifiers && <CreateModifiers modifiers={modifiers} parentId={id} />}
        <Rechart data={data} parentId={id} {...chartVariables} />
      </Body>
      {header && (
        <Header
          header={header}
          description={description}
          chartId={id}
          chartRef={ref}
        />
      )}
    </div>
  );
}

export default Chart;

function CreateModifiers({ modifiers, chartId }) {
  return (
    <div className="modifiersContainer">
      {modifiers.map((data, index) => {
        return (
          <MultipleSelector
            {...data}
            key={`chart_${chartId}_modifier${
              data.id || data.header || "default"
            }_${index}`}
          />
        );
      })}
    </div>
  );
}
