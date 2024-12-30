import { User } from '@/lib/types';

export async function login(email: string, password: string) {
  const response = await fetch('http://localhost:8000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  return response.json();
}

export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin';
}

export function getStoredUser(): User | null {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) as User : null;
}
