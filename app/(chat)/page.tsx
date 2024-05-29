import { nanoid } from '@/lib/utils'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '../actions'

export const metadata = {
  title: 'Antelope Chatbot'
}

export default async function IndexPage() {
  // const id = nanoid()
  // const session = (await auth()) as Session
  // const missingKeys = await getMissingKeys()

  return <p>Select an analyzer</p>
}
