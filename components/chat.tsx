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
import type { AI, ChatId } from '@/lib/chat/actions'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialScreen?: React.ReactNode
  id?: ChatId
  session?: Session
  missingKeys: string[]
}

export function Chat({
  initialScreen,
  id,
  className,
  session,
  missingKeys
}: ChatProps) {
  const router = useRouter()
  const path = usePathname()
  //  TODO: whitelisting with BE
  if (
    path !== '/renzos' &&
    path !== '/tools/linkedin-analyzer' &&
    path !== '/tools/content-intelligence'
  ) {
    return <p>This brand is not available now.</p>
  }

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useUIState<typeof AI>()
  const [aiState] = useAIState()

  const [_, setNewChatId] = useLocalStorage('newChatId', id)

  // useEffect(() => {
  //   if (session?.user) {
  //     if (!path.includes('chat') && messages.length === 1) {
  //       window.history.replaceState({}, '', `/chat/${id}`)
  //     }
  //   }
  // }, [id, path, session?.user, messages])

  useEffect(() => {
    setMessages([])
  }, [path])

  useEffect(() => {
    if (chatContainerRef.current) {
      // chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
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
      <div className="" ref={chatContainerRef}>
        <div className={cn('pt-4 md:pt-12 mb-[100px]', className)}>
          {initialScreen}
          {initialScreen || messages.length ? (
            <ChatList messages={messages} isShared={false} session={session} />
          ) : (
            <EmptyScreen />
          )}
        </div>
        <ChatPanel id={id} input={input} setInput={setInput} />
      </div>

      <PromptForm input={input} setInput={setInput} />
    </>
  )
}
