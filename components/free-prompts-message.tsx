import { Button } from '@/components/ui/button'
import { sleep } from '@/lib/utils'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { BotCard, UserMessage } from './stocks/message'
import { ChatSpinner } from './stocks/ChatSpinner'
import { ScheduleMessage } from './schedule-message'

export function FreePromptsMessage() {
  const [_, setMessages] = useUIState<typeof AI>()

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
      ...currentMessages.slice(0, -1),
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
    prompt: 'Tell me the user&apos;s top posts',
    response:
      "To reveal the user&apos;s top posts, we will need to book a session with the Antelope team. Schedule your session below, and we'll be in touch with the next steps."
  },
  {
    prompt: 'Write a post in the user&apos;s style',
    response:
      "To craft a post reflecting the user&apos;s unique voice, we will need to book a session with the Antelope team. Schedule your session below, and we'll be in touch with the next steps."
  },
  {
    prompt: 'Suggest another user to review',
    response:
      "Discover the potential in reviewing another user by booking a demo. Schedule your session below, and we'll be in touch with the next steps."
  }
]
