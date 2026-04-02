import React from 'react';

const Notifications = () => {
  const notifications = [
    {
      title: '关于4月5日-4月10日港口部分泊位维护的通知',
      description: '为保障港口运营安全，计划于4月5日至4月10日对A2、B1泊位进行维护，维护期间相关泊位暂停使用，请各单位提前做好调度安排。',
      date: '2026-04-01',
      type: '重要',
      typeColor: 'red'
    },
    {
      title: 'FOS系统V2.5版本更新上线公告',
      description: 'FOS系统V2.5版本已于3月28日正式上线，新增船讯网实时监控、智能调度推荐、移动端适配等功能，欢迎使用并反馈问题。',
      date: '2026-03-28',
      type: '通知',
      typeColor: 'blue'
    },
    {
      title: '关于做好汛期港口安全生产工作的通知',
      description: '汛期即将来临，各部门需做好安全生产检查，完善应急预案，加强值班值守，确保汛期港口运营安全有序。',
      date: '2026-03-25',
      type: '提醒',
      typeColor: 'yellow'
    },
    {
      title: '4月份港口调度培训安排',
      description: '4月15日-4月16日将组织港口调度人员技能培训，内容包括新系统操作、应急处理流程等，请各单位安排人员参加。',
      date: '2026-03-20',
      type: '公告',
      typeColor: 'gray'
    }
  ];

  const getTypeColor = (color) => {
    switch (color) {
      case 'red':
        return 'border-red-500 bg-red-50 bg-red-100 text-red-800';
      case 'blue':
        return 'border-blue-500 bg-blue-50 bg-blue-100 text-blue-800';
      case 'yellow':
        return 'border-yellow-500 bg-yellow-50 bg-yellow-100 text-yellow-800';
      case 'gray':
        return 'border-gray-500 bg-gray-50 bg-gray-100 text-gray-800';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">通知公告</h2>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">更多</a>
      </div>
      <div className="space-y-4">
        {notifications.map((notification, index) => {
          const colorClasses = getTypeColor(notification.typeColor).split(' ');
          return (
            <div key={index} className={`p-3 border-l-4 ${colorClasses[0]} ${colorClasses[1]} rounded-r-md`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-1">
                    <span className={`px-2 py-0.5 text-xs ${colorClasses[2]} ${colorClasses[3]} rounded-full mr-2`}>
                      {notification.type}
                    </span>
                    <span className="text-sm font-medium text-gray-800">{notification.title}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{notification.description}</p>
                  <p className="text-xs text-gray-500">{notification.date}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;