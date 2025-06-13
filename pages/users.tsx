import { GetServerSideProps } from 'next'

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
    <div>
      <h1>ユーザー一覧</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}（{user.email}）
          </li>
        ))}
      </ul>
    </div>
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
