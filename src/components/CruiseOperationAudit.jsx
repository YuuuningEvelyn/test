import { useState, useEffect } from 'react'
import gsap from 'gsap'

function CruiseOperationAudit() {
  const [filters, setFilters] = useState({
    operationType: '全部类型',
    cruiseCompany: '全部公司',
    auditStatus: '待审核',
    dateRange: '2026-04-01 至 2026-04-02'
  })

  const [data, setData] = useState([
    {
      id: 'ZY20260402001',
      cruiseName: '海洋量子号',
      operationType: '靠港作业',
      applyTime: '2026-04-02 08:30:15',
      plannedOperationTime: '2026-04-02 14:00:00 至 2026-04-02 20:00:00',
      applicant: '张三',
      status: '待审核'
    },
    {
      id: 'ZY20260402002',
      cruiseName: '光谱号',
      operationType: '离港作业',
      applyTime: '2026-04-02 09:15:42',
      plannedOperationTime: '2026-04-02 18:30:00 至 2026-04-02 22:30:00',
      applicant: '李四',
      status: '待审核'
    },
    {
      id: 'ZY20260402003',
      cruiseName: '威尼斯号',
      operationType: '补给作业',
      applyTime: '2026-04-02 10:05:18',
      plannedOperationTime: '2026-04-03 08:00:00 至 2026-04-03 12:00:00',
      applicant: '王五',
      status: '待审核'
    },
    {
      id: 'ZY20260402004',
      cruiseName: '荣耀号',
      operationType: '维护作业',
      applyTime: '2026-04-02 11:20:33',
      plannedOperationTime: '2026-04-04 09:00:00 至 2026-04-04 18:00:00',
      applicant: '赵六',
      status: '待审核'
    },
    {
      id: 'ZY20260402005',
      cruiseName: '量子号',
      operationType: '靠港作业',
      applyTime: '2026-04-02 13:45:09',
      plannedOperationTime: '2026-04-03 16:00:00 至 2026-04-03 22:00:00',
      applicant: '孙七',
      status: '待审核'
    }
  ])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.audit-header', {
        duration: 0.6,
        opacity: 0,
        y: 20,
        ease: 'power2.out'
      })
      
      gsap.from('.filter-section', {
        duration: 0.6,
        opacity: 0,
        y: 30,
        ease: 'power2.out',
        delay: 0.2
      })
      
      gsap.from('.audit-table', {
        duration: 0.6,
        opacity: 0,
        y: 30,
        ease: 'power2.out',
        delay: 0.4
      })
    })
    
    return () => ctx.revert()
  }, [])

  const handleSearch = () => {
    // 这里可以添加搜索逻辑
    console.log('搜索参数:', filters)
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const getStatusClass = (status) => {
    switch(status) {
      case '待审核': return 'bg-yellow-100 text-yellow-800'
      case '已通过': return 'bg-green-100 text-green-800'
      case '已拒绝': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="mb-6 audit-header">
          <h1 className="text-2xl font-bold text-gray-800">邮轮作业审核</h1>
        </div>

        {/* 搜索筛选区域 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 filter-section">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">作业类型</label>
              <select
                value={filters.operationType}
                onChange={(e) => handleFilterChange('operationType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="全部类型">全部类型</option>
                <option value="靠港作业">靠港作业</option>
                <option value="离港作业">离港作业</option>
                <option value="补给作业">补给作业</option>
                <option value="维护作业">维护作业</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">邮轮公司</label>
              <select
                value={filters.cruiseCompany}
                onChange={(e) => handleFilterChange('cruiseCompany', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="全部公司">全部公司</option>
                <option value="皇家加勒比">皇家加勒比</option>
                <option value="歌诗达">歌诗达</option>
                <option value="地中海邮轮">地中海邮轮</option>
                <option value="星梦邮轮">星梦邮轮</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">审核状态</label>
              <select
                value={filters.auditStatus}
                onChange={(e) => handleFilterChange('auditStatus', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="全部状态">全部状态</option>
                <option value="待审核">待审核</option>
                <option value="已通过">已通过</option>
                <option value="已拒绝">已拒绝</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">申请日期范围</label>
              <input
                type="text"
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              搜索
            </button>
          </div>
        </div>

        {/* 作业审核列表 */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden audit-table">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">作业审核列表</h2>
              <button className="text-blue-500 hover:text-blue-600 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                导出
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    申请编号
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    邮轮名称
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    作业类型
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    申请时间
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    计划作业时间
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    申请人
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    审核状态
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href="#" className="text-blue-600 hover:text-blue-800">{item.id}</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.cruiseName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.operationType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.applyTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.plannedOperationTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.applicant}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <a href="#" className="text-blue-600 hover:text-blue-900 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          查看
                        </a>
                        <select className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">操作</option>
                          <option value="approve">通过</option>
                          <option value="reject">拒绝</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* 分页 */}
          <div className="p-6 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              显示 1 到 5 条，共 28 条记录
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
                上一页
              </button>
              <button className="px-3 py-2 border border-blue-500 bg-blue-500 text-white rounded-lg text-sm">
                1
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                4
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CruiseOperationAudit