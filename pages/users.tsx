import { useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from '@mui/material';

import { useUserStore } from '@/store/userStore';
import apiClient, { handleApiError } from '@/util/axios';
import { useRouter } from 'next/router';

type User = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  users: User[];
};

const UsersPage = ({ users }: Props) => {
  const router = useRouter();
  const { setUsers } = useUserStore();
  useEffect(() => {
    setUsers(users);
  }, [users, setUsers]);
  const { users: userList } = useUserStore();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">ユーザー管理</Typography>
        <Button variant="contained" color="primary" onClick={() => router.push('/user/create')}>
          新規登録
        </Button>
      </Box>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>UserName</strong>
              </TableCell>
              <TableCell>
                <strong>メールアドレス</strong>
              </TableCell>
              <TableCell align="center" sx={{ width: 100 }}>
                <strong>編集</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="center" sx={{ width: 100 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push('/user/' + user.id + '/edit')}
                  >
                    編集
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

// CSRで済む実装で良いが、SSRの練習もしたいのでこのままにしておく
export const getServerSideProps = async () => {
  let users: User[] = [];
  try {
    const res = await apiClient.get<User[]>('users');
    users = res.data;
  } catch (error: unknown) {
    handleApiError(error);
  }

  return {
    props: {
      users,
    },
  };
};

export default UsersPage;
