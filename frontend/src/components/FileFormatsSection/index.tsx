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
    icon: <FileTextOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
    name: '10x Genomics',
    description: '业界标准的单细胞测序数据格式',
    tags: ['Gene-Barcode矩阵', 'Feature-Barcode矩阵', 'H5格式'],
    popular: true
  },
  {
    icon: <DatabaseOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
    name: 'H5AD',
    description: 'Scanpy推荐的数据格式',
    tags: ['AnnData', '压缩存储', '快速加载'],
    popular: true
  },
  {
    icon: <FileExcelOutlined style={{ fontSize: '48px', color: '#faad14' }} />,
    name: 'CSV/TSV',
    description: '通用的表格数据格式',
    tags: ['基因表达矩阵', '易编辑', '广泛支持'],
    popular: false
  }
]

const FileFormatsSection: React.FC = () => {
  return (
    <div style={{ padding: '80px 20px', background: '#f5f5f5' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={2} style={{ marginBottom: '20px' }}>
            支持的数据格式
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
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
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                bodyStyle={{ padding: '32px' }}
              >
                {format.popular && (
                  <Tag color="red" style={{ position: 'absolute', top: '16px', right: '16px' }}>
                    热门
                  </Tag>
                )}
                <div style={{ marginBottom: '24px' }}>
                  {format.icon}
                </div>
                <Title level={4} style={{ marginBottom: '12px' }}>
                  {format.name}
                </Title>
                <Paragraph style={{ color: '#666', marginBottom: '20px' }}>
                  {format.description}
                </Paragraph>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                  {format.tags.map((tag, tagIndex) => (
                    <Tag key={tagIndex} color="blue" style={{ marginBottom: '8px' }}>
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
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <Paragraph style={{ fontSize: '16px', color: '#666', marginBottom: 0 }}>
            <strong>提示：</strong> 文件大小限制为 500MB，支持断点续传
          </Paragraph>
        </div>
      </div>
    </div>
  )
}

export default FileFormatsSection
