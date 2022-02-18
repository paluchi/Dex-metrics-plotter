import React, { createRef } from "react";

import MultipleSelector, {
  IMultipleSelector,
} from "../../../multipleSelector/MultipleSelector";
import Card from "../../../card/Card";

import Body from "./components/body/Body";
import Chart, { IPoint, IChart } from "../chart/Chart";
import Header from "./components/header/Header";

import "./styles/Facade.css";

export type { IMultipleSelector as IModifier } from "../../../multipleSelector/MultipleSelector";

export interface IFacade extends IChart {
  header: string;
  description: string;
  data: IPoint[];
  modifiers?: IMultipleSelector[];
}

const ChartFacade: React.FC<IFacade> = ({
  header,
  description,
  modifiers,
  id,
  data,
  display,
  ...props
}) => {
  // This ref will be used in a very complex way
  // It will be forwarded to body so it can be used to take a body content snapshot as an image when the download button is pressed from the header selectors
  const ref = createRef<HTMLDivElement>();

  // Render body first so the ref is generated, then render the header and pass the ref. (using css the header in on top)
  // Then render chart modifiers and the header
  return (
    <Card style={{ padding: "0px", marginLeft: "0px" }}>
      <div className="chartFacade" {...props}>
        <Body ref={ref}>
          {modifiers &&
            modifiers.map((props: IMultipleSelector, index) => {
              return (
                <MultipleSelector
                  key={`${id}_multipleSelector_${index}`}
                  {...props}
                />
              );
            })}
          <Chart data={data} id={id} display={display} />
        </Body>
        <Header
          header={header}
          description={description}
          id={id}
          chartRef={ref}
        />
      </div>
    </Card>
  );
};

export default ChartFacade;