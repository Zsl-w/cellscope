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
        background: '#f1f5f9',
        backgroundImage: 'radial-gradient(ellipse at center, rgba(13, 148, 136, 0.05) 0%, transparent 70%)',
        color: '#1e293b',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Title level={2} style={{ color: '#1e293b', marginBottom: '20px' }}>
            准备好开始分析了吗？
          </Title>
          <Paragraph style={{ color: '#475569', fontSize: '18px', marginBottom: '40px' }}>
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
              background: 'linear-gradient(135deg, #0d9488 0%, #0ea5e9 100%)',
              border: 'none',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(13, 148, 136, 0.2)'
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
          background: 'linear-gradient(135deg, #0d9488 0%, #0ea5e9 100%)',
          border: 'none',
          boxShadow: '0 2px 8px rgba(13, 148, 136, 0.2)'
        }}
      />
    </div>
  )
}

export default Home
