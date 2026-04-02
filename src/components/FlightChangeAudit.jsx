import { useState, useEffect } from 'react'
import gsap from 'gsap'

function FlightChangeAudit() {
  // 筛选条件状态
  const [filters, setFilters] = useState({
    changeType: '全部类型',
    route: '全部航线',
    cruiseCompany: '全部公司',
    status: '全部状态',
    dateRange: ''
  })

  // 统计数据
  const statistics = {
    pendingAudit: 12,
    pendingTrend: '+8%',
    todayChange: 8,
    todayTrend: '+3%',
    approved: 89,
    rejected: 7,
    rejectRate: '7.3%'
  }

  // 表格数据
  const [tableData] = useState([
    {
      id: 'FC20260402001',
      cruiseName: '海洋量子号',
      changeType: '时间变更',
      originalTime: '2026-04-02 14:30',
      newTime: '2026-04-02 16:00',
      route: '香港-蛇口',
      cruiseCompany: '皇家加勒比',
      applicant: '张三',
      applyTime: '2026-04-01 10:30',
      status: '待审核'
    },
    {
      id: 'FC20260402002',
      cruiseName: '光谱号',
      changeType: '航线变更',
      originalTime: '2026-04-02 16:00',
      newTime: '2026-04-02 18:00',
      route: '蛇口-澳门',
      cruiseCompany: '皇家加勒比',
      applicant: '李四',
      applyTime: '2026-04-01 09:15',
      status: '待审核'
    },
    {
      id: 'FC20260402003',
      cruiseName: '威尼斯号',
      changeType: '泊位变更',
      originalTime: '2026-04-02 09:00',
      newTime: '2026-04-02 11:00',
      route: '深圳-蛇口',
      cruiseCompany: '歌诗达',
      applicant: '王五',
      applyTime: '2026-04-01 14:20',
      status: '已通过'
    },
    {
      id: 'FC20260402004',
      cruiseName: '荣耀号',
      changeType: '时间变更',
      originalTime: '2026-04-02 20:00',
      newTime: '2026-04-02 22:00',
      route: '蛇口-香港',
      cruiseCompany: '地中海邮轮',
      applicant: '赵六',
      applyTime: '2026-04-01 16:45',
      status: '已驳回'
    },
    {
      id: 'FC20260402005',
      cruiseName: '探索梦号',
      changeType: '航线变更',
      originalTime: '2026-04-03 08:00',
      newTime: '2026-04-03 10:00',
      route: '珠海-蛇口',
      cruiseCompany: '星梦邮轮',
      applicant: '孙七',
      applyTime: '2026-04-01 11:30',
      status: '待审核'
    }
  ])

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const totalItems = 68

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.audit-header', {
        duration: 0.6,
        opacity: 0,
        y: 20,
        ease: 'power2.out'
      })

      gsap.from('.stat-card', {
        duration: 0.6,
        opacity: 0,
        y: 30,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.2
      })

      gsap.from('.filter-section', {
        duration: 0.6,
        opacity: 0,
        y: 30,
        ease: 'power2.out',
        delay: 0.4
      })

      gsap.from('.data-table', {
        duration: 0.6,
        opacity: 0,
        y: 30,
        ease: 'power2.out',
        delay: 0.6
      })
    })

    return () => ctx.revert()
  }, [])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSearch = () => {
    console.log('搜索参数:', filters)
  }

  const handleReset = () => {
    setFilters({
      changeType: '全部类型',
      route: '全部航线',
      cruiseCompany: '全部公司',
      status: '全部状态',
      dateRange: ''
    })
  }

  const getStatusClass = (status) => {
    switch (status) {
      case '待审核': return 'bg-yellow-100 text-yellow-800'
      case '已通过': return 'bg-green-100 text-green-800'
      case '已驳回': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusDot = (status) => {
    switch (status) {
      case '待审核': return 'bg-yellow-500'
      case '已通过': return 'bg-green-500'
      case '已驳回': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getChangeTypeClass = (type) => {
    switch (type) {
      case '时间变更': return 'bg-purple-100 text-purple-800'
      case '航线变更': return 'bg-blue-100 text-blue-800'
      case '泊位变更': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const totalPages = Math.ceil(totalItems / pageSize)

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="mb-6 audit-header">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">航班变更审核</h1>
          <p className="text-gray-500">当前角色：港口调度</p>
        </div>

        {/* 统计卡片组 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* 待审核变更卡片 */}
          <div className="stat-card bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">待审核变更</span>
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{statistics.pendingAudit}</div>
            <div className="flex items-center text-red-500 text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>较昨日 {statistics.pendingTrend}</span>
            </div>
          </div>

          {/* 今日变更申请卡片 */}
          <div className="stat-card bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">今日变更申请</span>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{statistics.todayChange}</div>
            <div className="flex items-center text-green-500 text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>较昨日 {statistics.todayTrend}</span>
            </div>
          </div>

          {/* 已通过变更卡片 */}
          <div className="stat-card bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">已通过变更</span>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{statistics.approved}</div>
            <div className="flex items-center text-gray-500 text-sm">
              <span>本月累计</span>
            </div>
          </div>

          {/* 已驳回变更卡片 */}
          <div className="stat-card bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">已驳回变更</span>
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{statistics.rejected}</div>
            <div className="flex items-center text-gray-500 text-sm">
              <span>驳回率 {statistics.rejectRate}</span>
            </div>
          </div>
        </div>

        {/* 筛选区域 */}
        <div className="filter-section bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">变更类型</label>
              <div className="relative">
                <select
                  value={filters.changeType}
                  onChange={(e) => handleFilterChange('changeType', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white text-gray-700"
                >
                  <option value="全部类型">全部类型</option>
                  <option value="时间变更">时间变更</option>
                  <option value="航线变更">航线变更</option>
                  <option value="泊位变更">泊位变更</option>
                </select>
                <svg className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">航线</label>
              <div className="relative">
                <select
                  value={filters.route}
                  onChange={(e) => handleFilterChange('route', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white text-gray-700"
                >
                  <option value="全部航线">全部航线</option>
                  <option value="香港-蛇口">香港-蛇口</option>
                  <option value="蛇口-澳门">蛇口-澳门</option>
                  <option value="深圳-蛇口">深圳-蛇口</option>
                  <option value="蛇口-香港">蛇口-香港</option>
                  <option value="珠海-蛇口">珠海-蛇口</option>
                </select>
                <svg className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">邮轮公司</label>
              <div className="relative">
                <select
                  value={filters.cruiseCompany}
                  onChange={(e) => handleFilterChange('cruiseCompany', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white text-gray-700"
                >
                  <option value="全部公司">全部公司</option>
                  <option value="皇家加勒比">皇家加勒比</option>
                  <option value="歌诗达">歌诗达</option>
                  <option value="地中海邮轮">地中海邮轮</option>
                  <option value="星梦邮轮">星梦邮轮</option>
                </select>
                <svg className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">审核状态</label>
              <div className="relative">
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white text-gray-700"
                >
                  <option value="全部状态">全部状态</option>
                  <option value="待审核">待审核</option>
                  <option value="已通过">已通过</option>
                  <option value="已驳回">已驳回</option>
                </select>
                <svg className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">申请日期</label>
              <input
                type="date"
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-700"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              重置
            </button>
            <button
              onClick={handleSearch}
              className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
            >
              查询
            </button>
          </div>
        </div>

        {/* 数据表格 */}
        <div className="data-table bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">航班变更列表</h2>
            <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              导出
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">变更编号</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮轮名称</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">变更类型</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">原时间</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">变更后时间</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">航线</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮轮公司</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">申请人</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">申请时间</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.cruiseName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getChangeTypeClass(item.changeType)}`}>
                        {item.changeType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.originalTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{item.newTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.route}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.cruiseCompany}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.applicant}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.applyTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(item.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getStatusDot(item.status)}`}></span>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">查看</button>
                        {item.status === '待审核' && (
                          <>
                            <span className="text-gray-300">|</span>
                            <button className="text-green-600 hover:text-green-800 font-medium">通过</button>
                            <span className="text-gray-300">|</span>
                            <button className="text-red-600 hover:text-red-800 font-medium">驳回</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页 */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              显示 {(currentPage - 1) * pageSize + 1} 到 {Math.min(currentPage * pageSize, totalItems)} 条，共 {totalItems} 条
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                上一页
              </button>
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = i + 1
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-blue-500 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              {totalPages > 5 && (
                <>
                  <span className="text-gray-400">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === totalPages
                        ? 'bg-blue-500 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightChangeAudit
