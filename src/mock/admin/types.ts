import type { UserRes }  from '@/api/admin/types'

interface DbUser extends UserRes {
  password: string
}

export interface Tokens {
  [propName: string]: DbUser
}
