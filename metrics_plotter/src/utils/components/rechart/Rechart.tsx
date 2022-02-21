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

export interface IPoint {
  [propName: string]: string | number;
  name: string;
}

interface IHDisplay {
  height: number;
  width?: number | string | undefined;
  aspect?: never | undefined;
}
interface IWDisplay {
  width: number;
  height?: number | string | undefined;
  aspect?: never | undefined;
}

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

export interface IRechart {
  data: IPoint[];
  id: string;
  display: IDisplay;
  lineType?:
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
    | "stepAfter"
    | Function;
}

interface ILine {
  name: string;
  key: string;
  type: any;
}

const Rechart: React.FC<IRechart> = ({ data, id, lineType, display }) => {
  const lines = getLineKeys(data);

  return (
    <ResponsiveContainer {...display}>
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 10,
        }}
      >
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
        <Tooltip
          contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }}
          itemStyle={{ color: "#fff" }}
          cursor={false}
        />
        {lines.map((name: string) => {
          const lineKey = `${id}_rechart_line_${name}`;
          return newLine({ name, type: lineType, key: lineKey });
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Rechart;

const getLineKeys = (data: IPoint[]) => {
  const lines: string[] = [];
  data.map(({ name, ...plotData }) => {
    const entries: string[] = Object.keys(plotData);
    entries.map((key: string) => {
      !lines.includes(key) && lines.push(key);
    });
  });

  return lines;
};

const newLine = ({ name, type, key }: ILine) => {
  return (
    <Line
      dataKey={name}
      type={type || "monotone"}
      stroke="#2E71F0"
      strokeWidth="1.5"
      dot={{
        fill: "#FFFFFF",
        stroke: "#2E71F0",
        strokeWidth: 1.5,
        r: 2.5,
      }}
      activeDot={{
        fill: "#2e4355",
        stroke: "#2E71F0",
        strokeWidth: 5,
        r: 5,
      }}
      isAnimationActive={false}
      key={key}
    />
  );
};
