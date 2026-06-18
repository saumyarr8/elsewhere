import { handlers } from '@/lib/auth'
import { NextRequest } from 'next/server'

const originalPost = handlers.POST

const loggingPost = async (request: NextRequest) => {
  console.log('[AUTH ROUTE] POST request to:', request.url)
  console.log('[AUTH ROUTE] Origin:', request.headers.get('origin'))
  console.log('[AUTH ROUTE] Referer:', request.headers.get('referer'))
  try {
    const response = await originalPost(request)
    console.log('[AUTH ROUTE] POST response status:', response.status)
    return response
  } catch (error) {
    console.error('[AUTH ROUTE] POST error:', error)
    throw error
  }
}

export const GET = handlers.GET
export const POST = loggingPost
