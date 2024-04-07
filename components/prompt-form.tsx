'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { useDropzone } from 'react-dropzone'
import { useActions, useUIState } from 'ai/rsc'

import { UserMessage } from './stocks/message'
import { type AI } from '@/lib/chat/actions'
import { Button } from '@/components/ui/button'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'

export function PromptForm({
  input,
  setInput
}: {
  input: string
  setInput: (value: string) => void
}) {
  const router = useRouter()
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState<typeof AI>()

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      const formData = new FormData()
      formData.append('file', acceptedFiles[0])
      fetch('/api', {
        method: 'POST',
        body: formData
      })
        .then(res =>
          res
            .json()
            .then(data => {
              setInput(data.content)
              console.log(data.content)
              processMessage(data.content)
            })
            .catch(e => console.log(e))
        )
        .catch(e => console.log(e))
    },
    multiple: false,
    accept: {
      'application/text': ['.txt']
    }
  })

  // React.useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus()
  //   }
  // }, [])

  const processMessage = async (text?: string) => {
    const value = text || input.trim()
    console.log({ value })
    setInput('')
    if (!value) return

    // Optimistically add user message UI
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage>{value}</UserMessage>
      }
    ])

    // Submit and get response message
    const responseMessage = await submitUserMessage(value)
    setMessages(currentMessages => [...currentMessages, responseMessage])
  }
  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault()

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target['message']?.blur()
        }

        processMessage()
      }}
      className="w-[940px] "
    >
      <div className="relative flex max-h-60 w-full grow  overflow-hidden bg-[#FFFFFF] dark:bg-[#071920] px-8 sm:rounded-md border-[1px] border-[#1F3C45] sm:px-12">
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4"
              onClick={() => {
                router.push('/new')
              }}
            >
              <IconPlus />
              <span className="sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip> */}
        <div className="flex justify-center items-center">
          <Button variant="default" {...getRootProps()}>
            <input {...getInputProps()} />
            <IconPlus />
            File
          </Button>
        </div>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Message Antelope"
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          // autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div className="absolute right-0 top-[13px] sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={'outline'}
                type="submit"
                size="icon"
                disabled={input === ''}
              >
                <span>
                  <div
                    role="button"
                    className="send-btn relative right-[-3px] h-[28px] w-[28px] rounded-lg rount send-btn text-base flex justify-center items-center bg-[transparent] hover:bg-darken2 cursor-pointer opacity-30 pointer-events-none"
                  >
                    <svg
                      className="h-4 w-4 "
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {' '}
                      <path stroke="none" d="M0 0h24v24H0z" />{' '}
                      <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" />
                    </svg>
                  </div>
                </span>

                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
