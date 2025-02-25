import React, { useState, useEffect } from 'react';
import { PortfolioAsset, CryptoAsset } from '../types';
import { localStorageUtils } from '../utils/localStorage';

interface PortfolioProps {
  selectedCrypto?: CryptoAsset | null;
  onAddAsset?: (crypto: CryptoAsset, amount: number) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ selectedCrypto, onAddAsset }) => {
  const [portfolioAssets, setPortfolioAssets] = useState<PortfolioAsset[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [amount, setAmount] = useState<string>('');

  const totalValue = portfolioAssets.reduce((sum, asset) => sum + asset.value, 0);

  useEffect(() => {
    const savedPortfolio = localStorageUtils.loadPortfolio();
    setPortfolioAssets(savedPortfolio);
  }, []);

  useEffect(() => {
    localStorageUtils.savePortfolio(portfolioAssets);
  }, [portfolioAssets]);

  useEffect(() => {
    if (selectedCrypto) {
      setShowAddModal(true);
    }
  }, [selectedCrypto]);

  const handleAddAsset = () => {
    if (selectedCrypto && amount) {
      const numAmount = parseFloat(amount);
      const value = numAmount * selectedCrypto.current_price;

      const newAsset: PortfolioAsset = {
        asset: selectedCrypto,
        amount: numAmount,
        value: value
      };

      setPortfolioAssets([...portfolioAssets, newAsset]);
      setShowAddModal(false);
      setAmount('');
    }
  };

  const removeAsset = (index: number) => {
    const updated = portfolioAssets.filter((_, i) => i !== index);
    setPortfolioAssets(updated);
  };

  const clearPortfolio = () => {
    if (window.confirm('Are you sure you want to clear your entire portfolio?')) {
      setPortfolioAssets([]);
      localStorageUtils.clearPortfolio();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">My Portfolio</h3>
          <p className="text-sm text-gray-500">
            Total Value: <span className="font-semibold text-green-600">${totalValue.toLocaleString()}</span>
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Asset
          </button>
          {portfolioAssets.length > 0 && (
            <button
              onClick={clearPortfolio}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {portfolioAssets.length === 0 ? (
        <div className="px-6 py-8 text-center text-gray-500">
          <p>No assets in portfolio yet.</p>
          <p className="text-sm">Click "Add Asset" to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {portfolioAssets.map((portfolioAsset, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={portfolioAsset.asset.image}
                        alt={portfolioAsset.asset.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {portfolioAsset.asset.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {portfolioAsset.asset.symbol.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {portfolioAsset.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${portfolioAsset.asset.current_price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${portfolioAsset.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => removeAsset(index)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddModal && selectedCrypto && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-medium mb-4">Add Asset to Portfolio</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={selectedCrypto.image}
                  alt={selectedCrypto.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <div className="font-medium text-gray-900">{selectedCrypto.name}</div>
                  <div className="text-sm text-gray-500">
                    ${selectedCrypto.current_price.toLocaleString()}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {amount && (
                  <div className="mt-2 text-sm text-gray-600">
                    Total value: ${(parseFloat(amount) * selectedCrypto.current_price).toLocaleString()}
                  </div>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleAddAsset}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Add to Portfolio
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setAmount('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;