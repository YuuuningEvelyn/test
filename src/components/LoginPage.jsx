import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

const roles = [
  { value: 'port', label: '港口调度' },
  { value: 'ferry', label: '渡轮航司' },
  { value: 'cruise', label: '邮轮代理' }
]

function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState('port')
  
  const containerRef = useRef(null)
  const loginBoxRef = useRef(null)
  const titleRef = useRef(null)
  const formRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      
      tl.from(containerRef.current, {
        duration: 1,
        backgroundColor: 'rgba(24, 144, 255, 0)',
        ease: 'power2.inOut'
      })
      .from(loginBoxRef.current, {
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        y: 50,
        ease: 'back.out(1.7)'
      }, '-=0.5')
      .from(titleRef.current, {
        duration: 0.6,
        y: -20,
        opacity: 0,
        ease: 'power3.out'
      }, '-=0.3')
      .from(formRefs.current, {
        duration: 0.5,
        x: -20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.2')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    localStorage.setItem('currentRole', selectedRole)
    localStorage.setItem('username', username)
    
    gsap.to(loginBoxRef.current, {
      duration: 0.3,
      scale: 0.95,
      ease: 'power2.in',
      onComplete: () => {
        navigate('/app')
      }
    })
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4"
    >
      <div 
        ref={loginBoxRef}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 
          ref={titleRef}
          className="text-3xl font-bold text-center text-blue-500 mb-8"
        >
          航班运行指挥系统 (FOS)
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div ref={el => formRefs.current[0] = el}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              用户名
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="请输入用户名"
            />
          </div>

          <div ref={el => formRefs.current[1] = el}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="请输入密码"
            />
          </div>

          <div ref={el => formRefs.current[2] = el}>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              角色
            </label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <label
                  key={role.value}
                  className={`
                    relative cursor-pointer rounded-lg p-3 text-center text-sm font-medium transition-all duration-200
                    ${selectedRole === role.value
                      ? 'bg-blue-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={selectedRole === role.value}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="sr-only"
                  />
                  {role.label}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
