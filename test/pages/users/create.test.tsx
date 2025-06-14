import { UserSchema } from '@/schemas/users/createVlidation'

describe('UserSchema validation', () => {
  it('正しい入力ならバリデーションを通過する', () => {
    const result = UserSchema.safeParse({ name: '山田太郎', email: 'taro@example.com' })
    expect(result.success).toBe(true)
  })

  it('名前が空ならエラーになる', () => {
    const result = UserSchema.safeParse({ name: '', email: 'taro@example.com' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name?.[0]).toBe('名前は必須です')
    }
  })

  it('メールが空ならエラーになる', () => {
    const result = UserSchema.safeParse({ name: '山田太郎', email: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email?.[0]).toBe('メールアドレスは必須です')
    }
  })

  it('メール形式が不正ならエラーになる', () => {
    const result = UserSchema.safeParse({ name: '山田太郎', email: 'invalid-email' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email?.[0]).toBe('メールアドレスの形式が不正です')
    }
  })
})
