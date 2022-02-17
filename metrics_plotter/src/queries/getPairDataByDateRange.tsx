import axios from "axios";

export interface ISnapshot {
  date: string;
  liquidity_usd: number;
  volume_usd: number;
  fees_usd: number;
}

export interface IToken {
  name: string;
  id: string;
  symbol: string;
}

export interface IPair {
  _id: string;
  name: string;
  token0: IToken;
  token1: IToken;
  snapshots: ISnapshot[];
}

export interface IRequest {
  (pairAddress: string, from: Date, to: Date): IPair[];
  getPairDataByUnixTS(): Promise<IRequest>;
}

// This functions request a pair snapshors based on given pair addres and a date range
const getPairDataByDateRange = async (
  pairAddress: string,
  from: Date,
  to: Date
): Promise<IPair> => {
  const service_provider_url = process.env.REACT_APP_SERVICE_PROVIDER_URL;
  const service_provider_api_key =
    process.env.REACT_APP_SERVICE_PROVIDER_API_KEY || "";

  try {
    const { data } = await axios.request({
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
  } catch (error: any) {
    console.log(
      "Error requesting a pair's metrics data. The service provider must be down"
    );
    throw new Error(error);
  }
};

export default getPairDataByDateRange;
