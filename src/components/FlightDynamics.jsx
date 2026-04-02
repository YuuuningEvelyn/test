import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

// 泊位状态颜色配置
const berthStatusColors = {
  occupied: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e', dot: '#f59e0b' },   // 占用 - 黄色
  available: { bg: '#d1fae5', border: '#10b981', text: '#065f46', dot: '#10b981' },   // 空闲 - 绿色
  maintenance: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b', dot: '#ef4444' }, // 维修 - 红色
  reserved: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af', dot: '#3b82f6' },    // 预留 - 蓝色
}

// 模拟泊位数据
const initialBerthData = {
  A: [
    { id: 'A1', name: 'A1泊位', status: 'occupied', shipName: '招商伊敦号', time: '07:30-14:00', progress: 75 },
    { id: 'A2', name: 'A2泊位', status: 'available', shipName: null, time: null, progress: 0 },
    { id: 'A3', name: 'A3泊位', status: 'occupied', shipName: '蓝梦之歌号', time: '08:00-16:30', progress: 45 },
    { id: 'A4', name: 'A4泊位', status: 'maintenance', shipName: '设备检修中', time: '全天', progress: 0 },
    { id: 'A5', name: 'A5泊位', status: 'reserved', shipName: '爱达魔都号', time: '15:00-22:00', progress: 0 },
  ],
  B: [
    { id: 'B1', name: 'B1泊位', status: 'occupied', shipName: '地中海号', time: '06:30-13:00', progress: 90 },
    { id: 'B2', name: 'B2泊位', status: 'occupied', shipName: '荣耀号', time: '09:00-18:00', progress: 30 },
    { id: 'B3', name: 'B3泊位', status: 'available', shipName: null, time: null, progress: 0 },
    { id: 'B4', name: 'B4泊位', status: 'reserved', shipName: '光谱号', time: '14:00-20:30', progress: 0 },
    { id: 'B5', name: 'B5泊位', status: 'available', shipName: null, time: null, progress: 0 },
  ],
}

// 模拟待调度数据
const pendingSchedules = [
  { id: 1, shipName: '海洋光谱号', voyage: '2024040101', type: '邮轮', planTime: '14:30', status: '等待调度', priority: 'high' },
  { id: 2, shipName: '爱达魔都号', voyage: '2024040102', type: '邮轮', planTime: '15:00', status: '等待调度', priority: 'normal' },
  { id: 3, shipName: '招商伊敦号', voyage: '2024040103', type: '邮轮', planTime: '16:00', status: '等待调度', priority: 'normal' },
  { id: 4, shipName: '蓝梦之歌号', voyage: '2024040104', type: '邮轮', planTime: '17:30', status: '等待调度', priority: 'low' },
]

// 模拟已调度数据
const completedSchedules = [
  { id: 101, shipName: '地中海号', voyage: '2024040001', type: '邮轮', berth: 'B1', planTime: '06:30', actualTime: '06:25', status: '已靠泊' },
  { id: 102, shipName: '荣耀号', voyage: '2024040002', type: '邮轮', berth: 'B2', planTime: '09:00', actualTime: '09:05', status: '作业中' },
  { id: 103, shipName: '招商伊敦号', voyage: '2024040003', type: '邮轮', berth: 'A1', planTime: '07:30', actualTime: '07:28', status: '作业中' },
  { id: 104, shipName: '蓝梦之歌号', voyage: '2024040004', type: '邮轮', berth: 'A3', planTime: '08:00', actualTime: '08:10', status: '作业中' },
]

// 状态标签映射
const statusLabels = {
  occupied: '占用中',
  available: '空闲',
  maintenance: '维修中',
  reserved: '已预留',
}

const priorityLabels = {
  high: { text: '高', color: '#ef4444', bg: '#fee2e2' },
  normal: { text: '中', color: '#f59e0b', bg: '#fef3c7' },
  low: { text: '低', color: '#10b981', bg: '#d1fae5' },
}

