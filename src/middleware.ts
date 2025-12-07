export { auth as middleware } from '@/auth'

export const config = {
  matcher: ['/addTopic/:path*', '/editTopic/:path*', '/profile/:path*'],
}
