import React, { useState } from 'react';
import './App.css';
import CryptoList from './components/CryptoList';
import Portfolio from './components/Portfolio';
import { CryptoAsset } from './types';

function App() {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoAsset | null>(null);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'market'>('portfolio');

  const handleSelectCrypto = (crypto: CryptoAsset) => {
    setSelectedCrypto(crypto);
    setActiveTab('portfolio');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            CryptoFolio
          </h1>
          <p className="text-gray-600">
            Track your cryptocurrency portfolio
          </p>
        </header>

        <nav className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'portfolio'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setActiveTab('market')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'market'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Market
            </button>
          </div>
        </nav>

        <main className="space-y-8">
          {activeTab === 'portfolio' && <Portfolio selectedCrypto={selectedCrypto} />}
          {activeTab === 'market' && <CryptoList onSelectCrypto={handleSelectCrypto} />}
        </main>
      </div>
    </div>
  );
}

export default App;