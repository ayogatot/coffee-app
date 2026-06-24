'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(formData: FormData) {
  const passcode = formData.get('passcode') as string;
  const correctPasscode = process.env.ADMIN_PASSCODE;

  if (!correctPasscode) {
    throw new Error('ADMIN_PASSCODE environment variable is not set');
  }

  if (passcode === correctPasscode) {
    const cookieStore = await cookies();
    cookieStore.set('admin_passcode', passcode, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    redirect('/admin');
  } else {
    return { error: 'Invalid passcode' };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_passcode');
  redirect('/admin/login');
}
