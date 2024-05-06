import React, { useState } from 'react'
import { TextField, Button } from '@radix-ui/themes'
import { spinner } from '../stocks'
import { fetcher } from '@/lib/utils'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'
import { diposableEmailBlocklist } from '@/lib/constants/diposable-email-blocklist'
import { antelopeEndpoint, mode } from '@/lib/constants/config'
import { useWindowSize } from 'usehooks-ts'
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons'

export function EmailInputMessage() {
  const { width: windowWidth } = useWindowSize()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isValidatingEmail, setValidatingEmail] = useState(false)

  const { userEmail, setUserEmail } = useFreeChatContext()

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
            `${antelopeEndpoint}/chatbot/validate?email=${email}`
          )
          setValidatingEmail(false)

          //  NOTE: in development, we don't care the response
          if (mode === 'production' && !response.success) {
            //  TODO: backend should return a better message
            setError(
              response.msg ??
                "We're sorry, but only one email address per chatbot is allowed at this time."
            )
            return
          }

          setUserEmail(email)
        } catch (e: any) {
          setValidatingEmail(false)
          setError(e.message || 'This email is not allowed.')
        }
      } else {
        setError('This email domain is not allowed.')
      }
    } else {
      setError('Please enter a valid email')
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 text-sm">
      <h1 className="text-2xl font-semibold text-center">
        To continue, we&apos;ll need to validate your email address.
      </h1>

      <p className="text-lg">
        Please enter your email below, and we&apos;ll send you a validation code
        to continue your analysis.
      </p>
      <div>
        <TextField.Root
          size={windowWidth > 768 ? '3' : '1'}
          radius="large"
          placeholder="Enter your email address"
          required
          style={{
            height: windowWidth > 768 ? 50 : 42,
            padding: '0 16px',
            backgroundColor: '#1E333B',
            backgroundClip: 'padding-box'
          }}
          autoFocus
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        >
          <TextField.Slot side="right">
            <EnvelopeClosedIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <div className="flex gap-2 h-6 p-1 text-[14px]">
          {isValidatingEmail ? (
            <>
              {spinner}
              <p>Validating your email...</p>
            </>
          ) : userEmail ? (
            <p className="text-[#18898D]">Your email have a valid address</p>
          ) : (
            <p className="text-red-500 italic">{error}</p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        style={{ width: '100%' }}
        size={windowWidth > 768 ? '3' : '2'}
      >
        <LockClosedIcon />
        Unlock Report
      </Button>
    </form>
  )
}
