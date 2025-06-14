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
} from '@mui/material'

import apiClient from '@/util/axios'

type User = {
  id: number
  name: string
  email: string
}

type Props = {
  users: User[]
}

const UsersPage = ({ users }: Props) => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ユーザー管理
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>UserName</strong></TableCell>
              <TableCell><strong>メールアドレス</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export const getServerSideProps = async () => {
  let users: User[] = []
  try {
    const res = await apiClient.get<User[]>('users')
    users = res.data
  } catch (error: any) {
    if (error.response) {
      console.error('APIエラー:', error.response.data)
    } else {
      console.error('接続エラー:', error.message)
    }
  }

  return {
    props: {
      users,
    },
  }
}

export default UsersPage
