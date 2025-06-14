// lib/axios.ts
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://rails_practice_devcontainer-app-1:4000/api/v1/',
  headers: {
    Accept: 'application/json',
  },
  timeout: 5000,
})

export default apiClient
