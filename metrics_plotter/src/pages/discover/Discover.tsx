import React from "react";
import StatsSet from "../../components/statistics/stats/statsSet/StatsSet";

import Section from "../../components/section/Section";

// This sections presets a set of cards with (currenly) dummy data
const Discover: React.FC = (): JSX.Element => {
  return (
    <>
      <Section header={"Dummy Loaders"}>
        <StatsSet stats={[]} id={"dashboard_Discover"} isLoading={true} />
      </Section>
      <Section header={"Dummy Loaders 2"}>
        <StatsSet stats={[]} id={"dashboard_Discover"} isLoading={true} />
      </Section>
    </>
  );
};

export default Discover;