export default function FlightDynamics() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [berthData] = useState(initialBerthData)
  const [activeTab, setActiveTab] = useState('pending')
  const [selectedBerth, setSelectedBerth] = useState(null)
  
  const headerRef = useRef(null)
  const berthRef = useRef(null)
  const scheduleRef = useRef(null)

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // 入场动画
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      
      tl.from(headerRef.current, {
        duration: 0.5,
        y: -30,
        opacity: 0,
        ease: 'power3.out'
      })
      .from(berthRef.current, {
        duration: 0.5,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
      }, '-=0.3')
      .from(scheduleRef.current, {
        duration: 0.5,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
      }, '-=0.3')
    })

    return () => ctx.revert()
  }, [])

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const weekDay = weekDays[date.getDay()]
    return `${year}年${month}月${day}日 ${weekDay}`
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('zh-CN', { hour12: false })
  }

  const renderBerthCard = (berth) => {
    const colors = berthStatusColors[berth.status]
    
    return (
      <div
        key={berth.id}
        onClick={() => setSelectedBerth(berth.id === selectedBerth ? null : berth.id)}
        className="relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        style={{
          backgroundColor: colors.bg,
          border: `2px solid ${colors.border}`,
        }}
      >
        {/* 泊位头部 */}
        <div 
          className="px-4 py-3 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${colors.border}30` }}
        >
          <div className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors.dot }}
            />
            <span className="font-bold text-lg" style={{ color: colors.text }}>
              {berth.name}
            </span>
          </div>
          <span 
            className="text-xs px-2 py-1 rounded-full font-medium"
            style={{ 
              backgroundColor: colors.border + '30',
              color: colors.text 
            }}
          >
            {statusLabels[berth.status]}
          </span>
        </div>
        
        {/* 泊位内容 */}
        <div className="p-4">
          {berth.shipName ? (
            <>
              <div className="font-semibold text-gray-800 mb-2 text-lg">
                {berth.shipName}
              </div>
              <div className="text-sm text-gray-600 mb-3">
                计划时间: {berth.time}
              </div>
              {berth.progress > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>作业进度</span>
                    <span>{berth.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${berth.progress}%`,
                        backgroundColor: colors.border 
                      }}
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="h-20 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <svg className="w-10 h-10 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">泊位空闲</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderScheduleItem = (item, type) => {
    const isPending = type === 'pending'
    const priority = isPending ? priorityLabels[item.priority] : null
    
    return (
      <div
        key={item.id}
        className="bg-white rounded-xl p-4 mb-3 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-800">{item.shipName}</div>
              <div className="text-xs text-gray-500">航次: {item.voyage}</div>
            </div>
          </div>
          {isPending && priority && (
            <span 
              className="text-xs px-2 py-1 rounded-full font-medium"
              style={{ backgroundColor: priority.bg, color: priority.color }}
            >
              {priority.text}优先级
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">类型:</span>
            <span className="ml-2 text-gray-700">{item.type}</span>
          </div>
          <div>
            <span className="text-gray-500">计划时间:</span>
            <span className="ml-2 text-gray-700 font-medium">{item.planTime}</span>
          </div>
          {!isPending && (
            <div>
              <span className="text-gray-500">实际时间:</span>
              <span className="ml-2 text-gray-700">{item.actualTime}</span>
            </div>
          )}
          {isPending && (
            <div>
              <span className="text-gray-500">状态:</span>
              <span className="ml-2 text-amber-600 font-medium">{item.status}</span>
            </div>
          )}
          {!isPending && (
            <div>
              <span className="text-gray-500">泊位:</span>
              <span className="ml-2 text-blue-600 font-medium">{item.berth}</span>
            </div>
          )}
          {!isPending && (
            <div>
              <span className="text-gray-500">状态:</span>
              <span className="ml-2 text-green-600 font-medium">{item.status}</span>
            </div>
          )}
        </div>
        
        {isPending && (
          <div className="mt-4 flex gap-2">
            <button className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
              安排泊位
            </button>
            <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors">
              详情
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 页面头部 */}
      <div ref={headerRef} className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">航班动态</h1>
            <p className="text-gray-500 mt-1">实时查看泊位状态与航班调度情况</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">
              {formatTime(currentTime)}
            </div>
            <div className="text-gray-500">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>
      </div>

      {/* 泊位状态区域 */}
      <div ref={berthRef} className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        {/* 区域标题 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">泊位状态</h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: berthStatusColors.occupied.dot }} />
              <span className="text-sm text-gray-600">占用中 (4)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: berthStatusColors.available.dot }} />
              <span className="text-sm text-gray-600">空闲 (3)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: berthStatusColors.maintenance.dot }} />
              <span className="text-sm text-gray-600">维修中 (1)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: berthStatusColors.reserved.dot }} />
              <span className="text-sm text-gray-600">已预留 (2)</span>
            </div>
          </div>
        </div>

        {/* A区泊位 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-500 rounded-full" />
            A区泊位
          </h3>
          <div className="grid grid-cols-5 gap-4">
            {berthData.A.map(renderBerthCard)}
          </div>
        </div>

        {/* B区泊位 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-green-500 rounded-full" />
            B区泊位
          </h3>
          <div className="grid grid-cols-5 gap-4">
            {berthData.B.map(renderBerthCard)}
          </div>
        </div>
      </div>

      {/* 调度操作区域 */}
      <div ref={scheduleRef} className="bg-white rounded-2xl shadow-sm p-6">
        {/* 标签切换 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'pending'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              待调度列表
              <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs">
                {pendingSchedules.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'completed'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              已调度列表
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                {completedSchedules.length}
              </span>
            </button>
          </div>
          
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            新增调度
          </button>
        </div>

        {/* 列表内容 */}
        <div className="grid grid-cols-2 gap-6">
          {/* 左侧列表 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {activeTab === 'pending' ? '待调度航班' : '已调度航班'}
            </h3>
            <div className="max-h-[500px] overflow-y-auto pr-2">
              {activeTab === 'pending' 
                ? pendingSchedules.map(item => renderScheduleItem(item, 'pending'))
                : completedSchedules.map(item => renderScheduleItem(item, 'completed'))
              }
            </div>
          </div>

          {/* 右侧详情/统计 */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">今日统计</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-1">8</div>
                <div className="text-sm text-gray-500">今日总航班</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-3xl font-bold text-green-600 mb-1">4</div>
                <div className="text-sm text-gray-500">已完成作业</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-3xl font-bold text-amber-600 mb-1">4</div>
                <div className="text-sm text-gray-500">作业进行中</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-3xl font-bold text-purple-600 mb-1">95%</div>
                <div className="text-sm text-gray-500">准点率</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h4 className="font-semibold text-gray-700 mb-3">泊位使用率</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">A区泊位</span>
                    <span className="text-gray-800 font-medium">60%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-[60%] bg-blue-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">B区泊位</span>
                    <span className="text-gray-800 font-medium">40%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-[40%] bg-green-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
