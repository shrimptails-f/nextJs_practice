import { GetServerSideProps } from 'next'
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

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch('http://rails_practice_devcontainer-app-1:4000/', {
    headers: {
      Accept: 'application/json',
    },
  })
  const users = await res.json()

  return {
    props: {
      users,
    },
  }
}

export default UsersPage
