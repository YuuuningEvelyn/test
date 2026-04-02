import React, { useState } from 'react';

const ShipSchedule = () => {
  const [scheduleType, setScheduleType] = useState('arrival');

  const ships = [
    {
      name: '海洋量子号',
      type: '邮轮',
      typeColor: 'blue',
      status: '正常',
      statusColor: 'green',
      route: '上海 → 深圳蛇口',
      speed: '18.5 节',
      arrivalTime: '预计 14:00 到港'
    },
    {
      name: '探险号',
      type: '邮轮',
      typeColor: 'blue',
      status: '正常',
      statusColor: 'green',
      route: '三亚 → 深圳蛇口',
      speed: '16.2 节',
      arrivalTime: '预计 14:30 到港'
    },
    {
      name: '梦想号',
      type: '延误',
      typeColor: 'yellow',
      status: '延误',
      statusColor: 'yellow',
      route: '新加坡 → 深圳蛇口',
      speed: '12.3 节',
      arrivalTime: '预计 18:30 到港(延误2小时)'
    },
    {
      name: '中远号',
      type: '货轮',
      typeColor: 'green',
      status: '正常',
      statusColor: 'green',
      route: '宁波 → 深圳蛇口',
      speed: '14.8 节',
      arrivalTime: '预计 20:15 到港'
    },
    {
      name: '前进号',
      type: '集装箱',
      typeColor: 'purple',
      status: '正常',
      statusColor: 'green',
      route: '青岛 → 深圳蛇口',
      speed: '15.5 节',
      arrivalTime: '预计 22:40 到港'
    }
  ];

  const getTypeColor = (color) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-800';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800';
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'purple':
        return 'bg-purple-100 text-purple-800';
      default:
        return '';
    }
  };

  const getStatusColor = (color) => {
    switch (color) {
      case 'green':
        return 'bg-green-500 text-green-600';
      case 'yellow':
        return 'bg-yellow-500 text-orange-600';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">今日船舶动态</h2>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-sm rounded-md ${scheduleType === 'arrival' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setScheduleType('arrival')}
          >
            到港
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${scheduleType === 'departure' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setScheduleType('departure')}
          >
            离港
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {ships.map((ship, index) => {
          const typeColorClass = getTypeColor(ship.typeColor);
          const statusColorClass = getStatusColor(ship.statusColor).split(' ');
          return (
            <div key={index} className={`p-3 ${index < ships.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-1">
                    <span className={`w-2 h-2 ${statusColorClass[0]} rounded-full mr-2`}></span>
                    <span className="text-sm font-medium text-gray-800">{ship.name}</span>
                    <span className={`ml-2 px-2 py-0.5 text-xs ${typeColorClass} rounded-full`}>{ship.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="text-gray-500">↑</span> {ship.route}
                    <span className="mx-2">•</span>
                    <span className="text-gray-500">航速</span> {ship.speed}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${statusColorClass[1]} mb-1`}>{ship.arrivalTime}</p>
                  <a href="#" className="text-xs text-blue-600 hover:text-blue-800">查看详情</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShipSchedule;