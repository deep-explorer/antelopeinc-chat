import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { InitialMessage } from '@/components/vitamin/initial-message'

export const metadata = {
  title: "Antelope Chatbot: Children's Vitamins Analyzer",
  openGraph: {
    title: "Antelope Chatbot: Children's Vitamins Analyzer",
    description: "Antelope Chatbot: Children's Vitamins Analyzer",
    url: 'https://chat.antelopeinc.com',
    siteName: "Antelope Chatbot: Children's Vitamins Analyzer",
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
    <AI initialAIState={{ chatId: 'vitamin-analyzer', messages: [] }}>
      <Chat
        initialScreen={<InitialMessage />}
        id={'vitamin-analyzer'}
        session={session}
        missingKeys={missingKeys}
      />
    </AI>
  )
}
