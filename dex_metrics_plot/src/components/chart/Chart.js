import Rechart from "../../utils/components/rechart/Rechart";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import MultipleSelector from "../multipleSelector/MultipleSelector";

import "./styles/Chart.css";

function Chart({ header, description, data, modifiers }) {
  return (
    <div className="chart">
      {header && <Header header={header} description={description} />}
      <Body>
        {modifiers && <CreateModifiers modifiers={modifiers} />}
        <Rechart data={data} />
      </Body>
    </div>
  );
}

export default Chart;

function CreateModifiers({ modifiers }) {
  return (
    <div className="modifiersContainer">
      {modifiers.map((data, index) => {
        return (
          <MultipleSelector
            {...data}
            key={`chart_modifier${data.id || data.header || "default"}_index`}
          />
        );
      })}
    </div>
  );
}
