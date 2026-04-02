import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import gsap from 'gsap'

// 修复 Leaflet 默认图标问题
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

// 自定义船舶图标
const createShipIcon = (status, isSelected = false, isBlinking = false) => {
  const colors = {
    '在港': '#22c55e',
    '锚地': '#eab308',
    '航行中': '#3b82f6',
    '计划到港': '#a855f7',
    '延误': '#ef4444'
  }
  const color = colors[status] || '#6b7280'
  const size = isSelected ? 32 : 24
  const animationClass = isBlinking ? 'ship-blinking' : ''
  
  return L.divIcon({
    className: `custom-ship-icon ${animationClass}`,
    html: `
      <div class="${animationClass}" style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg width="${size * 0.5}" height="${size * 0.5}" viewBox="0 0 24 24" fill="white" style="transform: rotate(45deg);">
          <path d="M12 2L2 22h20L12 2zm0 3.5L18.5 20h-13L12 5.5z"/>
        </svg>
      </div>
      ${isBlinking ? `
      <div style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: ${size * 2}px;
        height: ${size * 2}px;
        background: ${color}40;
        border-radius: 50%;
        animation: shipPulse 1.5s ease-out infinite;
        pointer-events: none;
      "></div>
      ` : ''}
    `,
    iconSize: [size * (isBlinking ? 2 : 1), size * (isBlinking ? 2 : 1)],
    iconAnchor: [size * (isBlinking ? 1 : 0.5), size * (isBlinking ? 1 : 0.5)],
    popupAnchor: [0, -size / 2]
  })
}

// 高德免 Key 瓦片图层组件
function AmapTileLayer() {
  const map = useMap()
  
  useEffect(() => {
    // 高德卫星图瓦片（免 Key）
    const amapSatellite = L.tileLayer(
      'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      {
        subdomains: ['1', '2', '3', '4'],
        attribution: '&copy; 高德地图'
      }
    )
    
    // 高德路网标注
    const amapRoad = L.tileLayer(
      'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      {
        subdomains: ['1', '2', '3', '4'],
        opacity: 0.7
      }
    )
    
    amapSatellite.addTo(map)
    amapRoad.addTo(map)
    
    return () => {
      map.removeLayer(amapSatellite)
      map.removeLayer(amapRoad)
    }
  }, [map])
  
  return null
}

// 蛇口邮轮母港坐标
const portCenter = [22.485, 113.915]

