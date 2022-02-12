import Rechart from "../../utils/components/rechart/Rechart";
import Header from "./components/header/Header";
import Body from "./components/body/Body";

import "./styles/Chart.css";

function Chart({ header, description, data }) {
  return (
    <div className="chart">
      <Header header={header} description={description} />
      <Body>
        <Rechart data={data} />
      </Body>
    </div>
  );
}

export default Chart;
