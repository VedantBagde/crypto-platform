import React, { useState, useEffect } from 'react';
import CryptoCard from './components/CryptoCard';
import Header from './components/Header';
import MarketOverview from './components/MarketOverview';
import './index.css';

// ✅ Utility Functions: Outside of App Component
const formatMarketCap = (value) => {
  if (!value || isNaN(value)) return '$0';
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
};

const formatVolume = (value) => {
  if (!value || isNaN(value)) return '$0';
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
};

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('24h');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const coinsResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=${timeRange}`
        );
        if (!coinsResponse.ok) throw new Error('Failed to fetch cryptocurrency data');

        const coinsData = await coinsResponse.json();
        if (!Array.isArray(coinsData)) throw new Error('Invalid cryptocurrency data');

        const formattedData = coinsData.map((coin) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          price: coin.current_price || 0,
          change: coin[`price_change_percentage_${timeRange}_in_currency`] || 0,
          marketCap: formatMarketCap(coin.market_cap),
          volume: formatVolume(coin.total_volume),
          image: coin.image,
          sparkline: coin.sparkline_in_7d?.price || Array(30).fill(coin.current_price || 0),
        }));

        const globalResponse = await fetch('https://api.coingecko.com/api/v3/global');
        if (!globalResponse.ok) throw new Error('Failed to fetch market data');

        const globalData = await globalResponse.json();
        if (!globalData.data) throw new Error('Invalid market data');

        setMarketData({
          totalMarketCap: formatMarketCap(globalData.data.total_market_cap.usd),
          totalVolume: formatVolume(globalData.data.total_volume.usd),
          activeCryptos: globalData.data.active_cryptocurrencies || 0,
          marketCapChange: globalData.data.market_cap_change_percentage_24h_usd || 0,
          btcDominance: globalData.data.market_cap_percentage.btc || 0,
        });

        setCryptoData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Auto-refresh every 60s
    return () => clearInterval(interval);
  }, [timeRange]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-500"></div>
          </div>
        )}

        {/* Error Box */}
        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-xl p-6 mb-8">
            <p className="text-center text-xl">Error: {error}</p>
            <p className="text-center mt-2 text-gray-400">
              Please check your internet connection or try again later
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-700 rounded-lg hover:bg-red-600 transition-colors"
              >
                Reload Data
              </button>
            </div>
          </div>
        )}

        {/* Market Overview */}
        {marketData && !loading && !error && <MarketOverview data={marketData} />}

        {/* Time Filter Buttons */}
        <div className="flex justify-between items-center mb-6 mt-10">
          <h2 className="text-3xl font-bold">Top Cryptocurrencies</h2>
          <div className="flex space-x-2">
            {['1h', '24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg ${
                  timeRange === range
                    ? 'bg-cyan-700 text-white'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Crypto Cards Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {cryptoData.map((coin) => (
              <CryptoCard key={coin.id} coin={coin} timeRange={timeRange} />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>Data provided by CoinGecko API</p>
          <p className="mt-2">
            © {new Date().getFullYear()} Crypto Dashboard - Real-time cryptocurrency data
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
