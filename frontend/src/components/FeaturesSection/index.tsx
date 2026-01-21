import React from 'react'
import { Card, Row, Col, Typography } from 'antd'
import {
  UploadOutlined,
  FilterOutlined,
  BarChartOutlined,
  ClusterOutlined,
  PictureOutlined,
  DownloadOutlined
} from '@ant-design/icons'

const { Title, Paragraph } = Typography

const features = [
  {
    icon: <UploadOutlined style={{ fontSize: '32px', color: '#0d9488' }} />,
    title: '数据上传',
    description: '支持10x Genomics、H5AD、CSV等多种格式，快速上传您的单细胞数据'
  },
  {
    icon: <FilterOutlined style={{ fontSize: '32px', color: '#0ea5e9' }} />,
    title: '数据质控',
    description: '自动计算质控指标，智能过滤低质量细胞和基因，确保数据质量'
  },
  {
    icon: <BarChartOutlined style={{ fontSize: '32px', color: '#8b5cf6' }} />,
    title: '标准化处理',
    description: '多种标准化方法，识别高变基因，为后续分析做好准备'
  },
  {
    icon: <PictureOutlined style={{ fontSize: '32px', color: '#f97316' }} />,
    title: '降维分析',
    description: 'PCA、UMAP、t-SNE等降维方法，可视化高维数据结构'
  },
  {
    icon: <ClusterOutlined style={{ fontSize: '32px', color: '#06b6d4' }} />,
    title: '聚类分析',
    description: 'Louvain、Leiden等聚类算法，自动识别细胞亚群'
  },
  {
    icon: <DownloadOutlined style={{ fontSize: '32px', color: '#7c3aed' }} />,
    title: '结果导出',
    description: '支持图表和数据导出，生成专业的分析报告'
  }
]

const FeaturesSection: React.FC = () => {
  return (
    <div style={{
      padding: '80px 20px',
      background: '#ffffff',
      backgroundImage: 'linear-gradient(180deg, rgba(13, 148, 136, 0.02) 0%, transparent 100%)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={2} style={{ marginBottom: '20px', color: '#1e293b' }}>
            核心功能
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#475569', maxWidth: '600px', margin: '0 auto' }}>
            提供完整的单细胞数据分析流程，从数据上传到结果导出，一站式解决您的分析需求
          </Paragraph>
        </div>

        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: '12px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                }}
                bodyStyle={{ padding: '30px' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  {feature.icon}
                </div>
                <Title level={4} style={{ marginBottom: '12px', color: '#1e293b' }}>
                  {feature.title}
                </Title>
                <Paragraph style={{ color: '#475569', marginBottom: 0 }}>
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default FeaturesSection
