import { Role } from '../users/user.schema';

// interface for object { accessToken: string; refreshToken: string; userId: string; }
export interface AuthResponse extends TokenResponse {
  userId: string;
  role: Role;
}

//interface for object { accessToken: string; refreshToken: string; }
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}
