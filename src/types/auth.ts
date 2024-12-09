export type UserRole = 'admin' | 'vendor' | 'member' | null;

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  profession?: string;
  company?: string;
  avatar?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
  profession: string;
  company?: string;
  acceptTerms: boolean;
}