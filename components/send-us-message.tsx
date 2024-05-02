'use client'
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

export function SendUsMessage() {
  const [link, setLink] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)

  const [_, setMessages] = useUIState<typeof AI>()
  const { setLinkedinPosts } = useFreeChatContext()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/
    //  process linkedin profile link
    setLoading(true)
    try {
      const response = await fetcher(
        `/api?profileUrl=https://www.linkedin.com/in/${link}`
      )
      setLoading(false)

      setLinkedinPosts(response.data)
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
      setError(e.message || 'Please enter vaild LinkedIn profile name')
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-1 md:gap-4">
      <h1 className="text-lg md:text-xl font-semibold">Send Us a Message</h1>
      <p className="text-sm md:text-base">
        Have a question or want to learn more? Send us a message and our team
        will be in touch soon.
      </p>
      <div className="flex flex-wrap">
        <Input
          placeholder="Your name"
          className="w-full overflow-hidden bg-[#FFFFFF] dark:bg-[#071920] sm:rounded-md border-[1px] border-[#1F3C45]"
          autoFocus
          value={link}
          onChange={e => {
            setLink(e.target.value)
          }}
        />
        <Input
          placeholder="Company email"
          className="w-full overflow-hidden bg-[#FFFFFF] dark:bg-[#071920] sm:rounded-md border-[1px] border-[#1F3C45]"
          autoFocus
          value={link}
          onChange={e => {
            setLink(e.target.value)
          }}
        />
        <Input
          placeholder="Phone"
          className="w-full overflow-hidden bg-[#FFFFFF] dark:bg-[#071920] sm:rounded-md border-[1px] border-[#1F3C45]"
          autoFocus
          value={link}
          onChange={e => {
            setLink(e.target.value)
          }}
        />
        <Input
          placeholder="Company"
          className="w-full overflow-hidden bg-[#FFFFFF] dark:bg-[#071920] sm:rounded-md border-[1px] border-[#1F3C45]"
          autoFocus
          value={link}
          onChange={e => {
            setLink(e.target.value)
          }}
        />
        <Input
          placeholder="Subject"
          className="w-full overflow-hidden bg-[#FFFFFF] dark:bg-[#071920] sm:rounded-md border-[1px] border-[#1F3C45]"
          autoFocus
          value={link}
          onChange={e => {
            setLink(e.target.value)
          }}
        />
        <Input
          placeholder="Your name"
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
  )
}
