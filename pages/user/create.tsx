import { useState } from 'react'
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Paper
} from '@mui/material'
import { useRouter } from 'next/router'
import apiClient from '@/util/axios'

const UserCreatePage = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async () => {
    try {
      await apiClient.post('users', { name, email })
      router.push('/users')
    } catch (error) {
      console.error('ユーザー作成失敗:', error)
      alert('登録に失敗しました')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          ユーザー新規登録
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="メールアドレス"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            登録
          </Button>
          <Button onClick={() => router.back()}>戻る</Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default UserCreatePage
