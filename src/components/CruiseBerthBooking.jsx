import { useState, useEffect } from 'react'
import gsap from 'gsap'

function CruiseBerthBooking() {
  const [bookingData, setBookingData] = useState({
    cruiseName: '',
    imoNumber: '',
    agent: '',
    arrivalDate: '',
    arrivalTime: '',
    departureDate: '',
    departureTime: '',
    berthNumber: '',
    requestType: 'normal',
    specialRequirements: ''
  })
  
  const [availableBerths, setAvailableBerths] = useState([
    { id: 'B01', name: '泊位1', status: 'available', size: '大型' },
    { id: 'B02', name: '泊位2', status: 'available', size: '中型' },
    { id: 'B03', name: '泊位3', status: 'occupied', size: '小型' },
    { id: 'B04', name: '泊位4', status: 'available', size: '大型' },
    { id: 'B05', name: '泊位5', status: 'maintenance', size: '中型' }
  ])
  
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  
  // 统计数据
  const statistics = {
    totalBerths: 10,
    occupiedBerths: 3,
    todayBookings: 2,
    pendingApprovals: 1
  }
  
  // 预定列表数据
  const [bookingList, setBookingList] = useState([
    {
      id: 'YB20260402001',
      cruiseName: '海洋量子号',
      imoNumber: '9606185',
      agent: '皇家加勒比邮轮代理',
      berthNumber: 'B01',
      arrivalTime: '2026-04-05 14:30',
      departureTime: '2026-04-07 10:00',
      requestType: '常规申请',
      status: '已确认',
      submitTime: '2026-04-02 08:30',
      handler: '管理员'
    },
    {
      id: 'YB20260402002',
      cruiseName: '诺唯真喜悦号',
      imoNumber: '9747990',
      agent: '诺唯真邮轮代理',
      berthNumber: 'B04',
      arrivalTime: '2026-04-10 09:00',
      departureTime: '2026-04-12 16:00',
      requestType: '常规申请',
      status: '处理中',
      submitTime: '2026-04-02 09:15',
      handler: '管理员'
    },
    {
      id: 'YB20260402003',
      cruiseName: '歌诗达威尼斯号',
      imoNumber: '9771505',
      agent: '歌诗达邮轮代理',
      berthNumber: 'B02',
      arrivalTime: '2026-04-01 11:00',
      departureTime: '2026-04-03 15:30',
      requestType: '紧急申请',
      status: '已取消',
      submitTime: '2026-03-30 14:20',
      handler: '管理员'
    }
  ])
  
  // 筛选条件
  const [filters, setFilters] = useState({
    cruiseName: '',
    berthNumber: '全部泊位',
    status: '全部状态',
    dateRange: ''
  })
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.booking-header', {
        duration: 0.6,
        opacity: 0,
        y: 20,
        ease: 'power2.out'
      })
      
      gsap.from('.statistics-cards', {
        duration: 0.6,
        opacity: 0,
        y: 30,
        ease: 'power2.out',
        delay: 0.2
      })
      
      gsap.from('.berth-status-section', {
        duration: 0.6,
        opacity: 0,
        y: 30,
        ease: 'power2.out',
        delay: 0.4
      })
      
      gsap.from('.booking-form-container', {
        duration: 0.6,
        opacity: 0,
        y: 30,
        ease: 'power2.out',
        delay: 0.6
      })
      
      gsap.from('.booking-history', {
        duration: 0.6,
        opacity: 0,
        y: 30,
        ease: 'power2.out',
        delay: 0.8
      })
    })
    
    return () => ctx.revert()
  }, [])
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // 模拟API调用
    setTimeout(() => {
      setSubmissionStatus('success')
      setIsSubmitting(false)
      
      // 重置表单
      setBookingData({
        cruiseName: '',
        imoNumber: '',
        agent: '',
        arrivalDate: '',
        arrivalTime: '',
        departureDate: '',
        departureTime: '',
        berthNumber: '',
        requestType: 'normal',
        specialRequirements: ''
      })
      
      // 更新泊位状态
      setAvailableBerths(prev => prev.map(berth => 
        berth.id === bookingData.berthNumber 
          ? { ...berth, status: 'occupied' }
          : berth
      ))
      
      // 3秒后清除状态
      setTimeout(() => {
        setSubmissionStatus(null)
      }, 3000)
    }, 1500)
  }
  
  const getBerthStatusClass = (status) => {
    switch(status) {
      case 'available': return 'bg-green-500'
      case 'occupied': return 'bg-red-500'
      case 'maintenance': return 'bg-yellow-500'
      default: return 'bg-gray-300'
    }
  }
  
  const getBerthStatusText = (status) => {
    switch(status) {
      case 'available': return '可用'
      case 'occupied': return '已占用'
      case 'maintenance': return '维护中'
      default: return '未知'
    }
  }
  
  // 筛选处理函数
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }
  
  const handleSearch = () => {
    // 这里可以添加搜索逻辑
    console.log('搜索参数:', filters)
  }
  
  // 获取状态样式
  const getStatusClass = (status) => {
    switch(status) {
      case '已确认': return 'bg-green-100 text-green-800'
      case '处理中': return 'bg-blue-100 text-blue-800'
      case '已取消': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      {/* 页面标题 */}
      <div className="mb-8 booking-header">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">邮轮泊位预定</h1>
        <p className="text-gray-600">填写以下表单进行邮轮泊位预定申请</p>
      </div>
      
      {/* 成功提示 */}
      {submissionStatus === 'success' && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>泊位预定申请已提交成功！</span>
          </div>
        </div>
      )}
      
      {/* 统计卡片组 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 statistics-cards">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">总泊位数</h3>
              <p className="text-2xl font-bold text-gray-800">{statistics.totalBerths}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">已占用</h3>
              <p className="text-2xl font-bold text-gray-800">{statistics.occupiedBerths}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">今日预定</h3>
              <p className="text-2xl font-bold text-gray-800">{statistics.todayBookings}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">待审核</h3>
              <p className="text-2xl font-bold text-gray-800">{statistics.pendingApprovals}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto">
        {/* 左侧：预定表单和泊位状态 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 泊位状态区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 berth-status-section">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">泊位状态</h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">选择日期：</span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            {/* 泊位图例 */}
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
                <span className="text-sm text-gray-600">可用</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"></div>
                <span className="text-sm text-gray-600">已占用</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-sm mr-2"></div>
                <span className="text-sm text-gray-600">维护中</span>
              </div>
            </div>
            
            {/* 泊位列表 */}
            <div className="space-y-4">
              {availableBerths.map((berth, index) => (
                <div key={berth.id} className="flex items-center">
                  <div className="w-16 text-sm font-medium text-gray-700">{berth.name}</div>
                  <div className="flex-1 ml-4">
                    <div className="h-10 rounded-lg flex items-center px-4" style={{ backgroundColor: getBerthStatusClass(berth.status) === 'bg-green-500' ? '#10B981' : getBerthStatusClass(berth.status) === 'bg-red-500' ? '#EF4444' : '#F59E0B' }}>
                      <span className="text-white text-sm">{getBerthStatusText(berth.status)}</span>
                    </div>
                  </div>
                  <div className="w-24 text-sm text-gray-600 text-right ml-4">{berth.size}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 预定表单 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 booking-form-container">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">预定信息</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    邮轮名称 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="cruiseName"
                    value={bookingData.cruiseName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    IMO号码 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="imoNumber"
                    value={bookingData.imoNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  代理公司 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="agent"
                  value={bookingData.agent}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    预计到达日期 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="arrivalDate"
                    value={bookingData.arrivalDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    预计到达时间 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="arrivalTime"
                    value={bookingData.arrivalTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    预计离开日期 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="departureDate"
                    value={bookingData.departureDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    预计离开时间 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="departureTime"
                    value={bookingData.departureTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  申请泊位 <span className="text-red-500">*</span>
                </label>
                <select
                  name="berthNumber"
                  value={bookingData.berthNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">请选择泊位</option>
                  {availableBerths
                    .filter(berth => berth.status === 'available')
                    .map(berth => (
                      <option key={berth.id} value={berth.id}>
                        {berth.name} ({berth.size})
                      </option>
                    ))
                  }
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  申请类型
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="requestType"
                      value="normal"
                      checked={bookingData.requestType === 'normal'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>常规申请</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="requestType"
                      value="urgent"
                      checked={bookingData.requestType === 'urgent'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>紧急申请</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  特殊要求
                </label>
                <textarea
                  name="specialRequirements"
                  value={bookingData.specialRequirements}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                ></textarea>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '提交中...' : '提交预定申请'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* 右侧：预定历史 */}
        <div className="booking-history flex flex-col">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">预定历史</h2>
            <div className="space-y-4 flex-1">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">海洋量子号</h3>
                    <p className="text-sm text-gray-600">IMO: 9606185</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">已确认</span>
                </div>
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <div>泊位: B01</div>
                  <div>到达: 2026-04-05 14:30</div>
                  <div>离开: 2026-04-07 10:00</div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">诺唯真喜悦号</h3>
                    <p className="text-sm text-gray-600">IMO: 9747990</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">处理中</span>
                </div>
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <div>泊位: B04</div>
                  <div>到达: 2026-04-10 09:00</div>
                  <div>离开: 2026-04-12 16:00</div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">歌诗达威尼斯号</h3>
                    <p className="text-sm text-gray-600">IMO: 9771505</p>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">已取消</span>
                </div>
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <div>泊位: B02</div>
                  <div>到达: 2026-04-01 11:00</div>
                  <div>离开: 2026-04-03 15:30</div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">地中海辉煌号</h3>
                    <p className="text-sm text-gray-600">IMO: 9384976</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">已确认</span>
                </div>
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <div>泊位: B03</div>
                  <div>到达: 2026-04-15 16:00</div>
                  <div>离开: 2026-04-17 12:30</div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">星梦邮轮世界梦号</h3>
                    <p className="text-sm text-gray-600">IMO: 9706381</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">处理中</span>
                </div>
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <div>泊位: B05</div>
                  <div>到达: 2026-04-20 10:30</div>
                  <div>离开: 2026-04-22 18:00</div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">皇家加勒比光谱号</h3>
                    <p className="text-sm text-gray-600">IMO: 9785432</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">已确认</span>
                </div>
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <div>泊位: B01</div>
                  <div>到达: 2026-04-25 13:00</div>
                  <div>离开: 2026-04-27 09:30</div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              查看全部历史
            </button>
          </div>
        </div>
      </div>
      
      {/* 预定列表表格 */}
      <div className="mt-8 booking-list-section">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">预定列表</h2>
          
          {/* 筛选区域 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">邮轮名称</label>
              <input
                type="text"
                value={filters.cruiseName}
                onChange={(e) => handleFilterChange('cruiseName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="请输入邮轮名称"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">泊位编号</label>
              <select
                value={filters.berthNumber}
                onChange={(e) => handleFilterChange('berthNumber', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="全部泊位">全部泊位</option>
                {availableBerths.map(berth => (
                  <option key={berth.id} value={berth.id}>
                    {berth.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="全部状态">全部状态</option>
                <option value="已确认">已确认</option>
                <option value="处理中">处理中</option>
                <option value="已取消">已取消</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">申请日期</label>
              <input
                type="text"
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="选择日期范围"
              />
            </div>
          </div>
          
          <div className="flex justify-end mb-6">
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              搜索
            </button>
          </div>
          
          {/* 表格 */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    预定编号
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    邮轮名称
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IMO号码
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    代理公司
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    泊位编号
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    到达时间
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    离开时间
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    申请类型
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    提交时间
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作人
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookingList.map((item, index) => (
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
                      <div className="text-sm text-gray-900">{item.imoNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.agent}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.berthNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.arrivalTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.departureTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.requestType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.submitTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.handler}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <a href="#" className="text-blue-600 hover:text-blue-900 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          查看
                        </a>
                        <a href="#" className="text-green-600 hover:text-green-900 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          编辑
                        </a>
                        <a href="#" className="text-red-600 hover:text-red-900 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          删除
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* 分页 */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              显示 1 到 3 条，共 12 条记录
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
                上一页
              </button>
              <button className="px-3 py-1 border border-blue-500 bg-blue-500 text-white rounded-md text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                4
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CruiseBerthBooking