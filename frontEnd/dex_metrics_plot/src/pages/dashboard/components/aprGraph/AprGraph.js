import { useEffect } from "react";
import axios from "axios";

import Chart from "../../../../components/chart/Chart";

function AprGraph() {
  const data = [
    {
      name: "January",
      Iphone: 4000,
    },
    {
      name: "March",
      Iphone: 1000,
    },
    {
      name: "May",
      Iphone: 4000,
    },
    {
      name: "July",
      Iphone: 800,
    },
    {
      name: "October",
      Iphone: 1500,
    },
  ];

  const service_provider_url = process.env.REACT_APP_SERVICE_PROVIDER_URL;
  console.log("AprGraph ~ service_provider_url", service_provider_url);
  const service_provider_api_key =
    process.env.REACT_APP_SERVICE_PROVIDER_API_KEY;

  const getPairDataByUnixTS = async (pairAddress, from, to) => {
    try {
      const data = await axios({
        method: "get",
        url: `${service_provider_url}/metrics`,
        params: {
          pairAdress: pairAddress,
          fromUnixTS: from,
          toUnixTS: to,
        },
        headers: { api_key: service_provider_api_key },
      });

      return data;
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  useEffect(() => {
    setInterval(async () => {
      console.log("test");
    }, 1000 * 60);

    (async () => {
      console.log("geting data");
      const data = await getPairDataByUnixTS(
        "0xbc9d21652cca70f54351e3fb982c6b5dbe992a22",
        1644464403,
        1644622803
      );
      console.log("data", data);
    })();
  });

  const header = "Annual Percentage Rate (APR)";

  const description = `APR (Annual Percentage Rate) is the annual rate of return,
                      expressed as a percentage, before factoring in compound interest.
                      APR only takes into account simple interest.`;

  return (
    <div>
      <Chart header={header} description={description} data={data} />
    </div>
  );
}

export default AprGraph;
