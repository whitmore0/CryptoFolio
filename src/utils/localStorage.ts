import { PortfolioAsset } from '../types';

const PORTFOLIO_KEY = 'cryptofolio-portfolio';

export const localStorageUtils = {
  savePortfolio: (portfolio: PortfolioAsset[]): void => {
    try {
      localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(portfolio));
    } catch (error) {
      console.error('Failed to save portfolio to localStorage:', error);
    }
  },

  loadPortfolio: (): PortfolioAsset[] => {
    try {
      const saved = localStorage.getItem(PORTFOLIO_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load portfolio from localStorage:', error);
      return [];
    }
  },

  clearPortfolio: (): void => {
    try {
      localStorage.removeItem(PORTFOLIO_KEY);
    } catch (error) {
      console.error('Failed to clear portfolio from localStorage:', error);
    }
  }
};