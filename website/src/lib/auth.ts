"use server"
import { cookies } from 'next/headers'

let isAuthenticated = false;

export const login = () => {
  isAuthenticated = true;
};

export const logout = () => {
  isAuthenticated = false;
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

export async function getCookie(name: string) {
    const cookieStore = cookies()
    const data = cookieStore.get(name)
    return data?.value;
}

export async function removeCookie(name: string) {
  cookies().delete(name)
}