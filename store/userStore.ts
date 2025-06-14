import { create } from 'zustand'

type User = {
  id: number
  name: string
  email: string
}

type State = {
  users: User[]
  editingUser: User | null
  setUsers: (users: User[]) => void
  setEditingUser: (user: User | null) => void
  updateUser: (user: User) => void
  deleteUser: (id: number) => void
}

export const useUserStore = create<State>((set) => ({
  users: [],
  editingUser: null,
  setUsers: (users) => set({ users }),
  setEditingUser: (user) => set({ editingUser: user }),
  updateUser: (user) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === user.id ? user : u)),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
}))
