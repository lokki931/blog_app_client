'use server';
import { cookies } from 'next/headers';
export async function setCookiesHeader(token) {
  if (!token) {
    return;
  }
  cookies().set({
    name: 'access-token',
    value: token,
    httpOnly: true,
    path: '/',
  });
}
export async function deleteCookiesHeader() {
  cookies().delete('access-token');
}
