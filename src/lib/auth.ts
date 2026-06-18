import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

const isDevelopment = process.env.NODE_ENV === 'development'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('[AUTH] authorize called with email:', credentials?.email)

        if (!credentials?.email || !credentials?.password) {
          console.log('[AUTH] Missing email or password')
          return null
        }

        try {
          console.log('[AUTH] Querying database for user:', credentials.email)
          const admin = await prisma.adminUser.findUnique({
            where: { email: credentials.email as string },
          })

          if (!admin) {
            console.log('[AUTH] Admin user not found:', credentials.email)
            return null
          }

          console.log('[AUTH] Admin user found, comparing passwords')
          const valid = await bcrypt.compare(
            credentials.password as string,
            admin.passwordHash
          )

          if (!valid) {
            console.log('[AUTH] Password comparison failed')
            return null
          }

          console.log('[AUTH] Authorization successful for user:', admin.id)
          return { id: admin.id, email: admin.email }
        } catch (error) {
          console.error('[AUTH] Error during authorization:', error)
          throw error
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    jwt({ token, user }) {
      console.log('[AUTH JWT] jwt callback called, user:', user?.id)
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      console.log('[AUTH SESSION] session callback called, token.id:', token?.id)
      if (token?.id && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  debug: isDevelopment,
})
