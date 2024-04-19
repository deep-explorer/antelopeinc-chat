'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useRef, useState } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { Session } from '@/lib/types'
import { usePathname, useRouter } from 'next/navigation'
import { Message } from '@/lib/chat/actions'
import { toast } from 'sonner'
import { PromptForm } from './prompt-form'
import { PromptUsageWidget } from './prompt-usage-widget'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  session?: Session
  missingKeys: string[]
}

export function Chat({ id, className, session, missingKeys }: ChatProps) {
  const router = useRouter()
  const path = usePathname()
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()

  const [_, setNewChatId] = useLocalStorage('newChatId', id)

  useEffect(() => {
    if (session?.user) {
      if (!path.includes('chat') && messages.length === 1) {
        window.history.replaceState({}, '', `/chat/${id}`)
      }
    }
  }, [id, path, session?.user, messages])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      router.refresh()
    }
  }, [aiState.messages, router])

  useEffect(() => {
    setNewChatId(id)
  })

  useEffect(() => {
    missingKeys.map(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  return (
    <>
      <div className="relative flex justify-center h-[calc(100vh_-_theme(spacing.28))] ">
        <div className="max-w-[940px] min-w-[350px] w-full flex">
          <div
            className="group w-full overflow-auto  bg-[#CDE2E7] dark:bg-[#071920] rounded-lg border-black dark:border-white border-2"
            ref={chatContainerRef}
          >
            <div className={cn('pt-4 md:pt-10 ', className)}>
              {messages.length ? (
                <ChatList
                  messages={messages}
                  isShared={false}
                  session={session}
                />
              ) : (
                <EmptyScreen />
              )}
            </div>
            <ChatPanel id={id} input={input} setInput={setInput} />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center space-y-4 border-t bg-background p-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
        <div className="max-w-[940px] w-full flex flex-col gap-2">
          <PromptForm input={input} setInput={setInput} />
          {/* <PromptUsageWidget /> */}
        </div>
      </div>
    </>
  )
}
