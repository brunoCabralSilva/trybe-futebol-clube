export interface LoginAuthenticate {
    id: number,
    username: string,
    role: string,
    email: string,
    password: string,
  }
  
  export interface JwtConfig {
    expiresIn: string,
    algorithm: string,
  };