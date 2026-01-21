import React from 'react'
import { Button, Typography } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import HeroSection from '../../components/HeroSection'
import FeaturesSection from '../../components/FeaturesSection'
import WorkflowSection from '../../components/WorkflowSection'
import FileFormatsSection from '../../components/FileFormatsSection'

const { Title, Paragraph } = Typography

const Home: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <FileFormatsSection />

      <div style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Title level={2} style={{ color: '#fff', marginBottom: '20px' }}>
            准备好开始分析了吗？
          </Title>
          <Paragraph style={{ color: '#fff', fontSize: '18px', marginBottom: '40px', opacity: 0.9 }}>
            立即注册，免费体验专业的单细胞数据分析服务
          </Paragraph>
          <Button
            type="primary"
            size="large"
            style={{
              height: '50px',
              padding: '0 60px',
              fontSize: '18px',
              borderRadius: '25px',
              background: '#fff',
              color: '#667eea',
              border: 'none',
              fontWeight: 'bold'
            }}
            onClick={() => window.location.href = '/register'}
          >
            免费开始
          </Button>
        </div>
      </div>

      <Button
        type="primary"
        shape="circle"
        icon={<ArrowUpOutlined />}
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '30px',
          width: '50px',
          height: '50px',
          fontSize: '20px',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
      />
    </div>
  )
}

export default Home
