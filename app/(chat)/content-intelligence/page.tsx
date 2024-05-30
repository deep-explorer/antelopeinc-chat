import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { InitialMessage } from '@/components/content-intelligence/initial-message'

export const metadata = {
  title: 'Antelope Chatbot: Content Intelligence',
  openGraph: {
    title: 'Antelope Chatbot: Content Intelligence',
    description: 'Antelope Chatbot: Content Intelligence',
    url: 'https://chat.antelopeinc.com',
    siteName: 'Antelope Chatbot: Content Intelligence',
    images: [
      {
        url: 'https://chat.antelopeinc.com/og.png',
        width: 1200,
        height: 630
      }
    ],
    locale: 'en_US',
    type: 'website'
  }
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
