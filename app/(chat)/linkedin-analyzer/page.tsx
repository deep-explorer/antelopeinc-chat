import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { InitialMessage } from '@/components/linkedin/initial-message'

export const metadata = {
  title: 'Antelope Chatbot: LinkedIn Analyzer'
}

export default async function IndexPage() {
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  return (
    <AI initialAIState={{ chatId: 'linkedin-analyzer', messages: [] }}>
      <Chat
        initialScreen={<InitialMessage />}
        id={'linkedin-analyzer'}
        session={session}
        missingKeys={missingKeys}
      />
    </AI>
  )
}
