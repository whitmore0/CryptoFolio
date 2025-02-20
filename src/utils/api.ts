import axios from 'axios';
import { CryptoAsset } from '../types';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const coinGeckoApi = {
  getTopCoins: async (limit: number = 50): Promise<CryptoAsset[]> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching top coins:', error);
      throw error;
    }
  },

  searchCoins: async (query: string): Promise<any[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/search?query=${query}`);
      return response.data.coins;
    } catch (error) {
      console.error('Error searching coins:', error);
      throw error;
    }
  },

  getCoinById: async (id: string): Promise<CryptoAsset> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/coins/markets?ids=${id}&vs_currency=usd&order=market_cap_desc&per_page=1&page=1&sparkline=false`
      );
      return response.data[0];
    } catch (error) {
      console.error(`Error fetching coin ${id}:`, error);
      throw error;
    }
  }
};