import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { InitialMessage } from '@/components/ice-breaker/initial-message'

export const metadata = {
  title: 'Antelope Chatbot: Ice Breaker',
  openGraph: {
    title: 'Antelope Chatbot: Ice Breaker',
    description: 'Antelope Chatbot: Ice Breaker',
    siteName: 'Antelope Chatbot: Ice Breaker',
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
    <AI initialAIState={{ chatId: 'ice-breaker', messages: [] }}>
      <Chat
        initialScreen={<InitialMessage />}
        id={'ice-breaker'}
        session={session}
        missingKeys={missingKeys}
      />
    </AI>
  )
}
