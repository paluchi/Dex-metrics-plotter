import Section from "../../components/section/Section";

import AprGraph from "./components/aprGraph/AprGraph";
import GlobalMetrics from "./components/globalMetrics/GlobalMetrics";
import AnnualizedReturns from "./components/annualizedReturns/AnnualizedReturns";

import "./styles/Dashboard.css";

function Dashboard() {
  const sections = [
    { Component: GlobalMetrics, header: "Global Metrics" },
    { Component: AnnualizedReturns, header: "Annualized Returns" },
    { Component: AprGraph, header: "Annual Percentage Rate (APR)" },
  ];

  return (
    <>
      {sections.map(({ header, Component }) => {
        return (
          <Section header={header} key={`dashboard_${header}`}>
            <Component />
          </Section>
        );
      })}
    </>
  );
}

export default Dashboard;
