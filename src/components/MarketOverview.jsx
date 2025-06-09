import React from 'react';

const MarketOverview = ({ data }) => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-cyan-900/20 rounded-2xl border border-cyan-500/30 p-6 shadow-2xl shadow-cyan-500/10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-gray-800/50 rounded-xl">
          <h3 className="text-gray-400">Total Market Cap</h3>
          <p className="text-2xl font-bold mt-2">{data.totalMarketCap}</p>
          <p className={`mt-1 ${data.marketCapChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {data.marketCapChange >= 0 ? '+' : ''}{data.marketCapChange.toFixed(2)}%
          </p>
        </div>
        
        <div className="p-4 bg-gray-800/50 rounded-xl">
          <h3 className="text-gray-400">24h Volume</h3>
          <p className="text-2xl font-bold mt-2">{data.totalVolume}</p>
          <p className="mt-1 text-gray-400">Global trading</p>
        </div>
        
        <div className="p-4 bg-gray-800/50 rounded-xl">
          <h3 className="text-gray-400">Active Cryptos</h3>
          <p className="text-2xl font-bold mt-2">{data.activeCryptos.toLocaleString()}</p>
          <p className="mt-1 text-gray-400">Traded assets</p>
        </div>
        
        <div className="p-4 bg-gray-800/50 rounded-xl">
          <h3 className="text-gray-400">BTC Dominance</h3>
          <p className="text-2xl font-bold mt-2">{data.btcDominance.toFixed(1)}%</p>
          <p className="mt-1 text-gray-400">Market share</p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm text-gray-400">Bullish market</span>
        </div>
        <div className="text-sm text-gray-400">
          Data updates every 60 seconds
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;