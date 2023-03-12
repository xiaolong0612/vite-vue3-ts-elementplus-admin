export interface LoginReq {
  username: string;
  password: string 
}

export interface UserRes {
  token: string;
  roles: Array<string>;
  name: string;
  introduction: string;
  avatar: string;
}

export interface LogoutReq {
  token: string;
}

export interface LoginLogs {
  list: Array<LoginLog>,
  total: number
}
export interface LoginLog {
  name: string,
  datetime: string,
  ip: string
}