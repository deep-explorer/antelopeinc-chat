import React, { useState } from 'react'
import { TextField, Button } from '@radix-ui/themes'
import { spinner } from '../stocks'
import { fetcher } from '@/lib/utils'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'
import { antelopeEndpoint } from '@/lib/constants/config'
import { KeyboardIcon } from '@radix-ui/react-icons'
import { useWindowSize } from 'usehooks-ts'

export function EmailCodeInputMessage() {
  const { width: windowWidth } = useWindowSize()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isValidatingEmail, setValidatingEmail] = useState(false)

  const { userEmail, setEmailVerified, isBypassMode } = useFreeChatContext()

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

      if (!isBypassMode && !response.success) {
        setError(
          response.msg ??
            'No response. Please try again. If the problem persists, email us at contact@antelopeinc.com.'
        )
        return
      }

      //  TODO: verify signature using public key
      // Submit and get response message
      setEmailVerified(true)
    } catch (e: any) {
      setValidatingEmail(false)
      setError(
        e.message ||
          'Invalid code. Double-check and enter a valid one. If the problem persists, email us at contact@antelopeinc.com.'
      )
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 text-sm">
      <h1 className="text-lg md:text-xl font-bold">Enter Code</h1>
      <p className="text-sm md:text-base">
        Please check your email for a confirmation code to receive your full
        analysis. If you don&apos;t see it, please check your spam folder.
      </p>
      <div>
        <TextField.Root
          size={windowWidth > 768 ? '3' : '1'}
          radius="large"
          placeholder="Enter your code"
          required
          style={{
            height: windowWidth > 768 ? 50 : 42,
            padding: '0 16px',
            backgroundColor: '#1E333B',
            backgroundClip: 'padding-box'
          }}
          autoFocus
          value={code}
          onChange={e => {
            setCode(e.target.value)
          }}
        >
          <TextField.Slot side="right">
            <KeyboardIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <div className="flex gap-2 h-6 p-1 text-[14px]">
          {isValidatingEmail ? (
            <>
              {spinner}
              <p>Validating your email...</p>
            </>
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
        Submit Code
      </Button>
    </form>
  )
}
