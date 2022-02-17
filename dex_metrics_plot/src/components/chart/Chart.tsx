import React, { createRef } from "react";

import Rechart, { IRechart } from "../../utils/components/rechart/Rechart";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import EmptyChart from "./components/body/empty";
import MultipleSelector, { IItem } from "../multipleSelector/MultipleSelector";

import "./styles/Chart.css";

export interface IModifier {
  header: string;
  items: IItem[];
  id: string;
}

interface IChart extends IRechart {
  header: string;
  description: string;
  modifiers?: IModifier[];
}

// A chart presenter component. It uses rechart library to create the chart
const Chart: React.FC<IChart> = ({
  header,
  id,
  description,
  data,
  modifiers,
  ...chartVariables
}) => {
  // This ref will be used in a very complex way
  // It will be forwarded to body so it can be used to take a body content snapshot as an image when the download button is pressed from the header selectors
  const ref = createRef<HTMLDivElement>();

  // Render body first so the ref is generated, then render the header and pass the ref. (using css the header in on top)
  // Then render chart modifiers and the header
  return (
    <div className="chart">
      <Body ref={ref}>
        {modifiers && <CreateModifiers modifiers={modifiers} id={id} />}
        {data.length ? (
          <Rechart data={data} id={id} {...chartVariables} />
        ) : (
          <EmptyChart />
        )}
      </Body>
      <Header
        header={header}
        description={description}
        id={id}
        chartRef={ref}
      />
    </div>
  );
};

export default Chart;

interface ICreateModifiers {
  modifiers: IModifier[];
  id: string;
}

// Modifiers are created through the fundamental multipleSelector.
// Modifiers pass a callback and a callback params so the multiple selector know what to do when a selector is pressed
const CreateModifiers: React.FC<ICreateModifiers> = ({ modifiers, id }) => {
  return (
    <div className="modifiersContainer">
      {modifiers.map((data: IModifier) => {
        return (
          <MultipleSelector {...data} key={`chart_${id}_modifier${data.id}`} />
        );
      })}
    </div>
  );
};
