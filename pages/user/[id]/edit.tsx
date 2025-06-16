import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserFormStore } from '@/store/userFormStore';
import { UserSchema } from '@/schemas/users/createValidation';
import apiClient from '@/util/axios';
import { Container, Paper, Typography, Box, TextField, Button } from '@mui/material';

const UserCreatePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { name, email, errors, setName, setEmail, setErrors } = useUserFormStore();

  useEffect(() => {
    if (typeof id !== 'string') return;

    const fetchUser = async () => {
      try {
        const res = await apiClient.get('/users/1');
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (e) {
        console.error('ユーザー情報取得失敗:', e);
        alert('ユーザー情報の取得に失敗しました');
      }
    };

    fetchUser();
  }, [id, setName, setEmail]);

  const handleSubmit = async () => {
    const result = UserSchema.safeParse({ name, email });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
      });
      return;
    }

    try {
      await apiClient.put('users/' + id, { name, email });
      router.push('/users');
    } catch (error) {
      console.error('ユーザー作成失敗:', error);
      alert('登録に失敗しました');
    }
  };

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
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="メールアドレス"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
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
  );
};

export default UserCreatePage;
