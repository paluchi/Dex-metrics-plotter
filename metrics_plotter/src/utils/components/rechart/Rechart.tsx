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

interface IPoint {
  [propName: string]: string | number;
  name: string;
}

export interface IRechart {
  data: IPoint[];
  id: string;
  height?: number;
  width?: number;
  aspect?: number;
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

const Rechart: React.FC<IRechart> = ({ data, id, lineType, ...display }) => {
  const lines = getLineKeys(data);

  return (
    <ResponsiveContainer
      height={display.height}
      width={display.width}
      aspect={display.aspect}
    >
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
        {lines.map((name: string, index: number) => {
          const key = `rechart_${id}_line_${name}_${index}`;
          return newLine({ name, type: lineType, key });
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

interface ILine {
  name: string;
  key: string;
  type: any;
}

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
