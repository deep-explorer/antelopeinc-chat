import { ReactElement } from 'react'
import { UIState } from './actions'
import { nanoid } from 'nanoid'
import { CardSkeleton } from '@/components/ui/card-skeleton'
import { sleep } from '../utils'

export const showPrompts = async (
  userPrompt: string | ReactElement,
  assistantPrompt: string | ReactElement,
  setMessages: (v: UIState | ((v_: UIState) => UIState)) => void
) => {
  setMessages(currentMessages => [
    ...currentMessages,
    {
      id: nanoid(),
      display: userPrompt,
      role: 'user'
    },
    {
      id: nanoid(),
      display: <CardSkeleton />,
      role: 'assistant'
    }
  ])
  await sleep(100) //  NOTE: to wait for actual UI update
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })
  await sleep(2000)
  setMessages(currentMessages => [
    ...currentMessages.slice(0, -1),
    {
      id: nanoid(),
      display: assistantPrompt,
      role: 'assistant'
    }
  ])
}
