type UserData = {
  id: string
  name: string
  email: string
  password?: string
  created_at: string
  updated_at: string
  is_premium_user: boolean
}

type AuthUser = {
  user: {
    data: UserData
    exp: number
    iat: number
    jti: string
    sub: string
  }
  expires: string
}

export type { AuthUser, UserData }
