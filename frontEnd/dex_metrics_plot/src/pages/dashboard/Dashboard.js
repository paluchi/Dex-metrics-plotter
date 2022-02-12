import Section from "../../components/section/Section";

import AprGraph from "./components/aprGraph/AprGraph";

import "./styles/Dashboard.css";

function Dashboard() {
  const sections = [
    { Component: AprGraph, header: "Annual Percentage Rate (APR)" },
  ];

  return (
    <>
      {sections.map(({ header, Component }) => {
        return (
          <Section header={header}>
            <Component />
          </Section>
        );
      })}
    </>
  );
}

export default Dashboard;
