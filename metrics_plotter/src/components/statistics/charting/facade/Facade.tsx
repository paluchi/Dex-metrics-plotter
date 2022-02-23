import React, { createRef, useState, useEffect, useRef } from "react";
import MultipleSelector, {
  IMultipleSelector,
} from "../../../multipleSelector/MultipleSelector";
import Card from "../../../card/Card";

import useModifiers from "./components/hooks/useModifiers";
import Body from "./components/body/Body";
import Chart, {
  IChart,
  IChartDisplay,
  IChartContent,
  defaultChartDisplay,
} from "../chart/Chart";
import Header from "./components/header/Header";

import "./styles/Facade.css";

// Common types used to create charts
export type {
  IChartDisplay,
  IChartContent,
  IChartPoint,
  IChartLineProps,
} from "../chart/Chart";

interface IModifierItem {
  content: any;
  value: any;
  active?: boolean;
}

// Set of buttons used to custom chart setup
export interface IModifier {
  items: IModifierItem[];
  header?: string;
  id: string;
  style?: object;
}

interface IFacadeBasics extends Omit<IChart, "content"> {
  header?: string;
  description?: string;
}

// For static charts just require data
export interface IFacadeStatic extends IFacadeBasics {
  content: IChartContent;
  contentLoader?: never;
  updateInterval?: never;
  modifiers?: never;
}

export type IChartLoaderFunction = (modifiers: {
  [modName: string]: any;
}) => Promise<IChartContent | undefined>;

// For dynamic charts set a loader
export interface IFacadeLoader extends IFacadeBasics {
  contentLoader: IChartLoaderFunction;
  updateInterval?: number;
  modifiers?: IModifier[];
  content?: never;
}

export type IFacade = IFacadeLoader | IFacadeStatic;

// This function gather all needed parameters to generate complex chart interactions
const ChartFacade: React.FC<IFacade> = ({
  header,
  description,
  modifiers,
  id,
  updateInterval = 60 * 5,
  content: staticContent,
  display = defaultChartDisplay,
  contentLoader,
  hideLegend,
  hideToolTip,
  ...props
}) => {
  // Parsed metrics are saved here
  const initialContent: IChartContent = {
    data: [],
    contentProps: {},
    type: "line",
  };
  const [content, setContent] = useState<IChartContent>(initialContent);
  // Loading interval is saved here
  const loadInterval = useRef<NodeJS.Timer | undefined>();
  // This custom hook adds all the logic needed to use modifiers (must move multipleSelector parsing logic from here)
  const [reducedModifiers, multipleSelectors] = useModifiers(modifiers || []);

  // At first render start the new metrics reader
  useEffect(() => {
    loadContent();
  }, []);

  // Clears setInterval when derendered
  useEffect(
    () => () => loadInterval.current && clearInterval(loadInterval.current),
    []
  );

  // If some modifier is updated the render again with updated data
  useEffect(() => {
    const loadingTimeout = setTimeout(
      async () => setContent(initialContent),
      50
    ); // If loading time takes too long then set the loading screen as placeholder
    contentLoader && interval();
    loadContent();
    clearInterval(loadingTimeout);
  }, [reducedModifiers]);

  const interval = () => {
    loadInterval.current && clearInterval(loadInterval.current);
    loadInterval.current = setInterval(() => {
      loadContent();
    }, 1000 * updateInterval);
  };

  // This function loads and sets the new metrics
  const loadContent = async () => {
    const newContent = staticContent
      ? staticContent
      : contentLoader && (await contentLoader(reducedModifiers));

    //If metrics does not exist then set it to empty array (so loading anim. starts)
    setContent(newContent || initialContent);
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
            content={content}
            id={id}
            display={processChartDisplay(display)}
            hideLegend={hideLegend}
            hideToolTip={hideToolTip}
          />
        </Body>
        <Header
          header={header}
          description={description}
          id={id}
          chartRef={ref}
          isLoading={!content.data.length && true}
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

// This function parses the display for the card that contains the header, options, modifiers and chart
const processCardDisplay = (display: IChartDisplay) => {
  const processedDisplay: ICardDisplay = {} as ICardDisplay;

  processedDisplay.width = display.width ? display.width : "100%";

  return processedDisplay;
};

// This function parses the display for chart
const processChartDisplay = (display: IChartDisplay) => {
  const processedDisplay: IChartDisplay = {} as IChartDisplay;

  processedDisplay.width = "100%";
  processedDisplay.height = display.height;
  processedDisplay.aspect = display.aspect;

  return processedDisplay;
};
