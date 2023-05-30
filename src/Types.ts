export interface UserListResult {
  time_queried: Date
  data: UserListData
}

export interface UserListData {
  has_more: boolean
  items: User[]
  quota_max: number
  quota_remaining: number
}

export type User = {
  following: boolean
  blocked: boolean
  accept_rate: number
  account_id: number
  badge_counts: BadgeCounts
  creation_date: Date
  display_name: string
  is_employee: boolean
  last_access_date: Date
  last_modified_date: Date
  link: string
  location: string
  profile_image: string
  reputation: number
  reputation_change_day: number
  reputation_change_month: number
  reputation_change_quarter: number
  reputation_change_week: number
  reputation_change_year: number
  user_id: number
  user_type: string
  website_url: string
}

export interface BadgeCounts {
  bronze: number
  gold: number
  silver: number
}
