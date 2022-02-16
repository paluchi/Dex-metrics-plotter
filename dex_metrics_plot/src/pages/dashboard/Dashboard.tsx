import Section, { ISection } from "../../components/section/Section";

import AprGraph from "./components/aprGraph/AprGraph";
import GlobalMetrics from "./components/globalMetrics/GlobalMetrics";
import AnnualizedReturns from "./components/annualizedReturns/AnnualizedReturns";

import "./styles/Dashboard.css";

// This component presents the dashboard sections (sets of cards, a chart, and could be more)
const Dashboard: React.FC = (): JSX.Element => {
  // The sections and their header are declared in sections array
  const sections: ISection[] = [
    { children: <GlobalMetrics />, header: "Global Metrics" },
    { children: <AnnualizedReturns />, header: "Annualized Returns" },
    { children: <AprGraph />, header: "Annual Percentage Rate (APR)" },
  ];

  return (
    <>
      {sections.map(({ header, children }: ISection) => {
        return (
          <Section header={header} key={`dashboard_${header}`}>
            {children}
          </Section>
        );
      })}
    </>
  );
};

export default Dashboard;
