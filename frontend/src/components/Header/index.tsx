import React, { useState } from 'react'
import { Layout, Menu, Button, Drawer } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { ExperimentOutlined, FileTextOutlined, InfoCircleOutlined, MenuOutlined } from '@ant-design/icons'
import { useAuthStore } from '../../store/authStore'

const { Header: AntHeader } = Layout

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const menuItems = [
    {
      key: 'home',
      icon: <ExperimentOutlined />,
      label: <Link to="/">首页</Link>,
    },
    {
      key: 'features',
      icon: <FileTextOutlined />,
      label: <Link to="/features">功能</Link>,
    },
    {
      key: 'about',
      icon: <InfoCircleOutlined />,
      label: <Link to="/about">关于</Link>,
    },
  ]

  return (
    <AntHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 50px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ExperimentOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#1890ff' }} />
        <Link to="/" style={{ fontSize: '20px', fontWeight: 'bold', color: '#1890ff', textDecoration: 'none' }}>
          单细胞分析平台
        </Link>
      </div>

      <div className="desktop-menu" style={{ display: 'none' }}>
        <Menu
          mode="horizontal"
          items={menuItems}
          style={{ border: 'none', minWidth: '300px' }}
        />
      </div>

      <div className="auth-buttons" style={{ display: 'none' }}>
        {isAuthenticated ? (
          <>
            <Button type="link" onClick={() => navigate('/dashboard')}>
              控制台
            </Button>
            <Button type="primary" onClick={handleLogout}>
              退出
            </Button>
          </>
        ) : (
          <>
            <Button type="link" onClick={() => navigate('/login')}>
              登录
            </Button>
            <Button type="primary" onClick={() => navigate('/register')}>
              注册
            </Button>
          </>
        )}
      </div>

      <Button
        className="mobile-menu-button"
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setMobileMenuOpen(true)}
        style={{ display: 'block' }}
      />

      <Drawer
        title="菜单"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div style={{ marginTop: '20px' }}>
          {isAuthenticated ? (
            <>
              <Button block onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false) }}>
                控制台
              </Button>
              <Button block danger onClick={() => { handleLogout(); setMobileMenuOpen(false) }} style={{ marginTop: '10px' }}>
                退出
              </Button>
            </>
          ) : (
            <>
              <Button block onClick={() => { navigate('/login'); setMobileMenuOpen(false) }}>
                登录
              </Button>
              <Button block type="primary" onClick={() => { navigate('/register'); setMobileMenuOpen(false) }} style={{ marginTop: '10px' }}>
                注册
              </Button>
            </>
          )}
        </div>
      </Drawer>

      <style>{`
        @media (min-width: 768px) {
          .desktop-menu { display: block !important; }
          .auth-buttons { display: flex !important; gap: 10px; }
          .mobile-menu-button { display: none !important; }
        }
      `}</style>
    </AntHeader>
  )
}

export default Header
