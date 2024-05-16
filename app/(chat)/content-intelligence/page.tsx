import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { InitialMessage } from '@/components/content-intelligence/initial-message'

export const metadata = {
  title: 'Antelope Chatbot: Content Intelligence'
}

export default async function IndexPage() {
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  return (
    <AI initialAIState={{ chatId: 'content-intelligence', messages: [] }}>
      <Chat
        initialScreen={<InitialMessage />}
        id={'content-intelligence'}
        session={session}
        missingKeys={missingKeys}
      />
    </AI>
  )
}
