// util/axios.ts
import axios, { type AxiosError } from 'axios';

const isServer = typeof window === 'undefined';
// 実行タイミングでサーバーで実行するのかブラウザかで、表現が異なる。
const baseUrl = isServer
  ? 'http://rails_practice_devcontainer-app-1:4000'
  : 'http://localhost:4000';

const apiClient = axios.create({
  baseURL: baseUrl + '/api/v1/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export const handleApiError = (error: unknown): void => {
  if (
    typeof error === 'object' &&
    error !== null &&
    error instanceof Error &&
    'isAxiosError' in error
  ) {
    const axiosError = error as AxiosError;
    console.error('API エラー:', axiosError.response?.data ?? axiosError.message);
  } else if (error instanceof Error) {
    console.error('接続エラー:', error.message);
  } else {
    console.error('不明なエラー:', error);
  }
};

export default apiClient;
