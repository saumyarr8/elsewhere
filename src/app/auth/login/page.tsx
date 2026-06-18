import LoginForm from './LoginForm'

export const metadata = { title: 'Sign In' }

export default function LoginPage() {
  const debugInfo = {
    nodeEnv: process.env.NODE_ENV,
    authUrlSet: !!process.env.AUTH_URL,
    authSecretSet: !!process.env.AUTH_SECRET,
    authUrl: process.env.AUTH_URL || 'NOT SET',
    databaseUrlSet: !!process.env.DATABASE_URL,
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper-warm)]">
      <div className="w-full max-w-sm">
        <h1
          className="text-3xl mb-8 text-center tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          .elsewhere
        </h1>
        <LoginForm />

        {/* SERVER-SIDE DEBUG INFO */}
        <div className="mt-6 bg-blue-50 p-3 rounded text-xs text-blue-900 border border-blue-200 space-y-1">
          <p><strong>Server Debug Info:</strong></p>
          <p>NODE_ENV: {debugInfo.nodeEnv}</p>
          <p>AUTH_URL: {debugInfo.authUrlSet ? debugInfo.authUrl : '❌ NOT SET'}</p>
          <p>AUTH_SECRET: {debugInfo.authSecretSet ? '✓ Set' : '❌ NOT SET'}</p>
          <p>DATABASE_URL: {debugInfo.databaseUrlSet ? '✓ Set' : '❌ NOT SET'}</p>
        </div>
      </div>
    </div>
  )
}
