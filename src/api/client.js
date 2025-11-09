// src/api/client.js
import axios from 'axios';

// API Base URL - reads from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000, // 2 minutes for large file uploads
});

// Request interceptor (for adding auth tokens in future)
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if needed in future
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (for error handling)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // No response received
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API Methods
export const api = {
  // Health check
  checkHealth: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  },

  // Upload document
  uploadDocument: async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: onUploadProgress || undefined,
    });
    return response.data;
  },

  // Delete document
  deleteDocument: async (documentId) => {
    const response = await apiClient.delete(`/documents/${documentId}`);
    return response.data;
  },

  // Query documents (RAG)
  queryDocuments: async (query, topK = 5, temperature = 0.7) => {
    const response = await apiClient.post('/query', {
      query,
      top_k: topK,
      temperature,
    });
    return response.data;
  },

  // Search documents only (no answer generation)
  searchDocuments: async (query, topK = 5) => {
    const response = await apiClient.get('/query/search', {
      params: { query, top_k: topK },
    });
    return response.data;
  },
};

export default apiClient;