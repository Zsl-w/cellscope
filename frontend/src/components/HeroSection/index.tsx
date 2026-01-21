import React from 'react'
import { Button, Typography } from 'antd'
import { ExperimentOutlined, RightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography

const HeroSection: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div style={{
      padding: '100px 20px',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      minHeight: '500px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ maxWidth: '800px' }}>
        <ExperimentOutlined style={{ fontSize: '64px', marginBottom: '20px' }} />
        <Title level={1} style={{ color: '#fff', fontSize: '48px', marginBottom: '20px' }}>
          专业的单细胞数据分析平台
        </Title>
        <Paragraph style={{ color: '#fff', fontSize: '20px', marginBottom: '40px', opacity: 0.9 }}>
          快速、准确、易用的单细胞RNA测序数据分析工具
          <br />
          支持从数据上传到结果导出的完整分析流程
        </Paragraph>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            type="primary"
            size="large"
            icon={<RightOutlined />}
            onClick={() => navigate('/register')}
            style={{
              height: '50px',
              padding: '0 40px',
              fontSize: '18px',
              borderRadius: '25px',
              background: '#fff',
              color: '#667eea',
              border: 'none'
            }}
          >
            开始分析
          </Button>
          <Button
            size="large"
            onClick={() => navigate('/features')}
            style={{
              height: '50px',
              padding: '0 40px',
              fontSize: '18px',
              borderRadius: '25px',
              background: 'transparent',
              color: '#fff',
              border: '2px solid #fff'
            }}
          >
            了解更多
          </Button>
        </div>
      </div>

      <div style={{
        marginTop: '60px',
        display: 'flex',
        gap: '60px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <div>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>10万+</div>
          <div style={{ fontSize: '16px', opacity: 0.8 }}>细胞数支持</div>
        </div>
        <div>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>5分钟</div>
          <div style={{ fontSize: '16px', opacity: 0.8 }}>快速分析</div>
        </div>
        <div>
          <div style={{ fontSize: '36px', fontWeight: 'bold' }}>6+</div>
          <div style={{ fontSize: '16px', opacity: 0.8 }}>分析功能</div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
