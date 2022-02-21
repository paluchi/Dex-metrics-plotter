import React, { createRef, useState, useEffect, useRef } from "react";
import MultipleSelector, {
  IMultipleSelector,
} from "../../../multipleSelector/MultipleSelector";
import Card from "../../../card/Card";

import useModifiers from "./components/hooks/useModifiers";
import Body from "./components/body/Body";
import Chart, { IChartPoint, IChart, IChartDisplay } from "../chart/Chart";
import Header from "./components/header/Header";

import "./styles/Facade.css";

export type { IChartDisplay } from "../chart/Chart";

interface IModifierItem {
  content: any;
  value: any;
  active?: boolean;
}

export interface IModifier {
  items: IModifierItem[];
  header?: string;
  id: string;
  style?: object;
}

interface IFacadeBasics extends Omit<IChart, "data"> {
  header: string;
  description: string;
}
interface IFacadeStatic extends IFacadeBasics {
  data: IChartPoint[];
  metricsLoader?: never;
  updateInterval?: never;
  modifiers?: never;
}
interface IFacadeLoader extends IFacadeBasics {
  metricsLoader: Function;
  updateInterval?: number;
  modifiers?: IModifier[];
  data?: never;
}

export type IFacade = IFacadeLoader | IFacadeStatic;

const ChartFacade: React.FC<IFacade> = ({
  header,
  description,
  modifiers,
  id,
  updateInterval,
  data,
  display,
  metricsLoader,
  ...props
}) => {
  const [metrics, setMetrics] = useState<IChartPoint[]>([] as IChartPoint[]);
  const loadInterval = useRef<NodeJS.Timer | undefined>();

  const [reducedModifiers, multipleSelectors] = useModifiers(modifiers || []);

  // At first render start the new metrics reader
  useEffect(() => {
    loadMetrics();
  }, []);

  // Clears setInterval when derendered
  useEffect(
    () => () => loadInterval.current && clearInterval(loadInterval.current),
    []
  );

  // If some modifier is updated the render again with updated data
  useEffect(() => {
    metricsLoader && interval();
    loadMetrics();
  }, [reducedModifiers]);

  const interval = () => {
    loadInterval.current && clearInterval(loadInterval.current);
    loadInterval.current = setInterval(() => {
      loadMetrics();
    }, 1000 * (updateInterval || 60 * 5));
  };

  const loadMetrics = async () => {
    const newMetrics = data
      ? data
      : metricsLoader && (await metricsLoader(reducedModifiers));

    //If metrics exist but is empty then set it to undefined (so loading anim. starts)
    setMetrics(newMetrics ? newMetrics : []);
  };

  // This ref will be used in a very complex way
  // It will be forwarded to body so it can be used to take a body content snapshot as an image when the download button is pressed from the header selectors
  const ref = createRef<HTMLDivElement>();

  // Render body first so the ref is generated, then render the header and pass the ref. (using css the header in on top)
  // Then render chart modifiers and the header

  return (
    <Card
      style={{
        padding: "0px",
        marginLeft: "0px",
        ...processCardDisplay(display),
      }}
    >
      <div className="chartFacade" {...props}>
        <Body ref={ref}>
          {modifiers &&
            multipleSelectors.map((props: IMultipleSelector, index) => {
              return (
                <MultipleSelector
                  key={`${id}_multipleSelector_${index}`}
                  {...props}
                />
              );
            })}
          <Chart
            data={metrics}
            id={id}
            display={processChartDisplay(display)}
          />
        </Body>
        <Header
          header={header}
          description={description}
          id={id}
          chartRef={ref}
          isLoading={!metrics.length && true}
        />
      </div>
    </Card>
  );
};

export default ChartFacade;

interface ICardDisplay {
  width: number | undefined | string;
  height: number | undefined | string;
}

const processCardDisplay = (display: IChartDisplay) => {
  const processedDisplay: ICardDisplay = {} as ICardDisplay;

  processedDisplay.width = display.width ? display.width : "100%";

  return processedDisplay;
};
const processChartDisplay = (display: IChartDisplay) => {
  const processedDisplay: IChartDisplay = {} as IChartDisplay;

  processedDisplay.width = "100%";
  processedDisplay.height = display.height;
  processedDisplay.aspect = display.aspect;

  return processedDisplay;
};
