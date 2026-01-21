import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Upload,
  message,
  Descriptions,
  Tag,
  Breadcrumb,
  Table,
  Space,
  Popconfirm,
  Spin,
} from 'antd';
import {
  UploadOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { projectService } from '../../services/projectService';
import { fileService, FileResponse } from '../../services/fileService';

const { Dragger } = Upload;

interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'processing' | 'completed' | 'error';
  created_at: string;
  updated_at: string;
  file_count: number;
  cell_count: number;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [files, setFiles] = useState<FileResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      loadProject();
      loadFiles();
    }
  }, [id]);

  const loadProject = async () => {
    try {
      const data = await projectService.getProjectById(id!);
      setProject(data);
    } catch (error: any) {
      message.error(error.response?.data?.detail || '加载项目失败');
    } finally {
      setLoading(false);
    }
  };

  const loadFiles = async () => {
    try {
      const data = await fileService.getProjectFiles(id!);
      setFiles(data);
    } catch (error: any) {
      message.error(error.response?.data?.detail || '加载文件列表失败');
    }
  };

  const handleUpload: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError } = options;
    setUploading(true);

    try {
      const result = await fileService.uploadFile(id!, file as File);
      message.success('文件上传成功！');
      onSuccess?.(result);
      loadFiles();
    } catch (error: any) {
      message.error(error.response?.data?.detail || '文件上传失败');
      onError?.(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      await fileService.deleteFile(fileId);
      message.success('文件删除成功！');
      loadFiles();
    } catch (error: any) {
      message.error(error.response?.data?.detail || '文件删除失败');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'default',
      processing: 'processing',
      completed: 'success',
      error: 'error',
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      draft: '草稿',
      processing: '处理中',
      completed: '已完成',
      error: '错误',
    };
    return texts[status] || status;
  };

  const columns = [
    {
      title: '文件名',
      dataIndex: 'original_name',
      key: 'original_name',
      ellipsis: true,
    },
    {
      title: '文件类型',
      dataIndex: 'file_type',
      key: 'file_type',
      width: 150,
      render: (type: string) => type.split('/')[1]?.toUpperCase() || type,
    },
    {
      title: '文件大小',
      dataIndex: 'file_size',
      key: 'file_size',
      width: 120,
      render: (size: number) => fileService.formatFileSize(size),
    },
    {
      title: '上传时间',
      dataIndex: 'uploaded_at',
      key: 'uploaded_at',
      width: 180,
      render: (time: string) => new Date(time).toLocaleString('zh-CN'),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: any, record: FileResponse) => (
        <Space size="middle">
          <Popconfirm
            title="确认删除"
            description="确定要删除这个文件吗？"
            onConfirm={() => handleDeleteFile(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="text" danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          控制台
        </Breadcrumb.Item>
        <Breadcrumb.Item>{project?.name}</Breadcrumb.Item>
      </Breadcrumb>

      <div style={{ marginBottom: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/dashboard')}>
          返回控制台
        </Button>
      </div>

      <Card title="项目信息" style={{ marginBottom: 24 }}>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="项目名称">{project?.name}</Descriptions.Item>
          <Descriptions.Item label="状态">
            <Tag color={getStatusColor(project?.status || 'draft')}>
              {getStatusText(project?.status || 'draft')}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="描述" span={2}>
            {project?.description || '暂无描述'}
          </Descriptions.Item>
          <Descriptions.Item label="文件数量">{project?.file_count || 0}</Descriptions.Item>
          <Descriptions.Item label="细胞数量">{project?.cell_count || 0}</Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {project?.created_at ? new Date(project.created_at).toLocaleString('zh-CN') : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {project?.updated_at ? new Date(project.updated_at).toLocaleString('zh-CN') : '-'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="文件管理" style={{ marginBottom: 24 }}>
        <Dragger
          name="file"
          multiple
          customRequest={handleUpload}
          showUploadList={false}
          style={{ marginBottom: 16 }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
          <p className="ant-upload-hint">
            支持 CSV、TXT、Excel、H5 等格式，单个文件最大 100MB
          </p>
        </Dragger>

        <Table
          columns={columns}
          dataSource={files}
          rowKey="id"
          loading={uploading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 个文件`,
          }}
        />
      </Card>
    </div>
  );
};

export default ProjectDetail;
