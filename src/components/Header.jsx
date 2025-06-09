import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <header className="mb-12">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4">
          <motion.div 
            className="bg-gradient-to-r from-cyan-500 to-emerald-500 p-2 rounded-xl"
            whileHover={{ rotate: 10 }}
          >
            <div className="bg-gray-900 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 8a2 2 0 114 0 2 2 0 01-4 0zm2 6a4 4 0 00-3.665 2.395.75.75 0 01-.688.405h8.706a.75.75 0 01-.688-.405A4 4 0 0010 14z" clipRule="evenodd" />
              </svg>
            </div>
          </motion.div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent">
              Crypto Dashboard
            </h1>
            <p className="text-gray-400">Real-time cryptocurrency data & analytics</p>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              className="w-full md:w-80 bg-gray-800/50 border border-cyan-500/30 rounded-xl py-3 px-4 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500 absolute left-4 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex flex-wrap gap-4">
        <button className="bg-cyan-700 hover:bg-cyan-600 px-6 py-3 rounded-xl font-medium transition-colors">
          Dashboard
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl font-medium transition-colors">
          Portfolio
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl font-medium transition-colors">
          Watchlist
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl font-medium transition-colors">
          Alerts
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl font-medium transition-colors">
          News
        </button>
      </div>
    </header>
  );
};

export default Header;