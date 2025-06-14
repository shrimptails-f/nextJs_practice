import { render, screen } from '@testing-library/react'
import UsersPage, { getServerSideProps } from '@/pages/users'
import { useUserStore } from '@/store/userStore'
import '@testing-library/jest-dom'
import apiClient from '@/util/axios'

jest.mock('@/util/axios')

jest.mock('@/store/userStore', () => {
    const actual = jest.requireActual('@/store/userStore')
    return {
        ...actual,
        useUserStore: jest.fn(),
    }
})

describe('UsersPage', () => {
    const mockSetUsers = jest.fn()
    const mockSetEditingUser = jest.fn()
    const mockDeleteUser = jest.fn()

    beforeEach(() => {
        const mockedUseUserStore = useUserStore as unknown as jest.Mock
        mockedUseUserStore.mockReturnValue({
            setUsers: mockSetUsers,
            users: [
                { id: 1, name: '太郎', email: 'taro@example.com' },
                { id: 2, name: '花子', email: 'hanako@example.com' },
            ],
            setEditingUser: mockSetEditingUser,
            deleteUser: mockDeleteUser,
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('ユーザー一覧が表示されること', () => {
        const users = [
            { id: 1, name: '太郎', email: 'taro@example.com' },
            { id: 2, name: '花子', email: 'hanako@example.com' },
        ]
        render(<UsersPage users={users} />)

        expect(screen.getByText('ユーザー管理')).toBeInTheDocument()
        expect(screen.getByText('太郎')).toBeInTheDocument()
        expect(screen.getByText('taro@example.com')).toBeInTheDocument()
        expect(screen.getByText('花子')).toBeInTheDocument()
        expect(screen.getByText('hanako@example.com')).toBeInTheDocument()
    })
})


describe('getServerSideProps', () => {
  it('APIからユーザーデータを取得して返すこと', async () => {
    const mockData = [
      { id: 1, name: '太郎', email: 'taro@example.com' },
      { id: 2, name: '花子', email: 'hanako@example.com' },
    ]
    ;(apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockData })

    const result = await getServerSideProps()

    expect(result).toEqual({
      props: {
        users: mockData,
      },
    })
  })

  it('APIエラー時に空配列を返すこと', async () => {
    ;(apiClient.get as jest.Mock).mockRejectedValueOnce(new Error('API error'))

    const result = await getServerSideProps()

    expect(result).toEqual({
      props: {
        users: [],
      },
    })
  })
})
