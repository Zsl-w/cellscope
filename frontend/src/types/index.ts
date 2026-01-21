export interface User {
  id: string
  email: string
  username: string
  freeQuota: number
  createdAt: string
}

export interface Project {
  id: string
  name: string
  description: string
  status: 'idle' | 'uploading' | 'analyzing' | 'completed' | 'failed'
  userId: string
  createdAt: string
  updatedAt: string
}

export interface UploadedFile {
  id: string
  projectId: string
  filename: string
  fileType: '10x' | 'h5ad' | 'csv'
  fileSize: number
  filePath: string
  uploadedAt: string
}

export interface QCResult {
  projectId: string
  nGenes: number[]
  nCounts: number[]
  percentMt: number[]
  filteredCells: number
  filteredGenes: number
}

export interface AnalysisResult {
  projectId: string
  qc: QCResult
  normalized: boolean
  pca: {
    varianceRatio: number[]
    components: number[][]
  }
  umap: {
    coordinates: number[][]
  }
  cluster: {
    labels: number[]
    nClusters: number
  }
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  username: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}
