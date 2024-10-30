'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { spinner } from '../stocks'
import { fetcher } from '@/lib/utils'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { BotCard, UserMessage } from '../stocks/message'
import IceBreakerSlider from './ice-breaker-slider'
import IceBreaker from './ice-breaker'
import { LinkedInLogoIcon } from '@radix-ui/react-icons'
import { EmailInputMessage } from '../email-input-message'
import { showPrompts } from '@/lib/chat/prompt'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'

export function InitialMessage() {
  const [senderLink, setSenderLink] = useState('')
  const [receipientLink, setReceipientLink] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)
  const { setIceBreakerLinkedins } = useFreeChatContext()

  const [_, setMessages] = useUIState<typeof AI>()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/
    if (
      !senderLink ||
      !receipientLink ||
      !regex.test(senderLink) ||
      !regex.test(receipientLink)
    ) {
      setError('Enter valid LinkedIn profile URLs.')
      return
    }

    setIceBreakerLinkedins([senderLink, receipientLink])
    showPrompts(
      'Suggest the approach for making a connection.',
      <EmailInputMessage />,
      setMessages
    )
    // setMessages(currentMessages => [
    //   ...currentMessages,
    //   {
    //     id: nanoid(),
    //     display: (
    //       <div className="flex gap-2">
    //         <div className="flex items-center">
    //           <LinkedInLogoIcon />
    //         </div>
    //         {receipientLink}
    //       </div>
    //     ),
    //     role: 'user'
    //   },
    //   {
    //     id: nanoid(),
    //     display: <EmailInputMessage />,
    //     role: 'assistant'
    //   }
    // ])

    // setLoading(true)
    // try {
    //   const response = await fetcher(
    //     `/api/tools/ice-breaker?senderLink=${senderLink}&receipientLink=${receipientLink}`
    //   )
    //   console.log(response.data)
    //   setLoading(false)

    //   setMessages(currentMessages => [
    //     ...currentMessages,
    //     // {
    //     //   id: nanoid(),
    //     //   display: (
    //     //     <div className="flex gap-2">
    //     //       <div className="flex items-center">
    //     //         <LinkedInLogoIcon />
    //     //       </div>
    //     //       {senderLink}
    //     //     </div>
    //     //   ),
    //     //   role: 'user'
    //     // },
    //     {
    //       id: nanoid(),
    //       display: <IceBreaker data={response.data} />,
    //       role: 'assistant'
    //     }
    //   ])
    // } catch (e: any) {
    //   setLoading(false)
    //   setError(e.message || 'Please provide a correct LinkedIn profile name.')
    // }
  }

  return (
    <BotCard>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-1 md:gap-6 p-1 md:p-4"
      >
        <h1 className="text-lg md:text-xl font-semibold text-teal-500">
          Welcome to Antelope&apos;s LinkedIn Ice Breaker.
        </h1>
        <p className="text-sm md:text-base">
          This chatbot finds common interests between two profiles by analyzing
          LinkedIn data and suggesting personalized ice breakers to spark
          engaging discussions.
        </p>
        <p className="text-sm md:text-base">
          To begin, please enter the LinkedIn profiles of the recipient and
          sender.
        </p>
        <div>
          <p className="text-sm md:text-base mb-1">
            Enter Sender&apos;s LinkedIn Profile
          </p>
          <Input
            placeholder="https://www.linkedin.com/in/SENDER"
            className="w-full overflow-hidden bg-[#FFFFFF] dark:bg-[#071920] sm:rounded-md border-[1px] border-[#1F3C45]"
            autoFocus
            value={senderLink}
            onChange={e => {
              setSenderLink(e.target.value)
            }}
          />
        </div>
        <div>
          <p className="text-sm md:text-base mb-1">
            Enter Recipient&apos;s LinkedIn Profile
          </p>
          <Input
            placeholder="https://www.linkedin.com/in/RECIPIENT"
            className="w-full overflow-hidden bg-[#FFFFFF] dark:bg-[#071920] sm:rounded-md border-[1px] border-[#1F3C45]"
            autoFocus
            value={receipientLink}
            onChange={e => {
              setReceipientLink(e.target.value)
            }}
          />
          <div className="flex gap-2 h-6 p-1">
            {isLoading ? (
              <>
                {spinner}
                <p>Analyzing user profile...</p>
              </>
            ) : (
              <p className=" text-red-500 italic">{error}</p>
            )}
          </div>
        </div>
        <Button type="submit">Start Analysis</Button>
      </form>
    </BotCard>
  )
}
