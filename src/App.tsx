import React from 'react';
import './App.css';
import CryptoList from './components/CryptoList';
import { CryptoAsset } from './types';

function App() {
  const handleSelectCrypto = (crypto: CryptoAsset) => {
    console.log('Selected crypto:', crypto);
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

        <main className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Portfolio Overview</h2>
            <p className="text-gray-600">
              Welcome to CryptoFolio! Start by selecting a cryptocurrency to add to your portfolio.
            </p>
          </div>

          <CryptoList onSelectCrypto={handleSelectCrypto} />
        </main>
      </div>
    </div>
  );
}

export default App;