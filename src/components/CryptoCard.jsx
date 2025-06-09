import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import MiniChart from './MiniChart';

const CryptoCard = React.memo(({ coin, timeRange }) => {
  const timeRangeLabels = useMemo(() => ({
    '1h': '1h',
    '24h': '24h',
    '7d': '7d',
    '30d': '30d'
  }), []);

  const changeColor = coin.change >= 0 ? 'text-green-500' : 'text-red-500';
  const formattedPrice = useMemo(
    () => coin.price.toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    }),
    [coin.price]
  );

  return (
    <motion.div 
      className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6
                border border-cyan-500/30 shadow-2xl shadow-cyan-500/20
                w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-amber-500/10 p-3 rounded-full">
            <img 
              src={coin.image} 
              alt={coin.name}
              className="w-10 h-10 md:w-12 md:h-12"
              loading="lazy"
            />
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-300">{coin.name}</h3>
            <p className="text-gray-400">{coin.symbol}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-3xl font-bold text-white">${formattedPrice}</p>
          <p className={`${changeColor} font-medium mt-1`}>
            {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(2)}% ({timeRangeLabels[timeRange]})
          </p>
        </div>
      </div>
      
      <div className="mt-6">
        <MiniChart 
          data={coin.sparkline} 
          isPositive={coin.change >= 0} 
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <p className="text-gray-400">Market Cap</p>
          <p className="text-white">{coin.marketCap}</p>
        </div>
        <div>
          <p className="text-gray-400">24h Volume</p>
          <p className="text-white">{coin.volume}</p>
        </div>
      </div>
    </motion.div>
  );
});

export default CryptoCard;