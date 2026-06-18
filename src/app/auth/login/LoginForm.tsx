'use client'

import { useActionState } from 'react'
import { login } from '@/actions/auth.actions'

type State = { error?: string } | undefined

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)
  const isDev = process.env.NODE_ENV === 'development'

  const handleSubmit = async (formData: FormData) => {
    console.log('[LOGIN FORM] Form submitted')
    console.log('[LOGIN FORM] Email:', formData.get('email'))
    return action(formData)
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {state?.error && (
        <div className="bg-red-50 p-3 rounded text-sm text-red-900 border border-red-300 space-y-1">
          <p><strong>Login Error:</strong></p>
          <p className="break-words">{state.error}</p>
        </div>
      )}
      {/* CLIENT-SIDE DEBUG INFO */}
      <div className="bg-yellow-50 p-3 rounded text-xs text-yellow-900 border border-yellow-200 space-y-1">
        <p><strong>Client Debug Info:</strong></p>
        <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
        <p>Is Development: {isDev ? 'Yes' : 'No'}</p>
      </div>
      <div className="space-y-1">
        <label htmlFor="email" className="block text-xs uppercase tracking-widest text-[var(--color-ink-muted)]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full border border-[var(--color-border)] px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[var(--color-ink)] transition-colors"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="password" className="block text-xs uppercase tracking-widest text-[var(--color-ink-muted)]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full border border-[var(--color-border)] px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[var(--color-ink)] transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-[var(--color-ink)] text-[var(--color-paper)] py-2.5 text-xs uppercase tracking-widest hover:opacity-80 transition-opacity disabled:opacity-40"
      >
        {pending ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  )
}
