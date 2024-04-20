import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { spinner } from './stocks'
import { fetcher } from '@/lib/utils'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { UserMessage } from './stocks/message'
import { LinkedInLogoIcon } from '@radix-ui/react-icons'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'
import { EmailInputMessage } from './email-input-message'

export function EmptyScreen() {
  const [link, setLink] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)

  const [_, setMessages] = useUIState<typeof AI>()
  const { setLinkedinPosts } = useFreeChatContext()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    //  validation
    const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/
    if (regex.test(link)) {
      //  process linkedin profile link
      setLoading(true)
      try {
        const response = await fetcher(`/api?profileUrl=${link}`)
        setLoading(false)

        setLinkedinPosts(JSON.stringify(response))
        setMessages(currentMessages => [
          ...currentMessages,
          {
            id: nanoid(),
            display: (
              <UserMessage>
                <div className="flex gap-2">
                  <div className="flex items-center">
                    <LinkedInLogoIcon />
                  </div>
                  {link}
                </div>
              </UserMessage>
            )
          },
          {
            id: nanoid(),
            display: <EmailInputMessage />
          }
        ])
      } catch (e: any) {
        setLoading(false)
        setError(
          e.message || 'An error occurred while fetching the user profile'
        )
      }
    } else {
      setError('Please enter a valid LinkedIn profile link')
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <h1 className="text-lg md:text-xl font-semibold">
            Welcome to Antelope LinkedIn profile analyzer.
          </h1>
          <p className="text-sm md:text-base">
            To begin your analysis, please insert a LinkedIn profile in the link
            and format below
          </p>
          <div>
            <Input
              placeholder="https://www.linkedin.com/in/danielryanrobinson/"
              className="w-full overflow-hidden bg-[#FFFFFF] dark:bg-[#071920] sm:rounded-md border-[1px] border-[#1F3C45]"
              autoFocus
              value={link}
              onChange={e => {
                setLink(e.target.value)
              }}
            />
            <div className="flex gap-2 h-6 p-1">
              {isLoading ? (
                <>
                  {spinner}
                  <p>Fetching user profile...</p>
                </>
              ) : (
                <p className=" text-red-500 italic">{error}</p>
              )}
            </div>
          </div>
          <Button type="submit">Start Analysis</Button>
        </form>
      </div>
    </div>
  )
}
