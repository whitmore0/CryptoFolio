export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
}

export interface Portfolio {
  id: string;
  name: string;
  assets: PortfolioAsset[];
  totalValue: number;
}

export interface PortfolioAsset {
  asset: CryptoAsset;
  amount: number;
  value: number;
}