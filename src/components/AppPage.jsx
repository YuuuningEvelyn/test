import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import CruiseOperationAudit from './CruiseOperationAudit'
import CruiseBerthBooking from './CruiseBerthBooking'
import FlightPlanAudit from './FlightPlanAudit'
import FlightChangeAudit from './FlightChangeAudit'
import FlightDynamics from './FlightDynamics'
import QuickAccess from './QuickAccess'
import PortThroughput from './PortThroughput'
import MyTasks from './MyTasks'
import Notifications from './Notifications'
import ShipSchedule from './ShipSchedule'
import ShipTracker from './ShipTracker'

const menuConfig = {
  port: [
    {
      name: '生产调度',
      subItems: [
        '邮轮作业审核', '邮轮泊位预定', '航班计划审核', '航班变更审核',
        '航班动态', '调度列表', '港口调度', '港口夜泊', '邮轮审核',
        '码头作业审核', '值班人员排班', '码头作业记录', '泊位预排',
        '移泊统计', '签到记录', '自动预排设置', '航班节点记录',
        '泊位占用记录', '邮轮作业报告'
      ]
    },
    {
      name: '运行监控',
      subItems: ['渡轮节点监控', '航班保障节点监控', '邮轮节点监控']
    },
    {
      name: '数据看板',
      subItems: [
        '船讯网', '运营动态', '维修效率统计', '设备设施状态统计',
        '蛇口停车数据平台', '航班延误情况统计', '航班动态',
        '航班数据分析', '旅客数据统计'
      ]
    },
    {
      name: '操作收费',
      subItems: ['收费标准设置', '账单审核']
    },
    {
      name: '资源管理',
      subItems: [
        '设备设施信息', '设备设施检查', '设备设施保养', '设备设施维修',
        '区域巡查', '施工巡查', '二维码管理', '人员档案',
        '责任人管理', '责任机构管理', '设备班组'
      ]
    },
    {
      name: '基础数据',
      subItems: ['预售查询设置', '港口管理', '渡轮', '邮轮']
    },
    {
      name: '权限管理',
      subItems: ['用户管理', '角色管理', '部门管理', '岗位管理']
    },
    {
      name: '系统设置',
      subItems: ['我的消息', '通知公告', '应用管理', '版本管理', '字典管理', '系统配置']
    },
    {
      name: '日志管理',
      subItems: ['操作日志', '登录日志']
    }
  ],
  ferry: [
    {
      name: '生产调度',
      subItems: ['航班计划管理', '航班变更管理', '航班动态', '航班变更记录', '港口调度']
    },
    {
      name: '码头作业申请',
      subItems: [
        '移泊申请', '排污申请', '加油申请', '危险作业申请',
        '船舶演习申请', '加水申请', '供电申请', '上船培训申请', '维修申请'
      ]
    },
    {
      name: '系统设置',
      subItems: ['用户管理', '我的消息']
    }
  ],
  cruise: [
    {
      name: '生产调度',
      subItems: [
        '邮轮泊位预订', '邮轮航班计划管理', '邮轮动态跟踪', '邮轮信息申请',
        '变更记录查询', '作业报告审核', '无航班作业申请'
      ]
    },
    {
      name: '系统设置',
      subItems: ['用户管理', '我的消息']
    }
  ]
}

const roleLabels = {
  port: '港口调度',
  ferry: '渡轮航司',
  cruise: '邮轮代理'
}

const roles = [
  { value: 'port', label: '港口调度' },
  { value: 'ferry', label: '渡轮航司' },
  { value: 'cruise', label: '邮轮代理' }
]

function AppPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentRole, setCurrentRole] = useState('port')
  const [expandedMenus, setExpandedMenus] = useState([0])
  const [activeItem, setActiveItem] = useState(null)
  const [expandedCards, setExpandedCards] = useState({})
  const [isRoleSelectOpen, setIsRoleSelectOpen] = useState(false)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [expandedCardIndex, setExpandedCardIndex] = useState(null)
  const [currentPage, setCurrentPage] = useState(null)
  
  const sidebarRef = useRef(null)
  const mainContentRef = useRef(null)
  const menuRefs = useRef([])
  const contentRef = useRef(null)
  const roleSelectRef = useRef(null)
  const cardRefs = useRef({})
  const gridRef = useRef(null)
  const placeholderContainerRef = useRef(null)

  useEffect(() => {
    const role = localStorage.getItem('currentRole') || 'port'
    setCurrentRole(role)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      
      tl.from(sidebarRef.current, {
        duration: 0.8,
        x: -300,
        opacity: 0,
        ease: 'power3.out'
      })
      .from(mainContentRef.current, {
        duration: 0.6,
        x: 50,
        opacity: 0,
        ease: 'power2.out'
      }, '-=0.4')
      .from(menuRefs.current, {
        duration: 0.4,
        x: -20,
        opacity: 0,
        stagger: 0.05,
        ease: 'power1.out'
      }, '-=0.3')
    }, sidebarRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleSelectRef.current && !roleSelectRef.current.contains(event.target)) {
        setIsRoleSelectOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (currentPage && placeholderContainerRef.current) {
      gsap.from(placeholderContainerRef.current, {
        duration: 0.4,
        opacity: 0,
        y: 20,
        ease: 'power2.out'
      })
    }
  }, [currentPage])

  const handleMenuClick = (index) => {
    setExpandedMenus(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [index]
    )
  }

  const handleCardItemClick = (menuIndex, itemIndex, itemName, menuName) => {
    const key = `${menuIndex}-${itemIndex}`
    setActiveItem(key)
    
    setExpandedMenus([menuIndex])
    
    gsap.to(menuRefs.current[menuIndex], {
      duration: 0.2,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(menuRefs.current[menuIndex], {
          duration: 0.2,
          backgroundColor: 'transparent',
          ease: 'power2.out'
        })
      }
    })

    // 直接设置页面，让 useEffect 处理动画
    setCurrentPage({ menuName, itemName })
  }

  const handleBackToHome = () => {
    // 直接返回首页并关闭所有展开的菜单
    setCurrentPage(null)
    setExpandedMenus([])
  }

  const toggleCardExpand = (index, event) => {
    if (event) {
      event.stopPropagation()
    }
    
    const isCurrentlyExpanded = expandedCardIndex === index
    
    if (isCurrentlyExpanded) {
      setExpandedCardIndex(null)
      setOverlayVisible(false)
    } else {
      setExpandedCardIndex(index)
      setOverlayVisible(true)
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && overlayVisible) {
      setExpandedCardIndex(null)
      setOverlayVisible(false)
    }
  }

  const handleRoleChange = (newRole) => {
    const tl = gsap.timeline()
    
    tl.to([sidebarRef.current, mainContentRef.current], {
      duration: 0.3,
      opacity: 0,
      y: -20,
      ease: 'power2.in',
      onComplete: () => {
        localStorage.setItem('currentRole', newRole)
        setCurrentRole(newRole)
        setExpandedMenus([0])
        setActiveItem(null)
        setExpandedCards({})
        setIsRoleSelectOpen(false)
      }
    })
    .fromTo([sidebarRef.current, mainContentRef.current], 
      {
        y: 30,
        opacity: 0
      },
      {
        duration: 0.4,
        y: 0,
        opacity: 1,
        ease: 'power3.out'
      }
    )
  }

  const toggleRoleSelect = () => {
    setIsRoleSelectOpen(prev => !prev)
  }

  const handleRoleOptionClick = (roleValue) => {
    handleRoleChange(roleValue)
  }

  const handleLogout = () => {
    gsap.to([sidebarRef.current, mainContentRef.current], {
      duration: 0.3,
      opacity: 0,
      scale: 0.95,
      ease: 'power2.in',
      onComplete: () => {
        localStorage.removeItem('currentRole')
        navigate('/')
      }
    })
  }

  const currentMenus = menuConfig[currentRole]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className="w-64 bg-white shadow-xl overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-500">FOS 系统</h1>
          <div className="mt-4" ref={roleSelectRef}>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              当前角色
            </label>
            <div className="relative">
              <button
                onClick={toggleRoleSelect}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer flex items-center justify-between"
              >
                <span>{roleLabels[currentRole]}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isRoleSelectOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isRoleSelectOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10">
                  {roles.map((role, index) => (
                    <button
                      key={role.value}
                      onClick={() => handleRoleOptionClick(role.value)}
                      className={`
                        w-full px-3 py-2 text-left text-sm transition-all duration-200
                        ${currentRole === role.value
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                      style={{
                        animation: `slideDown 0.3s ease-out ${index * 0.05}s both`
                      }}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {/* 首页选项 */}
          <div className="rounded-lg overflow-hidden">
            <button
              onClick={handleBackToHome}
              className={`
                w-full px-4 py-3 text-left font-medium transition-all duration-200
                flex items-center justify-between rounded-lg
                ${!currentPage ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}
              `}
            >
              <span>首页</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
          </div>

          {currentMenus.map((menu, index) => (
            <div 
              key={menu.name}
              ref={el => menuRefs.current[index] = el}
              className="rounded-lg overflow-hidden"
            >
              <button
                onClick={() => handleMenuClick(index)}
                className={`
                  w-full px-4 py-3 text-left font-medium transition-all duration-200
                  flex items-center justify-between rounded-lg
                  ${expandedMenus.includes(index)
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <span>{menu.name}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    expandedMenus.includes(index) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedMenus.includes(index) && (
                <div className="bg-gray-50 mt-1 rounded-lg overflow-hidden">
                  {menu.subItems.map((item, subIndex) => {
                    const key = `${index}-${subIndex}`
                    return (
                      <button
                        key={item}
                        onClick={() => handleCardItemClick(index, subIndex, item, menu.name)}
                        className={`
                          w-full px-6 py-2 text-sm text-left transition-colors duration-150
                          ${activeItem === key
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-200'
                          }
                        `}
                      >
                        {item}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            id="logout-btn"
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
          >
            退出登录
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div 
        ref={mainContentRef}
        className="flex-1 overflow-auto relative"
        onClick={handleOverlayClick}
      >
        {overlayVisible && (
          <div 
            className="absolute inset-0 bg-black bg-opacity-20 z-20 transition-opacity duration-300"
            style={{
              backdropFilter: 'blur(2px)'
            }}
          />
        )}
        
        <div className="relative z-10">
        {currentPage ? (
          <div 
            ref={placeholderContainerRef}
            className="p-8"
          >
            {currentPage.itemName === '邮轮作业审核' ? (
              <CruiseOperationAudit />
            ) : currentPage.itemName === '邮轮泊位预定' || currentPage.itemName === '邮轮泊位预订' ? (
              <CruiseBerthBooking />
            ) : currentPage.itemName === '航班计划审核' ? (
              <FlightPlanAudit />
            ) : currentPage.itemName === '航班变更审核' ? (
              <FlightChangeAudit />
            ) : currentPage.itemName === '航班动态' ? (
              <FlightDynamics />
            ) : currentPage.itemName === '船讯网' ? (
              <ShipTracker />
            ) : (
              <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <div className="mb-8">
                    <svg 
                      className="w-24 h-24 mx-auto text-blue-400"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                      />
                    </svg>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    {currentPage.itemName}
                  </h1>
                  
                  <p className="text-lg text-gray-600 mb-2">
                    所属模块：{currentPage.menuName}
                  </p>
                  
                  <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                    <p className="text-blue-700">
                      ✨ 这是一个占位页面
                    </p>
                    <p className="text-blue-600 text-sm mt-2">
                      该功能模块正在开发中，敬请期待...
                    </p>
                  </div>

                  <button
                    onClick={handleBackToHome}
                    className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    返回首页
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6">
            {/* 常用功能快速访问 */}
            <QuickAccess />

            {/* 主要内容区域 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 近7日港口吞吐量统计 */}
              <PortThroughput />
              
              {/* 我的待办任务 */}
              <MyTasks />
            </div>

            {/* 通知公告和今日船舶动态 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* 通知公告 */}
              <Notifications />
              
              {/* 今日船舶动态 */}
              <ShipSchedule />
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default AppPage
