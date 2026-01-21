import React, { useEffect, useState } from 'react'
import {
  Card,
  Button,
  Typography,
  Space,
  Empty,
  Input,
  Select,
  Row,
  Col,
  Statistic,
  Spin,
  message,
} from 'antd'
import {
  PlusOutlined,
  SearchOutlined,
  AppstoreOutlined,
  FolderOpenOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useProjectStore } from '../../store/projectStore'
import ProjectList from '../../components/ProjectList'
import ProjectModal from '../../components/ProjectModal'

const { Title, Text } = Typography
const { Search } = Input

const Dashboard: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)

  const {
    projects,
    loading,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    error,
    clearError,
  } = useProjectStore()

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  useEffect(() => {
    if (error) {
      message.error(error)
      clearError()
    }
  }, [error, clearError])

  const handleCreateProject = () => {
    setEditingProject(null)
    setIsModalOpen(true)
  }

  const handleEditProject = (project: any) => {
    setEditingProject(project)
    setIsModalOpen(true)
  }

  const handleModalOk = async (values: any) => {
    try {
      if (editingProject) {
        await updateProject(editingProject.id, values)
        message.success('项目更新成功')
      } else {
        await createProject(values)
        message.success('项目创建成功')
      }
      setIsModalOpen(false)
    } catch (error) {
      // Error already handled by store
    }
  }

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject(id)
      message.success('项目删除成功')
    } catch (error) {
      // Error already handled by store
    }
  }

  // 过滤项目
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchText.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchText.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // 统计数据
  const stats = {
    total: projects.length,
    completed: projects.filter((p) => p.status === 'completed').length,
    processing: projects.filter((p) => p.status === 'processing').length,
    draft: projects.filter((p) => p.status === 'draft').length,
  }

  return (
    <div style={{ padding: '24px', minHeight: '100vh', background: '#f8fafc' }}>
      {/* 头部 */}
      <div style={{ marginBottom: '24px' }}>
        <Row gutter={16} align="middle" justify="space-between">
          <Col xs={24} md={12}>
            <Title level={2} style={{ margin: 0, color: '#1e293b' }}>
              <AppstoreOutlined style={{ marginRight: '12px', color: '#0d9488' }} />
              项目管理
            </Title>
            <Text type="secondary" style={{ fontSize: '14px', marginLeft: '36px' }}>
              管理您的单细胞数据分析项目
            </Text>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreateProject}
              size="large"
              style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #0ea5e9 100%)',
                border: 'none',
                boxShadow: '0 2px 8px rgba(13, 148, 136, 0.2)',
              }}
            >
              新建项目
            </Button>
          </Col>
        </Row>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              background: 'linear-gradient(135deg, #0d9488 0%, #0ea5e9 100%)',
              border: 'none',
              borderRadius: '12px',
            }}
            bodyStyle={{ padding: '20px' }}
          >
            <Statistic
              title={<span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>总项目数</span>}
              value={stats.total}
              valueStyle={{ color: '#fff', fontSize: '32px', fontWeight: 'bold' }}
              prefix={<FolderOpenOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
              border: 'none',
              borderRadius: '12px',
            }}
            bodyStyle={{ padding: '20px' }}
          >
            <Statistic
              title={<span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>已完成</span>}
              value={stats.completed}
              valueStyle={{ color: '#fff', fontSize: '32px', fontWeight: 'bold' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
              border: 'none',
              borderRadius: '12px',
            }}
            bodyStyle={{ padding: '20px' }}
          >
            <Statistic
              title={<span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>处理中</span>}
              value={stats.processing}
              valueStyle={{ color: '#fff', fontSize: '32px', fontWeight: 'bold' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              background: 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)',
              border: 'none',
              borderRadius: '12px',
            }}
            bodyStyle={{ padding: '20px' }}
          >
            <Statistic
              title={<span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>草稿</span>}
              value={stats.draft}
              valueStyle={{ color: '#fff', fontSize: '32px', fontWeight: 'bold' }}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 搜索和筛选 */}
      <Card
        style={{ marginBottom: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
        bodyStyle={{ padding: '16px 24px' }}
      >
        <Row gutter={16} align="middle">
          <Col xs={24} md={12}>
            <Search
              placeholder="搜索项目名称或描述..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} md={12} style={{ textAlign: 'right' }}>
            <Space>
              <Text>状态筛选:</Text>
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: 120 }}
                size="large"
              >
                <Select.Option value="all">全部</Select.Option>
                <Select.Option value="draft">草稿</Select.Option>
                <Select.Option value="processing">处理中</Select.Option>
                <Select.Option value="completed">已完成</Select.Option>
                <Select.Option value="error">错误</Select.Option>
              </Select>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 项目列表 */}
      <Spin spinning={loading}>
        {filteredProjects.length === 0 ? (
          <Card style={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div>
                  <Text type="secondary" style={{ fontSize: '16px' }}>
                    {searchText || statusFilter !== 'all'
                      ? '没有找到匹配的项目'
                      : '还没有项目，点击上方按钮创建您的第一个项目'}
                  </Text>
                </div>
              }
            >
              {!searchText && statusFilter === 'all' && (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleCreateProject}
                  style={{
                    background: 'linear-gradient(135deg, #0d9488 0%, #0ea5e9 100%)',
                    border: 'none',
                  }}
                >
                  创建项目
                </Button>
              )}
            </Empty>
          </Card>
        ) : (
          <ProjectList
            projects={filteredProjects}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
          />
        )}
      </Spin>

      {/* 项目模态框 */}
      <ProjectModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleModalOk}
        project={editingProject}
      />
    </div>
  )
}

export default Dashboard
