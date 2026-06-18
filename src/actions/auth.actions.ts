'use server'

import { signIn, signOut } from '@/lib/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

export async function login(
  _prevState: { error?: string } | undefined,
  formData: FormData
) {
  const email = formData.get('email')
  const password = formData.get('password')

  console.log('[LOGIN ACTION] Login attempt for email:', email)
  console.log('[LOGIN ACTION] Environment:', process.env.NODE_ENV)
  console.log('[LOGIN ACTION] AUTH_URL configured:', !!process.env.AUTH_URL)
  console.log('[LOGIN ACTION] AUTH_SECRET configured:', !!process.env.AUTH_SECRET)

  try {
    console.log('[LOGIN ACTION] Calling signIn with credentials')
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/admin',
    })
  } catch (err) {
    console.error('[LOGIN ACTION] signIn error:', err)
    if (err instanceof AuthError) {
      console.log('[LOGIN ACTION] AuthError type:', err.type)
      if (err.type === 'CredentialsSignin') {
        return { error: 'Invalid email or password.' }
      }
      return { error: 'Something went wrong.' }
    }
    throw err
  }
}

export async function logout() {
  await signOut({ redirectTo: '/auth/login' })
}
