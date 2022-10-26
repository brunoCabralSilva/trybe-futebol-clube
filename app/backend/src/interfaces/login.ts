export interface LoginInterface {
  email: string,
  password: string,
}

export interface LoginAuthenticate {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface TokenDecode {
  id: number,
  username: string,
  role: string,
  email: string,
}
