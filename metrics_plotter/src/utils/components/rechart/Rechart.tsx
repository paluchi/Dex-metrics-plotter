import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";


// A point in the chart (propName as line name, it´s value a number, name porperty the name of the x axis point)
// (BUGFIX) propName value must be a number. but a ts error exists if it is setted only as number
export interface IPoint {
  [propName: string]: string | number;
  name: string;
}

// Declare vertical display settings
interface IHDisplay {
  height: number;
  width?: number | string | undefined;
  aspect?: never | undefined;
}
// Declare horizontal display settings
interface IWDisplay {
  width: number;
  height?: number | string | undefined;
  aspect?: never | undefined;
}
// Declare vertical and horizontal display settings based on ratio
interface IAspectDisplay {
  width?: never | undefined;
  height?: never | undefined;
  aspect: number;
}

export type IDisplay =
  | IHDisplay
  | IWDisplay
  | IAspectDisplay
  | (IHDisplay & IWDisplay);

export const defaultDisplay: IDisplay = { height: 350, width: "100%" };

// Properties of rendered line
export interface ILineProps {
  type?:
    | "basis"
    | "basisClosed"
    | "basisOpen"
    | "linear"
    | "linearClosed"
    | "natural"
    | "monotoneX"
    | "monotoneY"
    | "monotone"
    | "step"
    | "stepBefore"
    | "stepAfter";
  strokeColor?: string;
  strokeWidth?: number;
  dot?: {
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    radius?: number;
  };
  activeDot?: {
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    radius?: number;
  };
  activeAnimation?: boolean;
}

// Declare that this chart render lines based on this properties
export interface ILines {
  type: "line";
  contentProps?: { [lineName: string]: ILineProps };
  data: IPoint[];
}

// This type declared all the chart plotting settings that can be. the must be separed by |
export type IContent = ILines;

// Declare the main chart object
export interface IRechart {
  content: IContent;
  id: string;
  display?: IDisplay;
  hideLegend?: boolean;
  hideToolTip?: boolean;
}

const Rechart: React.FC<IRechart> = ({
  content,
  id: chartId,
  display = defaultDisplay,
  hideLegend = false,
  hideToolTip = false,
}) => {

  // Parse line properties
  const lines: { [lineKey: string]: ILineProps | undefined } =
    getLineKeys(content);

  // Generate line renders based on above parsed lines
  const renderLines: JSX.Element[] = [];
  for (const key in lines) {
    const lineKey = `${chartId}_rechart_line_${key}`;
    renderLines.push(newLine({ id: lineKey, pointKey: key, ...lines[key] }));
  }

  return (
    <ResponsiveContainer {...display}>
      <LineChart
        data={content.data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 10,
        }}
      >
        {!hideLegend && (
          <Legend
            align="left"
            verticalAlign="top"
            height={50}
            iconType={"circle"}
            iconSize={10}
            wrapperStyle={{
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "11px",
              lineHeight: "13px",
            }}
          />
        )}
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis
          dataKey="name"
          tick={{
            fill: "#485465",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: 10,
          }}
          padding={{ left: 35, right: 35 }}
          tickLine={false}
        />
        <YAxis
          tick={{
            fill: "#485465",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: 10,
          }}
          axisLine={false}
          tickLine={false}
          tickMargin={0}
          width={35}
        />
        {!hideToolTip && (
          <Tooltip
            contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }}
            itemStyle={{ color: "#fff" }}
            cursor={false}
          />
        )}

        {renderLines.map((renderLine) => renderLine)}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Rechart;

// Lines parsing function
const getLineKeys = (content: ILines) => {
  const lines: { [lineKey: string]: ILineProps | undefined } = {};
  content.data.map(({ name, ...plotData }) => {
    const entries: string[] = Object.keys(plotData);
    entries.map((key: string) => {
      if (!lines[key]) {
        const lineProps: ILineProps | undefined =
          content.contentProps && content.contentProps[key];
        lines[key] = lineProps;
      }
    });
  });

  return lines;
};

interface INewLineProps extends ILineProps {
  pointKey: string;
  id: string;
}

// Function that returns the rendered line based on it´s properties
const newLine = ({
  pointKey,
  strokeColor,
  strokeWidth,
  dot,
  activeDot,
  activeAnimation,
  type,
  id,
}: INewLineProps) => {
  return (
    <Line
      dataKey={pointKey}
      type={type || "monotone"}
      stroke={strokeColor || "#2E71F0"}
      strokeWidth={strokeWidth || 1.5}
      dot={{
        fill: dot?.fillColor || "#FFFFFF",
        stroke: dot?.strokeColor || "#2E71F0",
        strokeWidth: dot?.strokeWidth || 0,
        r: dot?.radius || 0,
      }}
      activeDot={{
        fill: activeDot?.fillColor || "#FFFFFF",
        stroke: activeDot?.strokeColor || "#2E71F0",
        strokeWidth: activeDot?.strokeWidth || 0,
        r: activeDot?.radius || 0,
      }}
      isAnimationActive={activeAnimation || false}
      key={id}
    />
  );
};
