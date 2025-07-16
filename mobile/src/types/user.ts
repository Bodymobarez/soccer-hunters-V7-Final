export interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  role: 'player' | 'coach' | 'club' | 'agent' | 'doctor' | 'admin' | 'user';
  avatarUrl?: string;
  phoneNumber?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}