// 船舶数据（移到组件外部避免重复创建）
const shipData = [
    {
      id: 1,
      name: '海洋量子号',
      type: '邮轮',
      status: '航行中',
      position: '距离港口 12海里',
      berth: '-',
      arrivalTime: '预计 2026-04-02 14:00',
      departureTime: '2026-04-02 20:00',
      passengers: 4200,
      crew: 1500,
      mmsi: '412345678',
      callSign: 'BOSC',
      speed: '18.5节',
      course: '245°',
      nationality: '巴哈马',
      destination: '深圳蛇口',
      nextPort: '香港',
      lat: 22.52,
      lng: 113.95,
      delay: null
    },
    {
      id: 2,
      name: '光谱号',
      type: '邮轮',
      status: '在港',
      position: '泊位 A3',
      berth: 'A3',
      arrivalTime: '2026-04-02 08:30',
      departureTime: '预计 2026-04-02 18:30',
      passengers: 3800,
      crew: 1300,
      mmsi: '412345679',
      callSign: 'BOSD',
      speed: '0节',
      course: '-',
      nationality: '巴哈马',
      destination: '深圳蛇口',
      nextPort: '厦门',
      lat: 22.485,
      lng: 113.915,
      delay: null
    },
    {
      id: 3,
      name: '梦想号',
      type: '邮轮',
      status: '延误',
      position: '距离港口 25海里',
      berth: '-',
      arrivalTime: '预计 2026-04-02 18:30(延误2h)',
      departureTime: '-',
      passengers: 3500,
      crew: 1200,
      mmsi: '412345680',
      callSign: 'BOSE',
      speed: '12.3节',
      course: '220°',
      nationality: '巴拿马',
      destination: '深圳蛇口',
      nextPort: '三亚',
      lat: 22.55,
      lng: 113.98,
      delay: '2小时'
    },
    {
      id: 4,
      name: '荣耀号',
      type: '邮轮',
      status: '计划到港',
      position: '距离港口 45海里',
      berth: '-',
      arrivalTime: '预计 2026-04-03 08:00',
      departureTime: '-',
      passengers: 4000,
      crew: 1400,
      mmsi: '412345681',
      callSign: 'BOSF',
      speed: '15节',
      course: '060°',
      nationality: '马耳他',
      destination: '深圳蛇口',
      nextPort: '上海',
      lat: 22.65,
      lng: 114.05,
      delay: null
    },
    {
      id: 5,
      name: '招商伊敦号',
      type: '邮轮',
      status: '在港',
      position: '泊位 B2',
      berth: 'B2',
      arrivalTime: '2026-04-01 16:00',
      departureTime: '2026-04-03 18:00',
      passengers: 900,
      crew: 450,
      mmsi: '412345682',
      callSign: 'BOSG',
      speed: '0节',
      course: '-',
      nationality: '中国',
      destination: '深圳蛇口',
      nextPort: '舟山',
      lat: 22.48,
      lng: 113.91,
      delay: null
    },
    {
      id: 6,
      name: '蓝梦之歌号',
      type: '邮轮',
      status: '锚地',
      position: '锚地 3号',
      berth: '-',
      arrivalTime: '2026-04-02 10:15',
      departureTime: '预计 2026-04-02 22:30',
      passengers: 1200,
      crew: 500,
      mmsi: '412345683',
      callSign: 'BOSH',
      speed: '0节',
      course: '-',
      nationality: '中国',
      destination: '深圳蛇口',
      nextPort: '青岛',
      lat: 22.50,
      lng: 113.94,
      delay: null
    }
  ]

// 状态颜色函数（移到组件外部）
const getStatusColor = (status) => {
  switch(status) {
    case '在港': return 'bg-green-500'
    case '锚地': return 'bg-yellow-500'
    case '航行中': return 'bg-blue-500'
    case '计划到港': return 'bg-purple-500'
    case '延误': return 'bg-red-500'
    default: return 'bg-gray-500'
  }
}

const getStatusBgColor = (status) => {
  switch(status) {
    case '在港': return 'bg-green-50 border-green-200'
    case '锚地': return 'bg-yellow-50 border-yellow-200'
    case '航行中': return 'bg-blue-50 border-blue-200'
    case '计划到港': return 'bg-purple-50 border-purple-200'
    case '延误': return 'bg-red-50 border-red-200'
    default: return 'bg-gray-50 border-gray-200'
  }
}

