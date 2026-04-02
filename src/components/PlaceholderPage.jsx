import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function PlaceholderPage() {
  const { menuName, itemName } = useParams()
  const navigate = useNavigate()
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        duration: 0.5,
        opacity: 0,
        y: 20,
        ease: 'power2.out'
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const decodedMenuName = menuName ? decodeURIComponent(menuName) : '菜单'
  const decodedItemName = itemName ? decodeURIComponent(itemName) : '页面'

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-auto bg-gray-50 p-8"
    >
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
            {decodedItemName}
          </h1>
          
          <p className="text-lg text-gray-600 mb-2">
            所属模块：{decodedMenuName}
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
            onClick={() => navigate('/app')}
            className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlaceholderPage
