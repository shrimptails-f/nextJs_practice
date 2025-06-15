// lib/axios.ts
import axios, { type AxiosError } from 'axios';

const apiClient = axios.create({
  baseURL: 'http://rails_practice_devcontainer-app-1:4000/api/v1/',
  headers: {
    Accept: 'application/json',
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
