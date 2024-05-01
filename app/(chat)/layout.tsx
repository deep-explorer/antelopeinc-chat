import { SidebarDesktop } from '@/components/sidebar-desktop'
import { Suspense } from 'react'
import { Chat } from '@/components/chat'
import { nanoid } from '@/lib/utils'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '../actions'
import { Title } from '@/components/title'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  return (
    <div className="py-14 md:py-[100px]">
      <Suspense fallback={null}>
        <Title />
      </Suspense>
      <AI initialAIState={{ chatId: id, messages: [] }}>
        <Chat
          initialScreen={children}
          id={id}
          session={session}
          missingKeys={missingKeys}
        />
      </AI>
    </div>
  )
}
