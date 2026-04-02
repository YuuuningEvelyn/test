import React, { useState, useEffect } from 'react';

const PortThroughput = () => {
  // 模拟数据
  const mockData = {
    week: {
      all: [
        { date: '3.25', value: 48, lastWeekValue: 52, isAbnormal: true, warning: '低于上周10%' },
        { date: '3.27', value: 52, lastWeekValue: 50, isAbnormal: false },
        { date: '3.28', value: 60, lastWeekValue: 55, isAbnormal: false },
        { date: '3.29', value: 44, lastWeekValue: 48, isAbnormal: true, warning: '低于上周8%' },
        { date: '3.30', value: 56, lastWeekValue: 53, isAbnormal: false },
        { date: '3.31', value: 64, lastWeekValue: 58, isAbnormal: false },
        { date: '4.01', value: 68, lastWeekValue: 60, isAbnormal: false },
        { date: '4.02', value: 58, lastWeekValue: 62, isAbnormal: true, warning: '低于上周6%' }
      ],
      container: [
        { date: '3.25', value: 32, lastWeekValue: 35, isAbnormal: true, warning: '低于上周8%' },
        { date: '3.27', value: 36, lastWeekValue: 34, isAbnormal: false },
        { date: '3.28', value: 42, lastWeekValue: 38, isAbnormal: false },
        { date: '3.29', value: 30, lastWeekValue: 33, isAbnormal: true, warning: '低于上周9%' },
        { date: '3.30', value: 38, lastWeekValue: 36, isAbnormal: false },
        { date: '3.31', value: 44, lastWeekValue: 40, isAbnormal: false },
        { date: '4.01', value: 46, lastWeekValue: 41, isAbnormal: false },
        { date: '4.02', value: 40, lastWeekValue: 43, isAbnormal: true, warning: '低于上周7%' }
      ],
      bulk: [
        { date: '3.25', value: 16, lastWeekValue: 17, isAbnormal: true, warning: '低于上周6%' },
        { date: '3.27', value: 16, lastWeekValue: 16, isAbnormal: false },
        { date: '3.28', value: 18, lastWeekValue: 17, isAbnormal: false },
        { date: '3.29', value: 14, lastWeekValue: 15, isAbnormal: true, warning: '低于上周7%' },
        { date: '3.30', value: 18, lastWeekValue: 17, isAbnormal: false },
        { date: '3.31', value: 20, lastWeekValue: 18, isAbnormal: false },
        { date: '4.01', value: 22, lastWeekValue: 19, isAbnormal: false },
        { date: '4.02', value: 18, lastWeekValue: 19, isAbnormal: true, warning: '低于上周5%' }
      ]
    },
    month: {
      all: [
        { date: '3/1', value: 52, lastMonthValue: 48, isAbnormal: false },
        { date: '3/2', value: 55, lastMonthValue: 50, isAbnormal: false },
        { date: '3/3', value: 58, lastMonthValue: 52, isAbnormal: false },
        { date: '3/4', value: 54, lastMonthValue: 55, isAbnormal: true, warning: '低于上月2%' },
        { date: '3/5', value: 60, lastMonthValue: 53, isAbnormal: false },
        { date: '3/6', value: 62, lastMonthValue: 56, isAbnormal: false },
        { date: '3/7', value: 59, lastMonthValue: 58, isAbnormal: false }
      ],
      container: [
        { date: '3/1', value: 35, lastMonthValue: 32, isAbnormal: false },
        { date: '3/2', value: 37, lastMonthValue: 34, isAbnormal: false },
        { date: '3/3', value: 39, lastMonthValue: 36, isAbnormal: false },
        { date: '3/4', value: 36, lastMonthValue: 37, isAbnormal: true, warning: '低于上月3%' },
        { date: '3/5', value: 41, lastMonthValue: 37, isAbnormal: false },
        { date: '3/6', value: 42, lastMonthValue: 38, isAbnormal: false },
        { date: '3/7', value: 40, lastMonthValue: 39, isAbnormal: false }
      ],
      bulk: [
        { date: '3/1', value: 17, lastMonthValue: 16, isAbnormal: false },
        { date: '3/2', value: 18, lastMonthValue: 16, isAbnormal: false },
        { date: '3/3', value: 19, lastMonthValue: 16, isAbnormal: false },
        { date: '3/4', value: 18, lastMonthValue: 18, isAbnormal: false },
        { date: '3/5', value: 19, lastMonthValue: 16, isAbnormal: false },
        { date: '3/6', value: 20, lastMonthValue: 18, isAbnormal: false },
        { date: '3/7', value: 19, lastMonthValue: 19, isAbnormal: false }
      ]
    },
    year: {
      all: [
        { date: '1月', value: 1200, lastYearValue: 1100, isAbnormal: false },
        { date: '2月', value: 1150, lastYearValue: 1050, isAbnormal: false },
        { date: '3月', value: 1300, lastYearValue: 1150, isAbnormal: false },
        { date: '4月', value: 1250, lastYearValue: 1200, isAbnormal: false },
        { date: '5月', value: 1350, lastYearValue: 1250, isAbnormal: false },
        { date: '6月', value: 1400, lastYearValue: 1300, isAbnormal: false },
        { date: '7月', value: 1450, lastYearValue: 1350, isAbnormal: false }
      ],
      container: [
        { date: '1月', value: 800, lastYearValue: 750, isAbnormal: false },
        { date: '2月', value: 780, lastYearValue: 720, isAbnormal: false },
        { date: '3月', value: 880, lastYearValue: 790, isAbnormal: false },
        { date: '4月', value: 850, lastYearValue: 810, isAbnormal: false },
        { date: '5月', value: 920, lastYearValue: 850, isAbnormal: false },
        { date: '6月', value: 950, lastYearValue: 880, isAbnormal: false },
        { date: '7月', value: 980, lastYearValue: 910, isAbnormal: false }
      ],
      bulk: [
        { date: '1月', value: 400, lastYearValue: 350, isAbnormal: false },
        { date: '2月', value: 370, lastYearValue: 330, isAbnormal: false },
        { date: '3月', value: 420, lastYearValue: 360, isAbnormal: false },
        { date: '4月', value: 400, lastYearValue: 390, isAbnormal: false },
        { date: '5月', value: 430, lastYearValue: 400, isAbnormal: false },
        { date: '6月', value: 450, lastYearValue: 420, isAbnormal: false },
        { date: '7月', value: 470, lastYearValue: 440, isAbnormal: false }
      ]
    }
  };

  const [timeRange, setTimeRange] = useState('week');
  const [compareType, setCompareType] = useState('none');
  const [businessType, setBusinessType] = useState('all');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [currentData, setCurrentData] = useState(mockData.week.all);
  const [maxValue, setMaxValue] = useState(100);

  // 计算最大值并更新数据
  useEffect(() => {
    const data = mockData[timeRange][businessType];
    setCurrentData(data);
    
    // 计算最大值，考虑对比值
    let max = 0;
    data.forEach(item => {
      max = Math.max(max, item.value);
      if (compareType !== 'none') {
        max = Math.max(max, item.lastWeekValue);
      }
    });
    setMaxValue(max * 1.2); // 留20%的空间
  }, [timeRange, compareType, businessType]);

  // 计算柱状图高度（百分比）
  const getBarHeight = (value) => {
    return (value / maxValue) * 100;
  };

  const coreData = {
    todayThroughput: 58000,
    weekThroughput: 400000,
    yearCompletionRate: 28.5
  };

  const getBarColor = (item) => {
    if (item.isAbnormal) {
      return 'bg-red-500';
    }
    return 'bg-blue-500';
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h2 className="text-lg font-semibold text-gray-800">近7日港口吞吐量统计</h2>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-sm rounded-md ${timeRange === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setTimeRange('week')}
          >
            周
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${timeRange === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setTimeRange('month')}
          >
            月
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${timeRange === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setTimeRange('year')}
          >
            年
          </button>
        </div>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-sm rounded-md ${compareType === 'none' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setCompareType('none')}
          >
            无对比
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${compareType === 'yoy' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setCompareType('yoy')}
          >
            同比
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${compareType === 'mom' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setCompareType('mom')}
          >
            环比
          </button>
        </div>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-sm rounded-md ${businessType === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setBusinessType('all')}
          >
            全部
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${businessType === 'container' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setBusinessType('container')}
          >
            集装箱
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${businessType === 'bulk' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setBusinessType('bulk')}
          >
            散货
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
        {/* 左侧：柱状图 */}
        <div className="lg:col-span-2">
          <div className="relative h-80">
            <div className="absolute inset-0 flex items-end justify-between pb-8">
              {currentData.map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center relative w-full"
                  onMouseEnter={() => setHoveredItem({ ...item, index })}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="flex items-end justify-center space-x-1 h-64">
                    {compareType !== 'none' && (
                      <div 
                        className="w-5 bg-gray-300 rounded-t-md transition-all duration-500 ease-in-out"
                        style={{ height: `${getBarHeight(item.lastWeekValue)}%` }}
                      ></div>
                    )}
                    <div 
                      className={`${compareType !== 'none' ? 'w-5' : 'w-12'} ${getBarColor(item)} rounded-t-md transition-all duration-500 ease-in-out`}
                      style={{ height: `${getBarHeight(item.value)}%` }}
                    >
                      {item.isAbnormal && (
                        <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">{item.date}</div>
                  <div className="text-xs text-gray-500">{item.value}</div>
                  {compareType !== 'none' && (
                    <div className="text-xs text-gray-400">{item.lastWeekValue}</div>
                  )}
                  
                  {/* Hover 提示 */}
                  {hoveredItem && hoveredItem.index === index && (
                    <div className="absolute top-[-80px] left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-3 border border-gray-200 z-10 w-48">
                      <div className="text-sm font-medium text-gray-800 mb-1">{item.date} 吞吐量</div>
                      <div className="text-xs text-gray-600 mb-1">当前值: {item.value}</div>
                      {compareType !== 'none' && (
                        <div className="text-xs text-gray-600 mb-1">
                          {timeRange === 'week' ? '上周' : timeRange === 'month' ? '上月' : '去年'}值: {item.lastWeekValue}
                        </div>
                      )}
                      {item.isAbnormal && (
                        <div className="text-xs text-red-600 mt-2">
                          <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {item.warning}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 右侧：核心数据卡片 */}
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">今日实时吞吐量</h3>
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-800">{coreData.todayThroughput.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">↑ 5.2% 较昨日</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">本周累计吞吐量</h3>
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-800">{coreData.weekThroughput.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">↑ 8.7% 较上周</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">年度累计完成率</h3>
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-800">{coreData.yearCompletionRate}%</div>
            <div className="text-xs text-blue-600 mt-1">目标: 30%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortThroughput;