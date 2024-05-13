import { Button } from '@/components/ui/button'
import { sleep } from '@/lib/utils'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { BotCard, UserMessage } from './stocks/message'
import { ChatSpinner } from './stocks/ChatSpinner'
import { ScheduleMessage } from './schedule-message'
import { useRef } from 'react'
import Script from 'next/script'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'

export function FreePromptsMessage() {
  const [_, setMessages] = useUIState<typeof AI>()
  const { isScheduleDialogOpened, openScheduleDialog } = useFreeChatContext()

  const onClick = async (prompt: string, response: string) => {
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage>{prompt}</UserMessage>
      },
      {
        id: nanoid(),
        display: (
          <BotCard>
            <div className="ml-4 h-[32px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
              <ChatSpinner />
            </div>
          </BotCard>
        )
      }
    ])
    await sleep(3000)
    setMessages(currentMessages => [
      ...currentMessages.slice(0, currentMessages.length - 1),
      {
        id: nanoid(),
        display: <ScheduleMessage response={response} />
      }
    ])
  }
  return (
    <BotCard>
      <p className="mb-4 text-sm">
        Thank you for your analysis, what would you like to do next?
      </p>
      <div className="flex flex-wrap">
        {freePromptMessages.map((message, index) => (
          <div className="p-2 w-full md:w-[50%]" key={index}>
            <Button
              onClick={() => onClick(message.prompt, message.response)}
              className="w-full"
            >
              {message.prompt}
            </Button>
          </div>
        ))}
      </div>
      <MyDialog
        open={isScheduleDialogOpened}
        onClose={() => openScheduleDialog(false)}
      >
        <Script src="https://cdn.oncehub.com/mergedjs/so.js" />
        <div
          id="SOIDIV_DanielRobinson"
          data-so-page="DanielRobinson"
          data-height="550"
          data-style="border: 1px solid #d8d8d8; min-width: 290px; max-width: 900px;"
          className="border-1 border-[#d8d8d8] min-w-[290px] max-w-[900px] md:w-[768px]"
          data-psz="00"
        ></div>
      </MyDialog>
    </BotCard>
  )
}

const freePromptMessages = [
  {
    prompt: 'Run another analysis',
    response:
      "To dive deeper with another analysis, we'll need to arrange a session with the Antelope team. Click below to book a time, and we'll be in touch with the next steps."
  },
  {
    prompt: "Tell me the user's top posts",
    response:
      "To reveal the user's top posts, we will need to book a session with the Antelope team. Schedule your session below, and we'll be in touch with the next steps."
  },
  {
    prompt: "Write a post in the user's style",
    response:
      "To craft a post reflecting the user's unique voice, we will need to book a session with the Antelope team. Schedule your session below, and we'll be in touch with the next steps."
  },
  {
    prompt: 'Suggest another user to review',
    response:
      "Discover the potential in reviewing another user by booking a demo. Schedule your session below, and we'll be in touch with the next steps."
  }
]

function MyDialog({
  children,
  open,
  onClose
}: {
  children: React.ReactNode
  open: boolean
  onClose: () => void
}) {
  const innerRef = useRef<HTMLDivElement>(null)

  const handleClickOutside: React.MouseEventHandler<HTMLDivElement> = event => {
    if (innerRef.current && !innerRef.current.contains(event.target as Node)) {
      onClose()
    }
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'} bg-black bg-opacity-50`}
      onClick={handleClickOutside}
    >
      <div
        ref={innerRef}
        className="bg-background rounded-lg shadow-xl p-6 space-y-4 relative"
      >
        <button onClick={onClose} className="absolute top-3 right-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="size-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  )
}
