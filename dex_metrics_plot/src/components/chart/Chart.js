import React, { createRef } from "react";

import Rechart from "../../utils/components/rechart/Rechart";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import MultipleSelector from "../multipleSelector/MultipleSelector";

import "./styles/Chart.css";

// A chart presenter component. It uses rechart library to create the chart
function Chart({
  header,
  id,
  description,
  data,
  modifiers,
  ...chartVariables
}) {
  // This ref will be used in a very complex way
  // It will be forwarded to body so it can be used to take a body content snapshot as an image when the download button is pressed from the header selectors
  const ref = createRef(null);

  // Render body first so the ref is generated, then render the header and pass the ref. (using css the header in on top)
  // Then render chart modifiers and the header
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

// Modifiers are created through the fundamental multipleSelector.
// Modifiers pass a callback and a callback params so the multiple selector know what to do when a selector is pressed 
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
