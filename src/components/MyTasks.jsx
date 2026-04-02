import React from 'react';

const MyTasks = () => {
  const tasks = [
    {
      title: '梦想号延误应急调度',
      description: '梦想号预计延误2小时，需重新安排泊位和调度计划',
      time: '剩余时间: 00:32:15',
      priority: '紧急',
      priorityColor: 'red',
      buttonText: '立即处理'
    },
    {
      title: '12份作业申请待审核',
      description: '今日有12份邮轮作业申请需要审核，其中5份将于2小时内超时',
      time: '截止时间: 今日12:00',
      priority: '高优',
      priorityColor: 'yellow',
      buttonText: '前往审核'
    },
    {
      title: '8份泊位预定待确认',
      description: '下周泊位预定申请需要确认安排，避免泊位冲突',
      time: '截止时间: 今日18:00',
      priority: '中优',
      priorityColor: 'blue',
      buttonText: '查看详情'
    },
    {
      title: '月度运营报表生成',
      description: '3月份港口运营数据统计报表需要生成并提交',
      time: '截止时间: 4月5日',
      priority: '普通',
      priorityColor: 'gray',
      buttonText: '稍后处理'
    }
  ];

  const getPriorityColor = (color) => {
    switch (color) {
      case 'red':
        return 'bg-red-50 border-red-500 text-red-800 bg-red-100 bg-red-500';
      case 'yellow':
        return 'bg-yellow-50 border-yellow-500 text-yellow-800 bg-yellow-100 bg-yellow-500';
      case 'blue':
        return 'bg-blue-50 border-blue-500 text-blue-800 bg-blue-100 bg-blue-500';
      case 'gray':
        return 'bg-gray-50 border-gray-500 text-gray-800 bg-gray-100 bg-gray-500';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">我的待办任务</h2>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">全部查看</a>
      </div>
      <div className="space-y-4">
        {tasks.map((task, index) => {
          const colorClasses = getPriorityColor(task.priorityColor).split(' ');
          return (
            <div key={index} className={`${colorClasses[0]} ${colorClasses[1]} p-4 rounded-r-md`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-medium text-gray-800">{task.title}</span>
                    <span className={`ml-2 px-2 py-0.5 text-xs ${colorClasses[3]} ${colorClasses[2]} rounded-full`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  <p className="text-xs text-gray-500">{task.time}</p>
                </div>
                <button className={`px-4 py-2 ${colorClasses[4]} text-white text-sm rounded-md hover:opacity-90 transition-colors duration-200 whitespace-nowrap`}>
                  {task.buttonText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyTasks;