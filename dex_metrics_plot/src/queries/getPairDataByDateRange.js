import axios from "axios";

const getPairDataByUnixTS = async (pairAddress, from, to) => {
  const service_provider_url = process.env.REACT_APP_SERVICE_PROVIDER_URL;
  const service_provider_api_key =
    process.env.REACT_APP_SERVICE_PROVIDER_API_KEY;

  try {
    const {data} = await axios({
      method: "get",
      url: `${service_provider_url}/metricsbydaterange`,
      params: {
        pairAdress: pairAddress,
        fromDate: from,
        toDate: to,
      },
      headers: {
        "api-key": service_provider_api_key,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return data[0];
  } catch (error) {
    console.log(error);
    return {};
  }
};

export default getPairDataByUnixTS;
