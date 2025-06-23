'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';

// Bitcoin Holdings Chart Component
const BitcoinHoldingsChart = () => {
  const data = [
    { year: '2017', holdings: 63 },
    { year: '2018', holdings: 3500 },
    { year: '2019', holdings: 3636 },
    { year: '2020', holdings: 84726 },
    { year: '2021', holdings: 217726 },
    { year: '2022', holdings: 208889 },
    { year: '2023', holdings: 275726 },
    { year: '2024', holdings: 599726 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-2 sm:p-3 shadow-lg max-w-[200px]">
          <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1">{`${label}:`}</p>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{`${payload[0].value.toLocaleString()} Bitcoin`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 sm:h-80 lg:h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: 40,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" stroke="#E6E8EB" className="dark:stroke-gray-600" />
          <XAxis 
            dataKey="year" 
            stroke="#666"
            fontSize={10}
            tick={{ fill: '#666', fontSize: 10 }}
            className="dark:stroke-gray-400"
            interval={0}
          />
          <YAxis 
            stroke="#666"
            fontSize={10}
            tick={{ fill: '#666', fontSize: 10 }}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
              return value.toString();
            }}
            className="dark:stroke-gray-400"
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="holdings" 
            fill="#11181C"
            className="dark:fill-gray-300 hover:fill-green-500 dark:hover:fill-green-400"
            radius={[0, 0, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// NAV and Market Price Chart Component
const NAVMarketPriceChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('ALL');
  
  const navMarketData = [
    { date: 'Mar 12', nav: 30.00, marketPrice: 29.95, label: 'Mar 12, 2025' },
    { date: 'Mar 15', nav: 30.25, marketPrice: 30.18, label: 'Mar 15, 2025' },
    { date: 'Mar 18', nav: 30.45, marketPrice: 30.52, label: 'Mar 18, 2025' },
    { date: 'Mar 21', nav: 30.85, marketPrice: 30.78, label: 'Mar 21, 2025' },
    { date: 'Mar 25', nav: 31.20, marketPrice: 31.15, label: 'Mar 25, 2025' },
    { date: 'Mar 28', nav: 31.45, marketPrice: 31.52, label: 'Mar 28, 2025' },
    { date: 'Apr 01', nav: 31.85, marketPrice: 31.78, label: 'Apr 01, 2025' },
    { date: 'Apr 04', nav: 32.15, marketPrice: 32.22, label: 'Apr 04, 2025' },
    { date: 'Apr 08', nav: 32.65, marketPrice: 32.58, label: 'Apr 08, 2025' },
    { date: 'Apr 11', nav: 33.20, marketPrice: 33.15, label: 'Apr 11, 2025' },
    { date: 'Apr 15', nav: 33.45, marketPrice: 33.52, label: 'Apr 15, 2025' },
    { date: 'Apr 18', nav: 33.85, marketPrice: 33.78, label: 'Apr 18, 2025' },
    { date: 'Apr 22', nav: 34.25, marketPrice: 34.32, label: 'Apr 22, 2025' },
    { date: 'Apr 25', nav: 34.65, marketPrice: 34.58, label: 'Apr 25, 2025' },
    { date: 'Apr 29', nav: 35.20, marketPrice: 35.25, label: 'Apr 29, 2025' },
    { date: 'May 02', nav: 35.45, marketPrice: 35.38, label: 'May 02, 2025' },
    { date: 'May 06', nav: 35.85, marketPrice: 35.92, label: 'May 06, 2025' },
    { date: 'May 09', nav: 36.20, marketPrice: 36.15, label: 'May 09, 2025' },
    { date: 'May 13', nav: 36.65, marketPrice: 36.72, label: 'May 13, 2025' },
    { date: 'May 16', nav: 37.15, marketPrice: 37.08, label: 'May 16, 2025' },
    { date: 'May 20', nav: 37.50, marketPrice: 37.58, label: 'May 20, 2025' },
    { date: 'May 23', nav: 37.85, marketPrice: 37.78, label: 'May 23, 2025' },
    { date: 'May 27', nav: 38.25, marketPrice: 38.32, label: 'May 27, 2025' },
    { date: 'May 30', nav: 38.65, marketPrice: 38.58, label: 'May 30, 2025' },
    { date: 'Jun 03', nav: 39.15, marketPrice: 39.22, label: 'Jun 03, 2025' },
    { date: 'Jun 06', nav: 39.45, marketPrice: 39.38, label: 'Jun 06, 2025' },
    { date: 'Jun 10', nav: 39.85, marketPrice: 39.92, label: 'Jun 10, 2025' },
    { date: 'Jun 13', nav: 40.25, marketPrice: 40.18, label: 'Jun 13, 2025' },
    { date: 'Jun 16', nav: 40.65, marketPrice: 40.72, label: 'Jun 16, 2025' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{data.label}</p>
          <div className="space-y-1">
            <p className="text-sm font-semibold">
              <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              NAV: <span className="font-bold">${data.nav.toFixed(2)}</span>
            </p>
            <p className="text-sm font-semibold">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Market Price: <span className="font-bold">${data.marketPrice.toFixed(2)}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      {/* Time Period Toggles */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['7d', '1m', '3m', '6m', 'YTD', 'ALL'].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
              selectedPeriod === period
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Date Range Selector */}
      <div className="flex items-center gap-4 mb-6">
        <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          March 12 2025
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-400">To</span>
        <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          June 19 2025
        </button>
      </div>

      {/* Chart */}
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={navMarketData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" strokeWidth={0.5} />
            <XAxis 
              dataKey="date" 
              axisLine={{ stroke: '#ccd6eb', strokeWidth: 1 }}
              tick={{ fontSize: 12, fill: 'rgba(0, 0, 0, 0.4)' }}
              tickLine={{ stroke: '#ccd6eb', strokeWidth: 1 }}
            />
            <YAxis 
              axisLine={{ stroke: '#ccd6eb', strokeWidth: 0 }}
              tick={{ fontSize: 12, fill: 'rgba(0, 0, 0, 0.4)' }}
              tickLine={false}
              domain={['dataMin - 0.5', 'dataMax + 0.5']}
              label={{ value: 'Price ($)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#666' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="nav" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: '#3B82F6', stroke: '#ffffff', strokeWidth: 1 }}
              name="NAV"
            />
            <Line 
              type="monotone" 
              dataKey="marketPrice" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: '#10B981', stroke: '#ffffff', strokeWidth: 1 }}
              name="Market Price"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">NAV</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Market Price</span>
        </div>
      </div>
    </div>
  );
};

// Premium/Discount Chart Component
const PremiumDiscountChart = () => {
  const premiumDiscountData = [
    { date: 'Mar 17', value: 2.5, label: 'Mar 17, 2025' },
    { date: 'Mar 20', value: -8.2, label: 'Mar 20, 2025' },
    { date: 'Mar 24', value: 1.8, label: 'Mar 24, 2025' },
    { date: 'Mar 27', value: 0.9, label: 'Mar 27, 2025' },
    { date: 'Mar 31', value: -3.1, label: 'Mar 31, 2025' },
    { date: 'Apr 03', value: -1.2, label: 'Apr 03, 2025' },
    { date: 'Apr 07', value: 0.8, label: 'Apr 07, 2025' },
    { date: 'Apr 10', value: 2.9, label: 'Apr 10, 2025' },
    { date: 'Apr 14', value: -1.8, label: 'Apr 14, 2025' },
    { date: 'Apr 17', value: -2.1, label: 'Apr 17, 2025' },
    { date: 'Apr 21', value: 0.8, label: 'Apr 21, 2025' },
    { date: 'Apr 24', value: 1.2, label: 'Apr 24, 2025' },
    { date: 'Apr 28', value: -6.8, label: 'Apr 28, 2025' },
    { date: 'May 01', value: 4.2, label: 'May 01, 2025' },
    { date: 'May 05', value: 2.1, label: 'May 05, 2025' },
    { date: 'May 08', value: 1.8, label: 'May 08, 2025' },
    { date: 'May 12', value: -1.5, label: 'May 12, 2025' },
    { date: 'May 15', value: 7.8, label: 'May 15, 2025' },
    { date: 'May 19', value: 12.4, label: 'May 19, 2025' },
    { date: 'May 22', value: 4.2, label: 'May 22, 2025' },
    { date: 'May 26', value: 18.5, label: 'May 26, 2025' },
    { date: 'May 29', value: 1.1, label: 'May 29, 2025' },
    { date: 'Jun 02', value: 12.8, label: 'Jun 02, 2025' },
    { date: 'Jun 05', value: 4.8, label: 'Jun 05, 2025' },
    { date: 'Jun 09', value: 4.5, label: 'Jun 09, 2025' },
    { date: 'Jun 12', value: -25.2, label: 'Jun 12, 2025' },
    { date: 'Jun 16', value: -124.8, label: 'Jun 16, 2025' },
    { date: 'Jun 17', value: 55.0, label: 'Jun 17, 2025' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{data.label}</p>
          <p className="text-sm font-semibold">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Premium/Discount: <span className="font-bold">{data.value.toFixed(2)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={premiumDiscountData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" strokeWidth={0.5} />
          <XAxis 
            dataKey="date" 
            axisLine={{ stroke: '#ccd6eb', strokeWidth: 1 }}
            tick={{ fontSize: 12, fill: 'rgba(0, 0, 0, 0.4)' }}
            tickLine={{ stroke: '#ccd6eb', strokeWidth: 1 }}
          />
          <YAxis 
            axisLine={{ stroke: '#ccd6eb', strokeWidth: 0 }}
            tick={{ fontSize: 12, fill: 'rgba(0, 0, 0, 0.4)' }}
            tickLine={false}
            label={{ value: 'Premium or Discount (bps)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#666' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#39DB80" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: '#39DB80', stroke: '#ffffff', strokeWidth: 1 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const Analytics = () => {
  // Fund details for OWNB ETF
  const fundDetails = {
    ticker: 'OWNB',
    name: 'FGPremium Bitcoin Standard Corporations ETF',
    nav: '$47.82',
    premium: '-0.15%',
    aum: '$1.2B',
    expenseRatio: '0.39%',
  };

  // State for mobile column selection
  const [selectedColumn, setSelectedColumn] = useState('shares');

  // Helper function to get the appropriate data for mobile column
  const getMobileColumnData = (company: string, selectedColumn: string) => {
    const companyData: { [key: string]: { [key: string]: string } } = {
      'MicroStrategy': {
        'shares': '15,563',
        'bitcoin-holdings': '499,096',
        'bitcoin-value': '$52,220,414,480',
        'market-value': '$5,743,213.89',
        'weight': '21.19%'
      },
      'Metaplanet': {
        'shares': '360,000',
        'bitcoin-holdings': '2,888',
        'bitcoin-value': '$302,171,440',
        'market-value': '$4,502,641.68',
        'weight': '16.61%'
      },
      'Riot Platforms': {
        'shares': '267,113',
        'bitcoin-holdings': '18,692',
        'bitcoin-value': '$1,955,743,960',
        'market-value': '$2,655,103.22',
        'weight': '9.80%'
      },
      'MARA Holdings': {
        'shares': '167,369',
        'bitcoin-holdings': '45,659',
        'bitcoin-value': '$4,777,301,170',
        'market-value': '$2,425,176.81',
        'weight': '8.95%'
      },
      'Hut 8': {
        'shares': '74,476',
        'bitcoin-holdings': '10,171',
        'bitcoin-value': '$1,064,191,730',
        'market-value': '$1,268,326.28',
        'weight': '4.68%'
      },
      'Boyaa Interactive': {
        'shares': '1,621,708',
        'bitcoin-holdings': '3,183',
        'bitcoin-value': '$333,037,290',
        'market-value': '$1,084,595.07',
        'weight': '4.00%'
      },
      'CleanSpark': {
        'shares': '114,266',
        'bitcoin-holdings': '11,177',
        'bitcoin-value': '$1,169,449,510',
        'market-value': '$1,048,961.88',
        'weight': '3.87%'
      },
      'Cipher Mining': {
        'shares': '259,383',
        'bitcoin-holdings': '1,032',
        'bitcoin-value': '$107,978,160',
        'market-value': '$988,249.23',
        'weight': '3.65%'
      },
      'HIVE Digital': {
        'shares': '497,738',
        'bitcoin-holdings': '2,805',
        'bitcoin-value': '$293,487,150',
        'market-value': '$883,526.26',
        'weight': '3.26%'
      },
      'Semler Scientific': {
        'shares': '27,039',
        'bitcoin-holdings': '3,192',
        'bitcoin-value': '$333,978,960',
        'market-value': '$863,625.66',
        'weight': '3.19%'
      },
      'Exodus Movement': {
        'shares': '27,939',
        'bitcoin-holdings': '1,900',
        'bitcoin-value': '$198,797,000',
        'market-value': '$842,081.46',
        'weight': '3.11%'
      },
      'Bitfarms': {
        'shares': '801,046',
        'bitcoin-holdings': '1,260',
        'bitcoin-value': '$131,833,800',
        'market-value': '$637,817.66',
        'weight': '2.35%'
      },
      'Fold': {
        'shares': '118,660',
        'bitcoin-holdings': '1,485',
        'bitcoin-value': '$155,375,550',
        'market-value': '$544,649.40',
        'weight': '2.01%'
      },
      'Galaxy Digital': {
        'shares': '25,560',
        'bitcoin-holdings': '3,150',
        'bitcoin-value': '$329,584,500',
        'market-value': '$487,692.90',
        'weight': '1.80%'
      },
      'Nexon Co, Ltd': {
        'shares': '25,100',
        'bitcoin-holdings': '1,717',
        'bitcoin-value': '$179,649,710',
        'market-value': '$485,115.86',
        'weight': '1.79%'
      },
      'Coinbase': {
        'shares': '1,547',
        'bitcoin-holdings': '9,183',
        'bitcoin-value': '$960,817,290',
        'market-value': '$456,813.63',
        'weight': '1.69%'
      },
      'BitFuFu': {
        'shares': '142,342',
        'bitcoin-holdings': '1,800',
        'bitcoin-value': '$188,334,000',
        'market-value': '$452,647.56',
        'weight': '1.67%'
      },
      'Cango': {
        'shares': '99,071',
        'bitcoin-holdings': '1,945',
        'bitcoin-value': '$203,505,350',
        'market-value': '$439,875.24',
        'weight': '1.62%'
      },
      'Tesla': {
        'shares': '1,271',
        'bitcoin-holdings': '11,509',
        'bitcoin-value': '$1,204,186,670',
        'market-value': '$409,325.55',
        'weight': '1.51%'
      },
      'Bitdeer Technologies': {
        'shares': '30,567',
        'bitcoin-holdings': '1,039',
        'bitcoin-value': '$108,710,570',
        'market-value': '$360,537.77',
        'weight': '1.33%'
      },
      'Block': {
        'shares': '5,618',
        'bitcoin-holdings': '8,485',
        'bitcoin-value': '$887,785,550',
        'market-value': '$354,439.62',
        'weight': '1.31%'
      },
      'Canaan': {
        'shares': '265,285',
        'bitcoin-holdings': '1,355',
        'bitcoin-value': '$141,773,650',
        'market-value': '$166,201.05',
        'weight': '0.61%'
      }
    };
    
    return companyData[company]?.[selectedColumn] || '-';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10"></div>
            <svg className="absolute inset-0 w-full h-full opacity-60 dark:opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-400 dark:text-gray-600"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/60 to-transparent dark:from-blue-800/30 dark:to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-100/40 to-transparent dark:from-indigo-800/20 dark:to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 sm:p-8 lg:p-12 shadow-xl min-h-[70vh] flex items-center">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 lg:gap-12 w-full">
              <div className="flex-1 max-w-4xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 tracking-tight">
                  {fundDetails.ticker}
                </h1>
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 font-medium leading-tight">
                  {fundDetails.name}
                </h2>
                <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4 sm:space-y-6 text-base sm:text-lg">
                  <p>
                    Today, more than 70 public companies collectively hold more than 650,000 bitcoin. 
                    OWNB is an equity index fund that provides exposure to forward-looking corporations 
                    with at least 1,000 bitcoin on their balance sheets.
                  </p>
                  <p className="text-sm sm:text-base italic font-medium text-gray-500 dark:text-gray-400">
                    <em>The Fund does not invest in bitcoin directly or indirectly through the use of derivatives.</em>
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a 
                    href="#holdings" 
                    className="relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white rounded-full group"
                  >
                    <span className="absolute w-full h-full rounded-full bg-gradient-to-br from-[#308e87] via-[#308e87] to-[#308e87] group-hover:bg-gradient-to-br group-hover:from-[#308e87] group-hover:via-[#308e87] group-hover:to-[#308e87] transition-all duration-300"></span>
                    <span className="relative">Fund Holdings</span>
                  </a>
                  <a 
                    href="#companies" 
                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-full 
                      border-2 border-[#308e87] text-[#308e87] hover:bg-[#308e87] hover:text-white
                      transition-all duration-300 group"
                  >
                    Bitcoin Standard Corporations
                  </a>
                </div>
              </div>
              
            
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs - Desktop Only */}
        <div className="hidden lg:block bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-center space-x-1 overflow-x-auto py-2">
              <a 
                href="#holdings" 
                className="group relative whitespace-nowrap px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#308e87] dark:hover:text-[#308e87] transition-all duration-300 ease-in-out hover:bg-[#308e87]/10 dark:hover:bg-[#308e87]/20 rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('holdings')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="relative z-10">Holdings</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#308e87]/10 to-[#308e87]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="#why-ownb" 
                className="group relative whitespace-nowrap px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#308e87] dark:hover:text-[#308e87] transition-all duration-300 ease-in-out hover:bg-[#308e87]/10 dark:hover:bg-[#308e87]/20 rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('why-ownb')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="relative z-10">Why OWNB</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#308e87]/10 to-[#308e87]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="#fund-summary" 
                className="group relative whitespace-nowrap px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#308e87] dark:hover:text-[#308e87] transition-all duration-300 ease-in-out hover:bg-[#308e87]/10 dark:hover:bg-[#308e87]/20 rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('fund-summary')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="relative z-10">Fund Summary</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#308e87]/10 to-[#308e87]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="#performance" 
                className="group relative whitespace-nowrap px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#308e87] dark:hover:text-[#308e87] transition-all duration-300 ease-in-out hover:bg-[#308e87]/10 dark:hover:bg-[#308e87]/20 rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('performance')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="relative z-10">Performance</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#308e87]/10 to-[#308e87]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </nav>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-[95%] sm:max-w-[90%] mx-auto px-2 sm:px-6 lg:px-8 py-8">
          {/* Holdings Section */}
          <section id="holdings" className="mb-16">
            <div className="mb-8">
              <h6 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Holdings</h6>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">OWNB Holdings</h2>
            </div>
            
            {/* Holdings Table - Full Width */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">All Holdings</h4>
                {/* Mobile View Selector */}
                <select 
                  className="md:hidden px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  value={selectedColumn}
                  onChange={(e) => setSelectedColumn(e.target.value)}
                >
                  <option value="shares">Shares</option>
                  <option value="bitcoin-holdings">Bitcoin Holdings (BTC)</option>
                  <option value="bitcoin-value">Value of Bitcoin Holdings (USD)</option>
                  <option value="market-value">Market Value</option>
                  <option value="weight">Weight (%)</option>
                </select>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">Name</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">Ticker</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400 md:hidden">
                        {selectedColumn === 'shares' && 'Shares'}
                        {selectedColumn === 'bitcoin-holdings' && 'Bitcoin Holdings (BTC)*'}
                        {selectedColumn === 'bitcoin-value' && 'Value of Bitcoin Holdings (USD)*'}
                        {selectedColumn === 'market-value' && 'Market Value'}
                        {selectedColumn === 'weight' && 'Weight (%)'}
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400 hidden md:table-cell">Bitcoin Holdings (BTC)*</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400 hidden md:table-cell">Value of Bitcoin Holdings (USD)*</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400 hidden md:table-cell">Shares</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400 hidden md:table-cell">Market Value</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400 hidden md:table-cell">Weight (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">MicroStrategy</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">MSTR</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 md:hidden">{getMobileColumnData('MicroStrategy', selectedColumn)}</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">499,096</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$52,220,414,480</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">15,563</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$5,743,213.89</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">21.19%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Metaplanet</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">3350 JP</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 md:hidden">{getMobileColumnData('Metaplanet', selectedColumn)}</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">2,888</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$302,171,440</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">360,000</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$4,502,641.68</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">16.61%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Riot Platforms</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">RIOT</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 md:hidden">{getMobileColumnData('Riot Platforms', selectedColumn)}</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">18,692</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$1,955,743,960</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">267,113</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$2,655,103.22</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">9.80%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">MARA Holdings</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">MARA</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 md:hidden">{getMobileColumnData('MARA Holdings', selectedColumn)}</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">45,659</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$4,777,301,170</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">167,369</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$2,425,176.81</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">8.95%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Hut 8</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">HUT</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 md:hidden">{getMobileColumnData('Hut 8', selectedColumn)}</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">10,171</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$1,064,191,730</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">74,476</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$1,268,326.28</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">4.68%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Boyaa Interactive</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">434 HK</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 md:hidden">{getMobileColumnData('Boyaa Interactive', selectedColumn)}</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">3,183</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$333,037,290</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1,621,708</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$1,084,595.07</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">4.00%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">CleanSpark</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">CLSK</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">11,177</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$1,169,449,510</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">114,266</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$1,048,961.88</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">3.87%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Cipher Mining</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">CIFR</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1,032</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$107,978,160</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">259,383</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$988,249.23</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">3.65%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">HIVE Digital</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">HIVE</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">2,805</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$293,487,150</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">497,738</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$883,526.26</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">3.26%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Semler Scientific</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">SMLR</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">3,192</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$333,978,960</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">27,039</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$863,625.66</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">3.19%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Exodus Movement</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">EXOD</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1,900</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$198,797,000</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">27,939</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$842,081.46</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">3.11%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Bitfarms</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">BITF</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1,260</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$131,833,800</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">801,046</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$637,817.66</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">2.35%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Fold</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">FLD</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1,485</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$155,375,550</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">118,660</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$544,649.40</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">2.01%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Galaxy Digital</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">GLXY CN</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">3,150</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$329,584,500</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">25,560</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$487,692.90</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1.80%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Nexon Co, Ltd</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">3659 JP</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1,717</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$179,649,710</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">25,100</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$485,115.86</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1.79%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Coinbase</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">COIN</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">9,183</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$960,817,290</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">1,547</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$456,813.63</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1.69%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">BitFuFu</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">FUFU</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1,800</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$188,334,000</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">142,342</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$452,647.56</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1.67%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Cango</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">CANG</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1,945</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$203,505,350</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">99,071</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$439,875.24</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1.62%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Tesla</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">TSLA</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">11,509</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$1,204,186,670</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">1,271</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$409,325.55</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1.51%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Bitdeer Technologies</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">BTDR</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1,039</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$108,710,570</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">30,567</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$360,537.77</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1.33%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Block</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">SQ</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">8,485</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$887,785,550</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">5,618</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$354,439.62</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1.31%</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Canaan</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">CAN</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">1,355</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$141,773,650</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400">265,285</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">$166,201.05</td>
                      <td className="py-3 px-2 text-gray-600 dark:text-gray-400 hidden md:table-cell">0.61%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                Holdings are subject to change. Current and future holdings are subject to risk. Shares, Market Value, and Weight as of 06/17/2025.<br/>
                Bitcoin Holdings data is from the most recent company filings as of 03/08/2025.<br/>
                Value of Bitcoin Holdings is calculated using the BTC-USD price as of 03/08/2025.
              </p>
            </div>
            
            {/* Additional Information - Mobile Optimized Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
              {/* Bitcoin Statistics */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center text-center w-full min-h-[200px] lg:min-h-[250px]">
                <h5 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-900 dark:text-white mb-3 leading-tight">
                    <span className="block sm:inline">More than 70 public companies</span>
                    <br className="hidden sm:block lg:hidden xl:block" />
                    <span className="block sm:inline mt-1 sm:mt-0">
                      <em className="text-blue-600 dark:text-blue-400 not-italic font-bold">collectively hold</em> 650,000+ bitcoin.
                    </span>
                </h5>
                <a
                    href="/companies"
                    className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-full 
                      border-2 border-[#308e87] text-[#308e87] hover:bg-[#308e87] hover:text-white
                      text-xs sm:text-sm font-medium transition-all duration-300"
                >
                    View Full List
                </a>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 px-2 sm:px-0">
                    Source: FGPremium Asset Management with data from company filings as of 03/08/2025.
                </p>
              </div>
              
              {/* Methodology */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Methodology</h4>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <p className="font-medium mb-2">Index rules:</p>
                  <ul className="space-y-1 ml-3 sm:ml-4 text-xs sm:text-sm">
                    <li>• Companies must own at least 1,000 bitcoin.</li>
                    <li>• Holdings are weighted by the amount of bitcoin owned (subject to certain limits).</li>
                    <li>• The largest holding is capped at 20% at each rebalance for diversification.</li>
                    <li>• Eligible companies that have less than 33% of their assets in bitcoin are weighted at 1.5%.</li>
                  </ul>
                  <p className="mt-3 text-xs sm:text-sm">The index rebalances quarterly.</p>
                </div>
                <a 
                  href="https://s3.us-east-1.amazonaws.com/static.fgpremiumfunds.com/ownb/FGPremium-Bitcoin-Standard-Corporations-Index-Methodology.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-full 
                    border-2 border-[#308e87] text-[#308e87] hover:bg-[#308e87] hover:text-white
                    text-xs sm:text-sm font-medium transition-all duration-300 mt-3 sm:mt-4"
                >
                  View Full Methodology
                </a>
              </div>
            </div>
            
            {/* Bitcoin Holdings Chart - Mobile Optimized */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Bitcoin Held by Public Corporations</h4>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Data as of 12/31/2024</p>
              </div>
              
              <div className="w-full overflow-hidden">
                <BitcoinHoldingsChart />
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
                Source: FGPremium Asset Management with data from Bitcointreasuries.net.
              </p>
            </div>
          </section>

          {/* Why OWNB Section */}
          <section id="why-ownb" className="mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 sm:p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column - Main Content */}
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">Why invest in OWNB?</h2>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    The FGPremium Bitcoin Standard Corporations ETF is the first ETF focused on companies that hold at least 1,000 bitcoin on their balance sheets. At a time when U.S. companies are sitting on trillions in low-yielding cash and U.S. Treasuries, these corporations are embracing bitcoin as a strategic reserve asset.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a 
                      href="/contact" 
                      className="inline-flex items-center justify-center px-6 py-3 rounded-full 
                        border-2 border-[#308e87] text-[#308e87] hover:bg-[#308e87] hover:text-white
                        font-semibold transition-all duration-300"
                    >
                      Learn More
                    </a>
                    <a 
                      href="https://s3.us-east-1.amazonaws.com/static.fgpremiumfunds.com/ownb/OWNB-FGPremium-Bitcoin-Standard-Corporations-ETF-Investment-Case.pdf" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-full 
                        border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 
                        hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700
                        font-semibold transition-all duration-300"
                    >
                      Investment Case
                    </a>
                  </div>
                </div>

                {/* Right Column - Key Benefits */}
                <div className="space-y-8">
                  <div>
                    <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Exposure to a Growing Corporate Trend</h5>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      With many companies around the world holding record amounts of cash, some have begun allocating to bitcoin as a potential long-term hedge. Today, more than 70 publicly traded companies—from MicroStrategy and Coinbase to Block and Tesla—own bitcoin on their balance sheets. And the number is growing. OWNB captures these firms in an index strategy, providing broad-based exposure to a significant, fast-growing trend.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Access to Innovative Companies in a Familiar ETF Wrapper</h5>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      OWNB allows investors to gain exposure to a diverse array of forward-thinking companies through a familiar ETF wrapper. As an ETF, OWNB is designed to fit easily into the workflow of investment professionals and financial advisors, integrating into portfolio management, reporting, and administrative software tools.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Managed by Crypto Specialists</h5>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      OWNB and its underlying index were created by the crypto specialists at FGPremium, whose sole mission since 2017 has been helping investors access and understand the opportunities in crypto. OWNB is the latest addition to FGPremium's suite of 30+ investment solutions across a wide range of vehicles, including ETFs, SMAs, private funds, active strategies, and staking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

      

          {/* About the OWNB Fund Section */}
          <section id="fund-summary" className="mb-16">
            <div className="text-center mb-8">
              <h6 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Fund Summary</h6>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">About the OWNB Fund</h2>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 sm:p-8">
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Fund Details</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Data as of 06/17/2025</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ticker</h4>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">OWNB</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Number of Holdings</h4>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">24</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Adviser</h4>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">FGPremium Investment Manager, LLC</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Fund Type</h4>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">Equity ETF</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Net Assets (AUM)</h4>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">$27,130,539</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Legal Counsel</h4>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">Chapman and Cutler, LLP</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">CUSIP</h4>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">0917485098</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Expense Ratio</h4>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">0.85%</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Administrator</h4>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">Bank of New York Mellon</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">ISIN</h4>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">US0917485098</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Inception Date</h4>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">March 10, 2025</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Distributor</h4>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">Foreside Fund Services, LLC</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Exchange</h4>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">NYSE Arca</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Index</h4>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">FGPremium Bitcoin Standard Corporations Index</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Custodian</h4>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">Bank of New York Mellon</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Shares Outstanding</h4>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">900,008</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Index Provider</h4>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">FGPremium Index Services, LLC</p>
                </div>
              </div>
            </div>

            {/* Premium/Discount Section */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 sm:p-8">
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Premium/Discount</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Data as of 06/16/2025</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-1">
                  <PremiumDiscountChart />
                </div>

                {/* Statistics Section */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Current Values Table */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">NAV</div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center">Market Price</div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center">Difference</div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 text-right">Premium/Discount</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-base font-semibold text-gray-900 dark:text-white">$30.15</div>
                      <div className="text-base font-semibold text-gray-900 dark:text-white text-center">$30.07</div>
                      <div className="text-base font-semibold text-gray-900 dark:text-white text-center">$0.02</div>
                      <div className="text-base font-semibold text-gray-900 dark:text-white text-right">0.06%</div>
                    </div>
                  </div>

                  {/* Trading Statistics */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div></div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 text-right">Q2 2025</div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 text-right">2025</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-sm text-gray-700 dark:text-gray-300">Days Traded at NAV</div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">Q2 2025</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">0</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">2025</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">0</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-sm text-gray-700 dark:text-gray-300">Days Traded at Premium</div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">Q2 2025</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">35</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">2025</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">35</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-sm text-gray-700 dark:text-gray-300">Days Traded at Discount</div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">Q2 2025</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">13</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">2025</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">13</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Performance Section */}
          <section id="performance" className="mb-16">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* NAV and Market Price Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 sm:p-8">
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Net Asset Value (NAV) and Market Price</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Data as of 06/16/2025</p>
                </div>

                {/* Current Values */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">NAV:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">$40.65</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">NAV Change:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">$0.40 → 0.99%</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Market Price:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">$40.72</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Market Price Change:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">$0.54 → 1.34%</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Median Bid-Ask Spread (30-Day):</span>
                    <span className="font-semibold text-gray-900 dark:text-white">0.56%</span>
                  </div>
                </div>

                {/* Chart */}
                <NAVMarketPriceChart />

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                  30 Day Median Bid-Ask Spread: The spread is calculated from (i) sampling the ETF's NBBO as of the end of each 10-second interval during each trading day of the last 30 calendar days; (ii) dividing the difference between each such bid and offer by the midpoint of the NBBO; and (iii) identifying the median of those values.
                </p>
              </div>

              {/* OWNB Quarter-End Performance */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 sm:p-8">
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">OWNB Quarter-End Performance</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Data as of 03/30/2025</p>
                </div>

                {/* Performance Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400"></th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">3 Months</th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">YTD</th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">1 Year</th>
                        <th className="text-center py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">Since Inception</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">NAV</td>
                        <td className="py-3 px-2 text-center text-gray-600 dark:text-gray-400">—</td>
                        <td className="py-3 px-2 text-center text-gray-600 dark:text-gray-400">—</td>
                        <td className="py-3 px-2 text-center text-gray-600 dark:text-gray-400">—</td>
                        <td className="py-3 px-2 text-center font-semibold text-gray-900 dark:text-white">0.04%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">Market Price</td>
                        <td className="py-3 px-2 text-center text-gray-600 dark:text-gray-400">—</td>
                        <td className="py-3 px-2 text-center text-gray-600 dark:text-gray-400">—</td>
                        <td className="py-3 px-2 text-center text-gray-600 dark:text-gray-400">—</td>
                        <td className="py-3 px-2 text-center font-semibold text-gray-900 dark:text-white">0.38%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    <em>Performance data quoted represents past performance and is no guarantee of future results. Short-term performance, in particular, is not a good indication of the fund's future performance, and an investment should not be made based solely on returns. Investment return and principal value of an investment will fluctuate so that an investor's shares, when redeemed, may be worth more or less than the original cost. Current performance may be lower or higher than the original cost. Returns for periods of one year or less are not annualized. For the most recent month-end performance, please call 1-415-707-3663.</em>
                    <br /><br />
                    Performance of one year or less is not annualized. NAV performance is calculated based on the official closing values as of 4:00 p.m. ET. Market Price performance reflects the midpoint of the bid-ask spread as of 4:00 p.m. ET, and does not represent the returns an investor would receive if shares were traded at other times. Fund returns are calculated net of expenses. Shares are subject to a 0.85% Expense Ratio that includes the management fee, custody charges for holding the fund's assets charged by the custodian, and customary fees and expenses of the fund administrator and auditor.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Risks and Important Information Section */}
          <section className="mb-16">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Risks and Important Information
              </h2>
              
              <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 dark:text-gray-300 space-y-4 leading-relaxed">
                <p className="font-medium">
                  Carefully consider the investment objectives, risk factors, charges, and expenses of the FGPremium Bitcoin Standard Corporations ETF (OWNB) (the "Fund") before investing. This and additional information can be found in the Fund's full or summary prospectus, which may be obtained by visiting{' '}
                  <a 
                    href="https://ownbetf.com/materials" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#308e87] hover:text-[#308e87]/80 underline transition-colors"
                  >
                    ownbetf.com/materials
                  </a>
                  . Investors should read it carefully before investing.
                </p>

                <p>
                  Investing involves risk, including the possible loss of principal. There is no guarantee or assurance that the methodology used to create the Index will result in the Fund achieving positive investment returns or outperforming other investment products. Indices are unmanaged and do not include the effect of fees. One cannot invest directly in an index. Shares of ETFs are bought and sold at market price (not NAV) and are not individually redeemed from the fund. Brokerage commissions will reduce returns.
                </p>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Bitcoin Standard Corporations Risk.</h4>
                  <p>
                    Bitcoin Standard Corporations face unique risks as a result of holding bitcoin in their corporate treasury. The speculative perception of bitcoin may overshadow the fundamentals of such companies, leading to exaggerated price movements based on hype or fear. Companies with significant international operations may face challenges if jurisdictions impose restrictions on bitcoin usage, trade or holdings. Companies holding bitcoin may face accounting challenges, such as recording impairment losses when bitcoin prices decline, even if the holdings are not sold. This can distort financial performance metrics.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Bitcoin Risk.</h4>
                  <p>
                    While Bitcoin Standard Corporations in many instances may have operations unrelated to their bitcoin holdings, they will nonetheless be subject to the risks of holding bitcoin in their corporate treasury. Bitcoin is a relatively new innovation and the market for bitcoin is subject to rapid price swings, changes and uncertainty. Bitcoin is subject to the risk of fraud, theft, manipulation or security failures, operational or other problems that impact the digital asset trading venues on which bitcoin trades. Bitcoin Standard Corporations may also be negatively impacted by regulatory enforcement actions against the digital asset trading venues upon which bitcoin trades.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Digital Asset Market and Volatility Risk.</h4>
                  <p>
                    The price of bitcoin, to which each Bitcoin Standard Corporation has exposure, have historically been highly volatile. The value of such assets has been, and may continue to be, substantially dependent on speculation, such that trading and investing in these assets generally may not be based on fundamental analysis. The value of the Fund's investments in Bitcoin Standard Corporations – and therefore the value of an investment in the Fund – could decline significantly and without warning. If you are not prepared to accept significant and unexpected changes in the value of the Fund, you should not invest in the Fund.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Asset Class Risk.</h4>
                  <p>
                    Securities and other assets in the Index or in the Fund's portfolio may underperform in comparison to the general financial markets, a particular financial market or other asset classes.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Concentration Risk.</h4>
                  <p>
                    The Fund may be susceptible to an increased risk of loss, including losses due to adverse events that affect the Fund's investments more than the market as a whole, to the extent that the Fund's investments are concentrated in the securities and/or other assets of a particular issuer or issuers, country, group of countries, region, market, industry, group of industries, sector, market segment or asset class.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Emerging Markets Risk.</h4>
                  <p>
                    Investments in securities issued by governments and companies operating in emerging market countries involve additional risks relating to political, economic, or regulatory conditions not associated with investments in securities and instruments issued by U.S. companies or by companies operating in other developed market countries.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">New Fund Risk.</h4>
                  <p>
                    The Fund is a recently organized investment company with a limited operating history. As a result, prospective investors have a limited track record or history on which to base their investment decision.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Non-Diversification Risk.</h4>
                  <p>
                    As a "non-diversified" fund, the Fund may hold a smaller number of portfolio securities than many other funds. To the extent the Fund invests in a relatively small number of issuers, a decline in the market value of a particular security held by the Fund may affect its value more than if it invested in a larger number of issuers. The value of the Fund Shares may be more volatile than the values of shares of more diversified funds.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Non-U.S. Securities Risk.</h4>
                  <p>
                    Non-U.S. securities are subject to higher volatility than securities of domestic issuers due to possible adverse political, social or economic developments, restrictions on foreign investment or exchange of securities, capital controls, lack of liquidity, currency exchange rates, excessive taxation, government seizure of assets, the imposition of sanctions by foreign governments, different legal or accounting standards, and less government supervision and regulation of securities exchanges in foreign countries.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Small- and Mid-Capitalization Companies Risk.</h4>
                  <p>
                    Small and/or mid capitalization companies may be more vulnerable to adverse general market or economic developments, and their securities may be less liquid and may experience greater price volatility than larger, more established companies as a result of several factors, including limited trading volumes, fewer products or financial resources, management inexperience and less publicly available information. Accordingly, such companies are generally subject to greater market risk than larger, more established companies.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Passive Investment Risk.</h4>
                  <p>
                    The fund is passively managed and attempts to mirror the composition and performance of the FGPremium Bitcoin Standard Corporations Index. The Fund generally will not attempt to take defensive positions in declining markets.
                  </p>
                </div>

                <p className="text-sm font-medium pt-4 border-t border-gray-200 dark:border-gray-700">
                  OWNB is distributed by Foreside Fund Services, LLC, which is not affiliated with FGPremium or any of its affiliates.
                </p>
              </div>
            </div>
          </section>

          {/* Learn More Section */}
          <section className="mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 sm:p-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Learn more about OWNB today.
              </h2>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full 
                  border-2 border-[#308e87] text-[#308e87] hover:bg-[#308e87] hover:text-white
                  transition-all duration-300 transform hover:scale-105 group"
              >
                Contact Us
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
