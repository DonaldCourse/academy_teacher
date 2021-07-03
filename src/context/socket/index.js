import { useContext } from 'react'
import Context from './Context'
export { default as withSocket } from './with.js'
export { default as SocketProvider } from './Provider.js'

export function useSocket() {
  return useContext(Context)
}