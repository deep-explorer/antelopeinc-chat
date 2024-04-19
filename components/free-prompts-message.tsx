import { Button } from '@/components/ui/button'
import { sleep } from '@/lib/utils'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { BotCard, SpinnerMessage, UserMessage } from './stocks/message'
import { ChatSpinner } from './stocks/ChatSpinner'

export function FreePromptsMessage() {
  const [_, setMessages] = useUIState<typeof AI>()

  const onClick = async (prompt: string) => {
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
        display: (
          <BotCard>
            <p className="mb-4 text-sm">
              To continue, you will need to schedule a demo to meet with Antelop
              team, click the link below and a team member will get back to you
              soon
            </p>
            <div className="p-2 w-[50%]">
              <Button
                className="w-full bg-yellow-600"
                onClick={() =>
                  window.open('https://go.oncehub.com/DanielRobinson', '_blank')
                }
              >
                Schedule appointment
              </Button>
            </div>
          </BotCard>
        )
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
          <div className="p-2 w-[50%]" key={index}>
            <Button
              onClick={() => onClick(message)}
              className="w-full bg-yellow-600"
            >
              {message}
            </Button>
          </div>
        ))}
      </div>
    </BotCard>
  )
}

const freePromptMessages = [
  'Run another analysis',
  "Tell me the user's top posts",
  'Write a post in the users style',
  'Suggest another user to review'
]
