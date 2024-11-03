"use server"
import { cookies } from 'next/headers'

export async function getCookie(name: string) {
    const cookieStore = cookies()
    const data = cookieStore.get(name)
    return data?.value;
}

export async function removeCookie(name: string) {
  cookies().delete(name)
}