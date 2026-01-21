import React, { useEffect } from 'react'
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Space,
  Typography,
  message,
} from 'antd'
import { Project } from '../../services/projectService'

const { Title, Text } = Typography
const { TextArea } = Input

interface ProjectModalProps {
  open: boolean
  onCancel: () => void
  onOk: (values: any) => Promise<void>
  project?: Project | null
}

const ProjectModal: React.FC<ProjectModalProps> = ({ open, onCancel, onOk, project }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    if (open) {
      if (project) {
        form.setFieldsValue({
          name: project.name,
          description: project.description || '',
          status: project.status,
        })
      } else {
        form.resetFields()
        form.setFieldsValue({
          status: 'draft',
        })
      }
    }
  }, [open, project, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      await onOk(values)
      form.resetFields()
    } catch (error) {
      // Validation error or submission error
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }

  return (
    <Modal
      open={open}
      title={null}
      onCancel={handleCancel}
      footer={null}
      width={500}
      styles={{
        body: { padding: '24px' },
      }}
    >
      {/* 头部 */}
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <Title level={3} style={{ margin: 0, color: '#1e293b' }}>
          {project ? '编辑项目' : '新建项目'}
        </Title>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          {project ? '更新项目信息' : '创建一个新的分析项目'}
        </Text>
      </div>

      {/* 表单 */}
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item
          label="项目名称"
          name="name"
          rules={[
            { required: true, message: '请输入项目名称' },
            { min: 2, message: '项目名称至少2个字符' },
            { max: 100, message: '项目名称最多100个字符' },
          ]}
        >
          <Input
            placeholder="请输入项目名称"
            size="large"
            prefix={
              <span style={{ color: '#94a3b8' }}>
                📁
              </span>
            }
          />
        </Form.Item>

        <Form.Item
          label="项目描述"
          name="description"
          rules={[
            { max: 500, message: '项目描述最多500个字符' },
          ]}
        >
          <TextArea
            placeholder="请输入项目描述（可选）"
            rows={4}
            maxLength={500}
            showCount
          />
        </Form.Item>

        {project && (
          <Form.Item
            label="项目状态"
            name="status"
            rules={[{ required: true, message: '请选择项目状态' }]}
          >
            <Select size="large" placeholder="请选择项目状态">
              <Select.Option value="draft">草稿</Select.Option>
              <Select.Option value="processing">处理中</Select.Option>
              <Select.Option value="completed">已完成</Select.Option>
              <Select.Option value="error">错误</Select.Option>
            </Select>
          </Form.Item>
        )}
      </Form>

      {/* 底部按钮 */}
      <div style={{ textAlign: 'right', marginTop: '24px' }}>
        <Space>
          <Button onClick={handleCancel} size="large">
            取消
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            size="large"
            style={{
              background: 'linear-gradient(135deg, #0d9488 0%, #0ea5e9 100%)',
              border: 'none',
              boxShadow: '0 2px 8px rgba(13, 148, 136, 0.2)',
            }}
          >
            {project ? '保存更改' : '创建项目'}
          </Button>
        </Space>
      </div>
    </Modal>
  )
}

export default ProjectModal