const getStatusTextColor = (status) => {
  switch(status) {
    case '在港': return 'text-green-600 bg-green-100'
    case '锚地': return 'text-yellow-600 bg-yellow-100'
    case '航行中': return 'text-blue-600 bg-blue-100'
    case '计划到港': return 'text-purple-600 bg-purple-100'
    case '延误': return 'text-red-600 bg-red-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

function ShipTracker() {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const [activeTab, setActiveTab] = useState('全部')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedShip, setSelectedShip] = useState(null)
  const [blinkingShipId, setBlinkingShipId] = useState(null)
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 })
  
  const tabs = ['全部', '在港', '锚地', '航行中', '计划到港', '延误']
  
  const filteredShips = shipData.filter(ship => {
    const matchTab = activeTab === '全部' || ship.status === activeTab
    const matchSearch = ship.name.includes(searchKeyword) || ship.mmsi.includes(searchKeyword)
    return matchTab && matchSearch
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ship-tracker-header', {
        duration: 0.5,
        y: -20,
        opacity: 0,
        ease: 'power2.out'
      })
      
      gsap.from('.ship-tracker-content', {
        duration: 0.5,
        y: 20,
        opacity: 0,
        delay: 0.2,
        ease: 'power2.out'
      })
    }, containerRef)
    
    return () => ctx.revert()
  }, [])

  const handleShipClick = (ship, event) => {
    // 设置闪烁的船舶
    setBlinkingShipId(ship.id)
    
    // 如果地图已加载，平移到该船舶位置
    if (mapRef.current) {
      mapRef.current.flyTo([ship.lat, ship.lng], 14, {
        duration: 1
      })
    }
    
    // 3秒后停止闪烁
    setTimeout(() => {
      setBlinkingShipId(null)
    }, 3000)
  }

  const handleMarkerClick = (ship) => {
    setSelectedShip(ship)
    setBlinkingShipId(null)
  }

  const closeModal = () => {
    setSelectedShip(null)
  }

  return (
    <div ref={containerRef} className="h-full flex flex-col">
      {/* 页面标题 */}
      <div className="ship-tracker-header bg-white rounded-xl shadow-sm p-6 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">船讯网</h1>
            <p className="text-sm text-gray-500 mt-1">实时船舶动态监控与追踪</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">当前在港船舶</p>
              <p className="text-2xl font-bold text-blue-600">2 <span className="text-sm text-gray-400">艘</span></p>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-right">
              <p className="text-sm text-gray-500">今日到港</p>
              <p className="text-2xl font-bold text-green-600">3 <span className="text-sm text-gray-400">艘</span></p>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-right">
              <p className="text-sm text-gray-500">今日离港</p>
              <p className="text-2xl font-bold text-orange-600">2 <span className="text-sm text-gray-400">艘</span></p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 主内容区 */}
      <div className="ship-tracker-content flex-1 flex gap-4 min-h-0">
        {/* 左侧地图区域 */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">船舶位置监控</h2>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-gray-600">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>在港
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-600">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>锚地
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-600">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>航行中
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-600">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>计划到港
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-600">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>延误
              </span>
            </div>
          </div>
          
          {/* Leaflet 地图 */}
          <div className="flex-1 rounded-lg overflow-hidden min-h-[400px]">
            <MapContainer
              ref={mapRef}
              center={portCenter}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
              whenCreated={(map) => { mapRef.current = map }}
            >
              <AmapTileLayer />
              
              {/* 港口标记 */}
              <Marker position={portCenter}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-bold">蛇口邮轮母港</h3>
                    <p className="text-sm text-gray-600">22°29'N, 113°55'E</p>
                  </div>
                </Popup>
              </Marker>
              
              {/* 船舶标记 */}
              {filteredShips.map(ship => (
                <Marker
                  key={ship.id}
                  position={[ship.lat, ship.lng]}
                  icon={createShipIcon(ship.status, selectedShip?.id === ship.id, blinkingShipId === ship.id)}
                  eventHandlers={{
                    click: () => handleMarkerClick(ship)
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg">{ship.name}</h3>
                      <p className="text-sm text-gray-600">{ship.status}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
        
        {/* 右侧船舶列表 */}
        <div className="w-96 bg-white rounded-xl shadow-sm p-4 flex flex-col h-full">
          {/* 搜索和筛选 */}
          <div className="mb-4">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="搜索船名/MMSI"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* 标签页 */}
            <div className="flex flex-wrap gap-1">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          {/* 船舶列表 */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1" style={{ minHeight: '200px' }}>
            {filteredShips.length > 0 && filteredShips.map(ship => (
              <div
                key={ship.id}
                onClick={(e) => handleShipClick(ship, e)}
                className={`ship-card p-3 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${getStatusBgColor(ship.status)} ${blinkingShipId === ship.id ? 'ring-2 ring-blue-400' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${getStatusColor(ship.status)}`}></span>
                    <span className="font-semibold text-gray-800">{ship.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusTextColor(ship.status)}`}>
                    {ship.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span className="text-gray-400">MMSI:</span>
                    <span className="font-mono">{ship.mmsi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">类型:</span>
                    <span>{ship.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">呼号:</span>
                    <span>{ship.callSign}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">国籍:</span>
                    <span>{ship.nationality}</span>
                  </div>
                  {ship.berth !== '-' && (
                    <div className="flex justify-between col-span-2">
                      <span className="text-gray-400">泊位:</span>
                      <span>{ship.berth}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">航向:</span>
                    <span>{ship.course}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">航速:</span>
                    <span>{ship.speed}</span>
                  </div>
                </div>
                
                <div className="mt-2 pt-2 border-t border-gray-200/50">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">目的港:</span>
                    <span className="text-gray-700">{ship.destination}</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-400">
                      {ship.status === '在港' ? '预计离港:' : '预计到港:'}
                    </span>
                    <span className={`${ship.delay ? 'text-red-500' : 'text-blue-600'}`}>
                      {ship.status === '在港' ? ship.departureTime : ship.arrivalTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredShips.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p>暂无符合条件的船舶</p>
              </div>
            )}
          </div>
          
          {/* 查看全部链接 */}
          <div className="mt-3 pt-3 border-t border-gray-100 text-center">
            <button className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
              查看全部船舶 →
            </button>
          </div>
        </div>
      </div>
      
      {/* 船舶详情模态框 */}
      {selectedShip && (
        <>
          {/* 遮罩层 */}
          <div 
            className="fixed inset-0 bg-black/30 z-40"
            onClick={closeModal}
          ></div>
          
          {/* 模态框 */}
          <div 
            className="fixed z-50 bg-white rounded-xl shadow-2xl p-5 w-80"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* 关闭按钮 */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* 头部 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${getStatusColor(selectedShip.status)}`}></span>
                <h3 className="text-lg font-bold text-gray-800">{selectedShip.name}</h3>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusTextColor(selectedShip.status)}`}>
                {selectedShip.status}
              </span>
            </div>
            
            {/* 详细信息 */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-400 block text-xs">MMSI</span>
                  <span className="font-mono text-gray-700">{selectedShip.mmsi}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">类型</span>
                  <span className="text-gray-700">{selectedShip.type}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">呼号</span>
                  <span className="text-gray-700">{selectedShip.callSign}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">国籍</span>
                  <span className="text-gray-700">{selectedShip.nationality}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">航速</span>
                  <span className="text-gray-700">{selectedShip.speed}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">航向</span>
                  <span className="text-gray-700">{selectedShip.course}</span>
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">当前位置</span>
                  <span className="text-gray-700">{selectedShip.position}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">目的港</span>
                  <span className="text-gray-700">{selectedShip.destination}</span>
                </div>
                {selectedShip.nextPort && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">下一站</span>
                    <span className="text-gray-700">{selectedShip.nextPort}</span>
                  </div>
                )}
                {selectedShip.berth !== '-' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">泊位</span>
                    <span className="text-gray-700">{selectedShip.berth}</span>
                  </div>
                )}
              </div>
              
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    {selectedShip.status === '在港' ? '靠泊时间' : '到港时间'}
                  </span>
                  <span className={`${selectedShip.delay ? 'text-red-500' : 'text-blue-600'}`}>
                    {selectedShip.arrivalTime}
                  </span>
                </div>
                {selectedShip.departureTime !== '-' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      {selectedShip.status === '在港' ? '预计离港' : '预计离港'}
                    </span>
                    <span className="text-gray-700">{selectedShip.departureTime}</span>
                  </div>
                )}
              </div>
              
              <div className="pt-3 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">旅客人数</span>
                  <span className="text-gray-700">{selectedShip.passengers.toLocaleString()} 人</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-400">船员人数</span>
                  <span className="text-gray-700">{selectedShip.crew.toLocaleString()} 人</span>
                </div>
              </div>
              
              {selectedShip.delay && (
                <div className="p-2 bg-red-50 rounded-lg">
                  <p className="text-xs text-red-600">
                    <span className="font-semibold">延误提醒:</span> 该船舶预计延误 {selectedShip.delay}
                  </p>
                </div>
              )}
            </div>
            
            {/* 操作按钮 */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
              <button className="flex-1 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
                查看航迹
              </button>
              <button className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
                船舶档案
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ShipTracker
