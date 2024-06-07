import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { spinner } from './stocks'
import { fetcher } from '@/lib/utils'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'
import { diposableEmailBlocklist } from '@/lib/constants/diposable-email-blocklist'
import { EmailCodeInputMessage } from './email-code-input-message'
import { antelopeEndpoint } from '@/lib/constants/config'

export function EmailInputMessage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isValidatingEmail, setValidatingEmail] = useState(false)

  const [_, setMessages] = useUIState<typeof AI>()
  const { setUserEmail, isBypassMode } = useFreeChatContext()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    //  validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailRegex.test(email)) {
      if (!diposableEmailBlocklist.includes(email.split('@')[1])) {
        //  validating email in server for uniqueness
        setValidatingEmail(true)
        try {
          const response = await fetcher(
            `${antelopeEndpoint}/chatbots/validate?email=${email}&origin=${location.href}`
          )
          setValidatingEmail(false)

          if (!isBypassMode && !response.success) {
            setError(
              response.msg ??
                'No response. Please try again. If the problem persists, email us at contact@antelopeinc.com.'
            )
            return
          }

          setUserEmail(email)
          setMessages(currentMessages => [
            ...currentMessages,
            {
              id: nanoid(),
              display: <EmailCodeInputMessage />,
              role: 'assistant'
            }
          ])
        } catch (e: any) {
          setValidatingEmail(false)
          setError(
            e.message ||
              'The email you entered is not valid. Please check and re-enter. If the problem persists, email us at contact@antelopeinc.com..'
          )
        }
      } else {
        setError(
          'This email cannot be used. Please choose a different email domain. If the problem persists, email us at contact@antelopeinc.com.'
        )
      }
    } else {
      setError(
        'The email you entered is not valid. Please check and re-enter. If the problem persists, email us at contact@antelopeinc.com.'
      )
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 text-sm">
      <h1 className="text-xl font-semibold">Report Ready</h1>
      <p>Thank you for providing your profile details.</p>
      <p>
        To receive the analysis, which includes a detailed breakdown of the
        selected profile&apos;s strengths, weaknesses, key tactics, and best
        practices, please enter your email below.
      </p>
      <div>
        <Input
          placeholder="yourname@email.com"
          className="w-full overflow-hidden bg-[#FFFFFF] dark:bg-[#071920] sm:rounded-md border-[1px] border-[#1F3C45]"
          autoFocus
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
        <div className="flex gap-2 h-6 p-1">
          {isValidatingEmail ? (
            <>
              {spinner}
              <p>Validating your email...</p>
            </>
          ) : (
            <p className=" text-red-500 italic">{error}</p>
          )}
        </div>
      </div>
      <Button type="submit">Send Full Report</Button>
    </form>
  )
}
