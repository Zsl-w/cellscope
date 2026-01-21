import React from 'react'
import { Steps, Typography, Row, Col, Card } from 'antd'
import {
  UploadOutlined,
  SettingOutlined,
  BarChartOutlined,
  DownloadOutlined
} from '@ant-design/icons'

const { Title, Paragraph } = Typography

const steps = [
  {
    title: '上传数据',
    description: '上传您的单细胞数据文件',
    icon: <UploadOutlined />,
    details: '支持10x Genomics、H5AD、CSV等格式，最大支持500MB文件',
    color: '#0d9488'
  },
  {
    title: '选择分析',
    description: '选择需要的分析流程',
    icon: <SettingOutlined />,
    details: '包括质控、标准化、降维、聚类等完整分析流程',
    color: '#0ea5e9'
  },
  {
    title: '查看结果',
    description: '实时查看分析结果',
    icon: <BarChartOutlined />,
    details: '交互式可视化图表，支持缩放、筛选和导出',
    color: '#8b5cf6'
  },
  {
    title: '导出报告',
    description: '下载分析报告',
    icon: <DownloadOutlined />,
    details: '支持PNG、SVG图表和CSV数据导出',
    color: '#f97316'
  }
]

const WorkflowSection: React.FC = () => {
  return (
    <div style={{
      padding: '80px 20px',
      background: '#f8fafc',
      backgroundImage: 'linear-gradient(0deg, rgba(13, 148, 136, 0.02) 0%, transparent 100%)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={2} style={{ marginBottom: '20px', color: '#1e293b' }}>
            使用流程
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#475569', maxWidth: '600px', margin: '0 auto' }}>
            简单四步，完成单细胞数据分析
          </Paragraph>
        </div>

        <div style={{ marginBottom: '60px' }}>
          <Steps
            current={-1}
            items={steps.map((step) => ({
              title: step.title,
              description: step.description,
              icon: step.icon
            }))}
            direction="horizontal"
            responsive={false}
          />
        </div>

        <Row gutter={[32, 32]}>
          {steps.map((step, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card
                style={{
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: '12px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  borderTop: `3px solid ${step.color}`,
                  transition: 'all 0.3s ease',
                }}
                bodyStyle={{ padding: '24px' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${step.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: `${step.color}10`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '28px',
                  color: step.color,
                  border: `2px solid ${step.color}30`,
                }}>
                  {step.icon}
                </div>
                <Title level={4} style={{ marginBottom: '8px', color: '#1e293b' }}>
                  {step.title}
                </Title>
                <Paragraph style={{ color: '#475569', marginBottom: '12px' }}>
                  {step.description}
                </Paragraph>
                <Paragraph style={{ color: '#94a3b8', fontSize: '14px', marginBottom: 0 }}>
                  {step.details}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default WorkflowSection
