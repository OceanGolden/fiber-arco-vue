export interface LoginRequest {
  username: string;
  password: string;
  isRemember: boolean;
}

export interface LoginResponse {
  id: string;
  username: string;
  avatar: string;
  access: string;
  refresh: string;
}

export interface TokenRecord {
  access: string;
  refresh: string;
}
