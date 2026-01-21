import React from 'react'
import { Card, Row, Col, Typography, Tag } from 'antd'
import {
  FileTextOutlined,
  FileExcelOutlined,
  DatabaseOutlined
} from '@ant-design/icons'

const { Title, Paragraph } = Typography

const formats = [
  {
    icon: <FileTextOutlined style={{ fontSize: '48px', color: '#0d9488' }} />,
    name: '10x Genomics',
    description: '业界标准的单细胞测序数据格式',
    tags: ['Gene-Barcode矩阵', 'Feature-Barcode矩阵', 'H5格式'],
    popular: true,
    accentColor: '#0d9488'
  },
  {
    icon: <DatabaseOutlined style={{ fontSize: '48px', color: '#0ea5e9' }} />,
    name: 'H5AD',
    description: 'Scanpy推荐的数据格式',
    tags: ['AnnData', '压缩存储', '快速加载'],
    popular: true,
    accentColor: '#0ea5e9'
  },
  {
    icon: <FileExcelOutlined style={{ fontSize: '48px', color: '#8b5cf6' }} />,
    name: 'CSV/TSV',
    description: '通用的表格数据格式',
    tags: ['基因表达矩阵', '易编辑', '广泛支持'],
    popular: false,
    accentColor: '#8b5cf6'
  }
]

const FileFormatsSection: React.FC = () => {
  return (
    <div style={{
      padding: '80px 20px',
      background: '#ffffff',
      backgroundImage: 'linear-gradient(180deg, rgba(13, 148, 136, 0.02) 0%, transparent 100%)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={2} style={{ marginBottom: '20px', color: '#1e293b' }}>
            支持的数据格式
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#475569', maxWidth: '600px', margin: '0 auto' }}>
            支持多种主流单细胞数据格式，满足不同来源的数据需求
          </Paragraph>
        </div>

        <Row gutter={[32, 32]}>
          {formats.map((format, index) => (
            <Col xs={24} md={8} key={index}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: '12px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
                bodyStyle={{ padding: '32px' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 4px 12px ${format.accentColor}15`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = format.accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                {/* 装饰性顶部边框 */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  height: '3px',
                  background: format.accentColor,
                  opacity: '0.8',
                }} />
                {format.popular && (
                  <Tag
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: `${format.accentColor}15`,
                      color: format.accentColor,
                      border: `1px solid ${format.accentColor}30`,
                    }}
                  >
                    热门
                  </Tag>
                )}
                <div style={{ marginBottom: '24px' }}>
                  {format.icon}
                </div>
                <Title level={4} style={{ marginBottom: '12px', color: '#1e293b' }}>
                  {format.name}
                </Title>
                <Paragraph style={{ color: '#475569', marginBottom: '20px' }}>
                  {format.description}
                </Paragraph>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                  {format.tags.map((tag, tagIndex) => (
                    <Tag
                      key={tagIndex}
                      style={{
                        marginBottom: '8px',
                        background: `${format.accentColor}10`,
                        color: format.accentColor,
                        border: `1px solid ${format.accentColor}20`,
                      }}
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div style={{
          marginTop: '40px',
          textAlign: 'center',
          padding: '24px',
          background: '#f1f5f9',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
        }}>
          <Paragraph style={{ fontSize: '16px', color: '#1e293b', marginBottom: 0 }}>
            <strong style={{ color: '#0d9488' }}>提示：</strong> 文件大小限制为 500MB，支持断点续传
          </Paragraph>
        </div>
      </div>
    </div>
  )
}

export default FileFormatsSection
