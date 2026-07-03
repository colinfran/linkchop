type UserType = {
  id: string | null
  name: string | null
  email: string | null
  password: string | null
  is_banned: boolean | null
  is_premium_user: boolean | null
  created_at: string | null
  updated_at: string | null
}

type UpdateUserType = {
  id: string | null
  name: string | null
  email: string | null
  password: string | null
  is_banned: boolean | null
  is_premium_user: boolean | null
  created_at: string | null
  updated_at: string | null
  newEmail?: string | null
  oldPassword?: string | null
  newPassword?: string | null
}

type CreateUrlsQueryType = {
  id: string
  original_url: string
  user_id: string
}

type GetUrlType = {
  id: string | null
  original_url: string | null
  created_at: string | null
  user_id: string | null
}

type GetUrlsType = {
  id: string | null
  original_url: string | null
  created_at: string | null
  user_id: string | null
  visit_count: number | null
}

type VisitData = {
  url_id: string
  device_type: string | undefined
  device_model: string | undefined
  device_vendor: string | undefined
  is_a_bot: boolean | undefined
  browser_name: string | undefined
  browser_version: string | undefined
  engine_name: string | undefined
  engine_version: string | undefined
  os_name: string | undefined
  os_version: string | undefined
}

type PasswordResetTokenProps =
  | {
      id: string | null
      email: string | null
      expiration: Date | null
    }[]
  | undefined

type GetSubscriptionType = {
  subscription_id: string | null
  user_id: string | null
  start_date: string | null
  expiration_day: number | null
  status: string | null
}

export type {
  UserType,
  UpdateUserType,
  CreateUrlsQueryType,
  GetUrlType,
  GetUrlsType,
  VisitData,
  PasswordResetTokenProps,
  GetSubscriptionType,
}
