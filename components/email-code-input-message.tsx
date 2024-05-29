import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { spinner } from './stocks'
import { fetcher } from '@/lib/utils'
import { useActions, useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'
import { antelopeEndpoint, mode } from '@/lib/constants/config'

export function EmailCodeInputMessage() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isValidatingEmail, setValidatingEmail] = useState(false)

  const [_, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()
  const { userEmail, linkedinPosts } = useFreeChatContext()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    //  validation
    setValidatingEmail(true)
    try {
      const response = await fetcher(
        `${antelopeEndpoint}/chatbots/validate?email=${userEmail}&code=${code}&origin=${location.href}`
      )
      setValidatingEmail(false)

      //  NOTE: in development, we don't care the response
      if (mode === 'production' && !response.success) {
        //  TODO: backend should return a better message
        setError(response.msg ?? 'missing message')
        return
      }

      //  TODO: verify signature using public key
      // Submit and get response message
      const responseMessage = await submitUserMessage(linkedinPosts)
      setMessages(currentMessages => [...currentMessages, responseMessage])
    } catch (e: any) {
      setValidatingEmail(false)
      setError(e.message || 'The code is not valid.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 text-sm">
      <h1 className="text-xl font-semibold">Enter your code</h1>
      <p>Check your email for a confirmation code to continue the chat.</p>
      <div>
        <Input
          placeholder="ABCDEF"
          className="w-full overflow-hidden bg-[#FFFFFF] dark:bg-[#071920] sm:rounded-md border-[1px] border-[#1F3C45]"
          value={code}
          onChange={e => {
            setCode(e.target.value)
          }}
        />
        <div className="flex gap-2 h-6 p-1">
          {isValidatingEmail ? (
            <>
              {spinner}
              <p>Validating your code...</p>
            </>
          ) : (
            <p className=" text-red-500 italic">{error}</p>
          )}
        </div>
      </div>
      <Button type="submit">Submit Code</Button>
    </form>
  )
}
