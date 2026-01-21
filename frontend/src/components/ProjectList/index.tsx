import React from 'react'
import { Row, Col } from 'antd'
import { Project } from '../../services/projectService'
import ProjectCard from '../ProjectCard'

interface ProjectListProps {
  projects: Project[]
  onEdit: (project: Project) => void
  onDelete: (id: string) => void
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete }) => {
  return (
    <Row gutter={[16, 16]}>
      {projects.map((project) => (
        <Col xs={24} sm={12} lg={8} xl={6} key={project.id}>
          <ProjectCard
            project={project}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Col>
      ))}
    </Row>
  )
}

export default ProjectList
