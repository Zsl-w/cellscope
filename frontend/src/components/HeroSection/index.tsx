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
      background: `
        linear-gradient(180deg, rgba(248, 250, 252, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%),
        linear-gradient(90deg, rgba(13, 148, 136, 0.02) 1px, transparent 1px),
        linear-gradient(rgba(13, 148, 136, 0.02) 1px, transparent 1px)
      `,
      backgroundSize: '100% 100%, 50px 50px, 50px 50px',
      color: '#1e293b',
      minHeight: '500px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* 装饰性圆形 */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(13, 148, 136, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 10s ease-in-out infinite 2s',
      }} />

      <div style={{ maxWidth: '800px', position: 'relative', zIndex: 1 }}>
        <div style={{
          marginBottom: '20px',
        }}>
          <ExperimentOutlined style={{
            fontSize: '64px',
            background: 'linear-gradient(135deg, #0d9488 0%, #0ea5e9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }} />
        </div>
        <Title level={1} style={{
          color: '#1e293b',
          fontSize: '48px',
          marginBottom: '20px',
        }}>
          专业的单细胞数据分析平台
        </Title>
        <Paragraph style={{
          color: '#475569',
          fontSize: '20px',
          marginBottom: '40px',
          lineHeight: 1.8,
        }}>
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
              background: 'linear-gradient(135deg, #0d9488 0%, #0ea5e9 100%)',
              border: 'none',
              boxShadow: '0 2px 8px rgba(13, 148, 136, 0.2)',
              fontWeight: 600,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 148, 136, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(13, 148, 136, 0.2)';
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
              color: '#0d9488',
              border: '2px solid #0d9488',
              fontWeight: 600,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f5f9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
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
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          padding: '20px 30px',
          background: '#f1f5f9',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#0d9488' }}>10万+</div>
          <div style={{ fontSize: '16px', color: '#94a3b8', marginTop: '8px' }}>细胞数支持</div>
        </div>
        <div style={{
          padding: '20px 30px',
          background: '#f1f5f9',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#0ea5e9' }}>5分钟</div>
          <div style={{ fontSize: '16px', color: '#94a3b8', marginTop: '8px' }}>快速分析</div>
        </div>
        <div style={{
          padding: '20px 30px',
          background: '#f1f5f9',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#8b5cf6' }}>6+</div>
          <div style={{ fontSize: '16px', color: '#94a3b8', marginTop: '8px' }}>分析功能</div>
        </div>
      </div>

      {/* 动画样式 */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  )
}

export default HeroSection
