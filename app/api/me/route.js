import { NextResponse } from 'next/server';
// To handle a GET request to /api
export async function GET(request) {
  let token = request.cookies.get('access-token')?.value;
  if (!token) {
    return NextResponse.json({ messge: 'You no Authorization' }, { status: 200 });
  }
  const response = await fetch(`${process.env.apiUrl}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `bearer ${token}`, // notice the Bearer before your token
    },
    method: 'GET',
  });
  const data = await response.json();

  const res = NextResponse.json(data, {
    status: 200,
  });

  return res;
}
