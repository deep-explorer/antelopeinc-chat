import { Button } from '@/components/ui/button'
import { sleep } from '@/lib/utils'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { BotCard } from './stocks/message'
import { ChatSpinner } from './stocks/ChatSpinner'
import { ScheduleMessage } from './schedule-message'
import { useRef } from 'react'
import Script from 'next/script'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'
import { SimpleDialog } from './ui/simple-dialog'

export function FreePromptsMessage() {
  const [_, setMessages] = useUIState<typeof AI>()
  const { isScheduleDialogOpened, openScheduleDialog } = useFreeChatContext()

  const onClick = async (prompt: string, response: string) => {
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: prompt,
        role: 'user'
      },
      {
        id: nanoid(),
        display: (
          <div className="ml-4 h-[32px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
            <ChatSpinner />
          </div>
        ),
        role: 'assistant'
      }
    ])
    await sleep(100) //  NOTE: to wait for actual UI update
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })

    await sleep(3000)
    setMessages(currentMessages => [
      ...currentMessages.slice(0, currentMessages.length - 1),
      {
        id: nanoid(),
        display: <ScheduleMessage response={response} />,
        role: 'assistant'
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
      <SimpleDialog
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
      </SimpleDialog>
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
