import React, { useState } from 'react'
import { TextField, Button } from '@radix-ui/themes'
import { spinner } from '../stocks'
import { fetcher } from '@/lib/utils'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'
import { diposableEmailBlocklist } from '@/lib/constants/diposable-email-blocklist'
import { antelopeEndpoint } from '@/lib/constants/config'
import { useWindowSize } from 'usehooks-ts'
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons'

export function EmailInputMessage() {
  const { width: windowWidth } = useWindowSize()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isValidatingEmail, setValidatingEmail] = useState(false)

  const { userEmail, setUserEmail, isBypassMode } = useFreeChatContext()

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
      <h1 className="text-lg md:text-xl font-bold text-center">
        To continue, we&apos;ll need to validate your email address.
      </h1>

      <p className="text-sm md:text-base">
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
            <p className="text-[#18898D]">You have entered a valid address</p>
          ) : (
            <p className="text-red-500 italic">{error}</p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        style={{ width: '100%', backgroundColor: '#E54D2E', cursor: 'pointer' }}
        size={windowWidth > 768 ? '3' : '2'}
      >
        <LockClosedIcon />
        Unlock Report
      </Button>
    </form>
  )
}
