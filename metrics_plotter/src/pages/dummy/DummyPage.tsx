import React from "react";

import StatsSet, {
  IStat,
} from "../../components/statistics/stats/statsSet/StatsSet";
import ChartFacade from "../../components/statistics/charting/facade/Facade";
import Section from "../../components/section/Section";

// This sections presents a set of cards with dummy data. sections shoud not be declared here, but in a sub folder called sections
const DummyPage: React.FC = (): JSX.Element => {
  return (
    <>
      <Section header={"Dummy staats Loaders with overall loading"}>
        <StatsSet stats={[]} id={"dashboard_Discover"} isLoading={true} />
      </Section>
      <Section header={"Dummy staats Loaders with specific loading"}>
        <StatsSet stats={stats} id={"dashboard_Discover"} />
      </Section>
      <Section header={"Dummy Chart loader"}>
        <ChartFacade
          id={"dashboard_Discover"}
          header={"Dummy chart"}
          display={{ height: 350 }}
          description={"This is a dummy chart with 100% width and 350px height"}
          data={[]}
        />
      </Section>
      <Section header={"Tipple Dummy chart with variable width"}>
        <div
          style={{ display: "flex", flexDirection: "row", overflow: "auto" }}
        >
          <ChartFacade
            id={"dashboard_Discover"}
            header={"Dummy chart 1"}
            display={{ height: 350, width: "25%" }}
            description={"This is another dummy chart. with 350x25% display!!"}
            data={[]}
          />
          <ChartFacade
            id={"dashboard_Discover"}
            header={"Dummy chart 2"}
            display={{ height: 350, width: "50%" }}
            description={"This is another dummy chart. with 350x50% display!!"}
            data={[]}
          />
          <ChartFacade
            id={"dashboard_Discover"}
            header={"Dummy chart 3"}
            display={{ height: 350, width: "25%" }}
            description={"This is another dummy chart. with 350x25% display!!"}
            data={[]}
          />
        </div>
      </Section>
      <Section header={"Dummy Chart loader with fixed width"}>
        <ChartFacade
          id={"dashboard_Discover"}
          header={"Dummy chart"}
          display={{ height: 350, width: 600 }}
          description={"This is a dummy chart with 100% width and 350px height"}
          data={[]}
        />
      </Section>
      <Section header={"Tipple Dummy chart with fixed width"}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <ChartFacade
            id={"dashboard_Discover"}
            header={"Dummy chart 1"}
            display={{ height: 200, width: 300 }}
            description={"This is another dummy chart. with 200x300 display!!"}
            data={[]}
          />
          <ChartFacade
            id={"dashboard_Discover"}
            header={"Dummy chart 2"}
            display={{ height: 200, width: 500 }}
            description={"This is another dummy chart. with 200x400 display!!"}
            data={[]}
          />
          <ChartFacade
            id={"dashboard_Discover"}
            header={"Dummy chart 3"}
            display={{ height: 200, width: 300 }}
            description={"This is another dummy chart. with 200x300 display!!"}
            data={[]}
          />
        </div>
      </Section>
    </>
  );
};

const stats: IStat[] = [
  {
    header: "Dummy stat 1",
    isLoading: true,
  },
  {
    header: "Dummy stat 2",
    value: "+$4,482.29",
    difference: -0.18,
  },
  {
    header: "Dummy stat 3",
    value: "+$1,360,225",
    difference: 115.93,
  },
  {
    header: "Dummy stat 4",
    value: "23%",
    isLoading: true,
  },
  {
    header: "TDummy stat 5",
    value: "$21,000,000",
  },
  {
    header: "Dummy stat 6",
    value: "$2,533,557.32",
    isLoading: true,
  },
];

export default DummyPage;
