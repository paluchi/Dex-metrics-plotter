interface IToken {
  name: string;
  id: string;
  symbol: string;
}
interface ISnapshot {
  date: Date;
  liquidity_usd: string;
  volume_usd: string;
  fees_usd: string;
}

interface IPair {
  token0: IToken;
  token1: IToken;
  name: string;
  id: string;
  snapshots: ISnapshot[];
}

export { IPair, ISnapshot, IToken };
