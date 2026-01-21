import React, { useState } from 'react'
import { Layout, Menu, Button, Drawer, Dropdown, Avatar, Space, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import {
  ExperimentOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useAuthStore } from '../../store/authStore'

const { Header: AntHeader } = Layout
const { Text } = Typography

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, logout, user } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const userMenuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '控制台',
      onClick: () => navigate('/dashboard'),
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
      onClick: () => navigate('/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
      danger: true,
    },
  ]

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
    <AntHeader style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 50px',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ExperimentOutlined style={{
          fontSize: '24px',
          marginRight: '10px',
          color: '#0d9488',
        }} />
        <Link to="/" style={{
          fontSize: '20px',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #0d9488 0%, #0ea5e9 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textDecoration: 'none'
        }}>
          单细胞分析平台
        </Link>
      </div>

      <div className="desktop-menu" style={{ display: 'none' }}>
        <Menu
          mode="horizontal"
          items={menuItems}
          style={{ border: 'none', minWidth: '300px', backgroundColor: 'transparent' }}
        />
      </div>

      <div className="auth-buttons" style={{ display: 'none', alignItems: 'center' }}>
        {isAuthenticated && user ? (
          <Dropdown
            menu={{ items: userMenuItems as any }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Button
              type="text"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: '20px',
                transition: 'all 0.3s ease',
              }}
              className="hover-glow"
            >
              <Avatar
                size="small"
                icon={<UserOutlined />}
                style={{
                  background: 'linear-gradient(135deg, #0d9488 0%, #0ea5e9 100%)',
                }}
              />
              <Space size={4}>
                <Text style={{ color: '#475569', fontWeight: 500 }}>
                  {user.username}
                </Text>
              </Space>
            </Button>
          </Dropdown>
        ) : (
          <Space size={8}>
            <Button
              type="text"
              onClick={() => navigate('/login')}
              style={{
                color: '#475569',
                fontWeight: 500,
                transition: 'all 0.3s ease',
              }}
              className="hover-glow"
            >
              登录
            </Button>
            <Button
              type="primary"
              onClick={() => navigate('/register')}
              style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #0ea5e9 100%)',
                border: 'none',
                boxShadow: '0 2px 8px rgba(13, 148, 136, 0.2)',
                fontWeight: 500,
                transition: 'all 0.3s ease',
              }}
              className="hover-lift"
            >
              注册
            </Button>
          </Space>
        )}
      </div>

      <Button
        className="mobile-menu-button"
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setMobileMenuOpen(true)}
        style={{ display: 'block', color: '#475569' }}
      />

      <Drawer
        title="菜单"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        styles={{
          body: { background: '#f8fafc' },
          header: { background: '#ffffff', color: '#1e293b', borderBottom: '1px solid #e2e8f0' },
        }}
        style={{ background: '#f8fafc' }}
      >
        {isAuthenticated && user && (
          <div
            style={{
              background: 'linear-gradient(135deg, #0d9488 0%, #0ea5e9 100%)',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '16px',
              color: 'white',
            }}
          >
            <Space size={12} align="center">
              <Avatar size={48} icon={<UserOutlined />} style={{ background: 'rgba(255, 255, 255, 0.2)' }} />
              <div>
                <Text style={{ color: 'white', fontWeight: 600, display: 'block' }}>
                  {user.username}
                </Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px', display: 'block' }}>
                  {user.email}
                </Text>
              </div>
            </Space>
          </div>
        )}

        <Menu
          mode="vertical"
          items={menuItems}
          onClick={() => setMobileMenuOpen(false)}
          style={{ background: 'transparent', marginBottom: '16px' }}
        />

        {isAuthenticated && user ? (
          <>
            <Button
              block
              icon={<DashboardOutlined />}
              onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false) }}
              style={{
                background: 'transparent',
                color: '#475569',
                border: '1px solid #e2e8f0',
                marginBottom: '8px',
              }}
            >
              控制台
            </Button>
            <Button
              block
              danger
              icon={<LogoutOutlined />}
              onClick={() => { handleLogout(); setMobileMenuOpen(false) }}
              style={{ marginBottom: '8px' }}
            >
              退出登录
            </Button>
          </>
        ) : (
          <>
            <Button
              block
              onClick={() => { navigate('/login'); setMobileMenuOpen(false) }}
              style={{
                background: 'transparent',
                color: '#475569',
                border: '1px solid #e2e8f0',
                marginBottom: '8px',
              }}
            >
              登录
            </Button>
            <Button
              block
              type="primary"
              onClick={() => { navigate('/register'); setMobileMenuOpen(false) }}
              style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #0ea5e9 100%)',
                border: 'none',
                marginBottom: '8px',
              }}
            >
              注册
            </Button>
          </>
        )}
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
