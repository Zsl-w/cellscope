import React from 'react'
import { Layout, Row, Col, Typography, Divider } from 'antd'
import {
  ExperimentOutlined,
  GithubOutlined,
  MailOutlined,
  BookOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons'

const { Footer: AntFooter } = Layout
const { Title, Text, Link } = Typography

const Footer: React.FC = () => {
  return (
    <AntFooter style={{
      background: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      color: '#1e293b',
      padding: '60px 20px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <div style={{ marginBottom: '20px' }}>
              <ExperimentOutlined style={{
                fontSize: '32px',
                color: '#0d9488',
              }} />
              <Title level={4} style={{
                color: '#1e293b',
                marginTop: '10px',
                marginBottom: '0'
              }}>
                单细胞分析平台
              </Title>
            </div>
            <Text style={{ color: '#94a3b8', fontSize: '14px', display: 'block', lineHeight: '1.6' }}>
              专业的单细胞RNA测序数据分析工具
            </Text>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#1e293b', marginBottom: '20px' }}>
              产品
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/features" style={{ color: '#94a3b8', fontSize: '14px' }}>
                功能介绍
              </Link>
              <Link href="/pricing" style={{ color: '#94a3b8', fontSize: '14px' }}>
                价格方案
              </Link>
              <Link href="/docs" style={{ color: '#94a3b8', fontSize: '14px' }}>
                使用文档
              </Link>
              <Link href="/api" style={{ color: '#94a3b8', fontSize: '14px' }}>
                API文档
              </Link>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#1e293b', marginBottom: '20px' }}>
              支持
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/help" style={{ color: '#94a3b8', fontSize: '14px' }}>
                帮助中心
              </Link>
              <Link href="/faq" style={{ color: '#94a3b8', fontSize: '14px' }}>
                常见问题
              </Link>
              <Link href="/contact" style={{ color: '#94a3b8', fontSize: '14px' }}>
                联系我们
              </Link>
              <Link href="/feedback" style={{ color: '#94a3b8', fontSize: '14px' }}>
                意见反馈
              </Link>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: '#1e293b', marginBottom: '20px' }}>
              关于
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/about" style={{ color: '#94a3b8', fontSize: '14px' }}>
                关于我们
              </Link>
              <Link href="https://github.com" target="_blank" style={{ color: '#94a3b8', fontSize: '14px' }}>
                <GithubOutlined /> GitHub
              </Link>
              <Link href="/privacy" style={{ color: '#94a3b8', fontSize: '14px' }}>
                隐私政策
              </Link>
              <Link href="/terms" style={{ color: '#94a3b8', fontSize: '14px' }}>
                服务条款
              </Link>
            </div>
          </Col>
        </Row>

        <Divider style={{ borderColor: '#e2e8f0', margin: '40px 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <Text style={{ color: '#94a3b8', fontSize: '14px' }}>
            © 2024 单细胞分析平台. All rights reserved.
          </Text>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="https://github.com" target="_blank" style={{ color: '#94a3b8', fontSize: '20px' }}>
              <GithubOutlined />
            </Link>
            <Link href="mailto:support@example.com" style={{ color: '#94a3b8', fontSize: '20px' }}>
              <MailOutlined />
            </Link>
            <Link href="/docs" style={{ color: '#94a3b8', fontSize: '20px' }}>
              <BookOutlined />
            </Link>
            <Link href="/help" style={{ color: '#94a3b8', fontSize: '20px' }}>
              <QuestionCircleOutlined />
            </Link>
          </div>
        </div>
      </div>
    </AntFooter>
  )
}

export default Footer
