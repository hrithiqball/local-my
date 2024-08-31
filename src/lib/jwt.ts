import { jwtDecode } from 'jwt-decode'

type JwtPayload = {
  sub: string
}

export function getUserIdFromToken(token: string): string | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    return decoded.sub
  } catch (error) {
    console.error('Failed to decode token:', error)
    return null
  }
}
