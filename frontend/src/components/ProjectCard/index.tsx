import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  Button,
  Space,
  Tag,
  Dropdown,
  Popconfirm,
  Typography,
  Row,
  Col,
} from 'antd'
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FileOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Project } from '../../services/projectService'

const { Text, Paragraph } = Typography

interface ProjectCardProps {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (id: string) => void
}

const statusConfig: Record<string, { color: string; icon: React.ReactNode; text: string }> = {
  draft: { color: 'default', icon: <ExclamationCircleOutlined />, text: '草稿' },
  processing: { color: 'warning', icon: <ClockCircleOutlined />, text: '处理中' },
  completed: { color: 'success', icon: <CheckCircleOutlined />, text: '已完成' },
  error: { color: 'error', icon: <ExclamationCircleOutlined />, text: '错误' },
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  
  // 格式化日期和时间：2026-01-22 14:30
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const navigate = useNavigate()
  const status = statusConfig[project.status] || statusConfig.draft

  const handleCardClick = () => {
    navigate(`/project/${project.id}`)
  }

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'edit') {
      onEdit(project)
    } else if (key === 'delete') {
      onDelete(project.id)
    }
  }

  const handleMenuDropdownVisibleChange = (visible: boolean) => {
    // 阻止冒泡，避免触发卡片点击
    if (visible) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window.event as any) && (window.event as any).stopPropagation) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window.event as any).stopPropagation()
      }
    }
  }

  const menuItems: MenuProps['items'] = [
    {
      key: 'edit',
      label: '编辑',
      icon: <EditOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'delete',
      label: '删除',
      icon: <DeleteOutlined />,
      danger: true,
    },
  ]

  return (
    <Card
      hoverable
      onClick={handleCardClick}
      style={{
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
      bodyStyle={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
      styles={{
        hover: {
          boxShadow: '0 4px 12px rgba(13, 148, 136, 0.15)',
          borderColor: '#0d9488',
        },
      }}
    >
      {/* 头部 */}
      <div style={{ marginBottom: '12px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.1) 0%, rgba(14, 165, 233, 0.1) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
          }}
        >
          <AppstoreOutlined style={{ fontSize: '24px', color: '#0d9488' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Space direction="vertical" size={4} style={{ flex: 1, overflow: 'hidden' }}>
            <Text
              strong
              style={{
                fontSize: '16px',
                color: '#1e293b',
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {project.name}
            </Text>
            <Tag
              color={status.color}
              icon={React.cloneElement(status.icon as React.ReactElement, { style: { fontSize: '12px' } })}
              style={{ margin: 0 }}
            >
              {status.text}
            </Tag>
          </Space>
          <Dropdown
            menu={{ items: menuItems, onClick: handleMenuClick }}
            trigger={['click']}
            placement="bottomRight"
            onOpenChange={handleMenuDropdownVisibleChange}
          >
            <Button
              type="text"
              icon={<MoreOutlined />}
              onClick={(e) => e.stopPropagation()}
              style={{
                flexShrink: 0,
                padding: '4px 8px',
                color: '#64748b',
              }}
            />
          </Dropdown>
        </div>
      </div>

      {/* 描述 */}
      {project.description && (
        <Paragraph
          ellipsis={{ rows: 2 }}
          style={{
            color: '#64748b',
            fontSize: '14px',
            marginBottom: '12px',
            flex: 1,
          }}
        >
          {project.description}
        </Paragraph>
      )}

      {/* 统计信息 */}
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        {project.file_count !== undefined && (
          <Col span={12}>
            <Space size={4}>
              <FileOutlined style={{ color: '#64748b', fontSize: '14px' }} />
              <Text type="secondary" style={{ fontSize: '13px' }}>
                {project.file_count} 文件
              </Text>
            </Space>
          </Col>
        )}
        {project.cell_count !== undefined && (
          <Col span={12}>
            <Space size={4}>
              <AppstoreOutlined style={{ color: '#64748b', fontSize: '14px' }} />
              <Text type="secondary" style={{ fontSize: '13px' }}>
                {project.cell_count.toLocaleString()} 细胞
              </Text>
            </Space>
          </Col>
        )}
      </Row>

      {/* 底部信息 */}
      <div
        style={{
          borderTop: '1px solid #e2e8f0',
          paddingTop: '12px',
          marginTop: 'auto',
        }}
      >
        <Space split={<span style={{ color: '#e2e8f0' }}>|</span>} size={8}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            创建于 {formatDate(project.created_at)}
          </Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            更新于 {formatDate(project.updated_at)}
          </Text>
        </Space>
      </div>
    </Card>
  )
}

export default ProjectCard
