import { useState } from 'react'
import { useRouter } from 'next/router'
import { Container, Paper, Typography, Box, TextField, Button } from '@mui/material'
import { z } from 'zod'
import apiClient from '@/util/axios'

// Zodスキーマ定義
const UserSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().min(1, 'メールアドレスは必須です').email('メールアドレスの形式が不正です')
})

const UserCreatePage = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})

  const handleSubmit = async () => {
    const result = UserSchema.safeParse({ name, email })
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0]
      })
      return
    }

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
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="メールアドレス"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={!!errors.email}
            helperText={errors.email}
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
