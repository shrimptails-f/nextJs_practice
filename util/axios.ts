import axios from 'axios'

const isServer = typeof window === 'undefined'
// 実行タイミングでサーバーで実行するのかブラウザかで、表現が異なる。
const baseUrl = isServer
  ? 'http://rails_practice_devcontainer-app-1:4000'
  : 'http://localhost:4000'

const apiClient = axios.create({
  baseURL:  baseUrl + "/api/v1/",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 5000,
})

export default apiClient
