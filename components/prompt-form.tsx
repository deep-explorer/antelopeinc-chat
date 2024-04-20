'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { useDropzone } from 'react-dropzone'
import { useActions, useUIState } from 'ai/rsc'

import { SpinnerMessage, UserMessage } from './stocks/message'
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
import { fetcher } from '@/lib/utils'
import { FileIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'

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
              processMessage('file', data.content, acceptedFiles[0].name)
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

  const processMessage = async (
    type: 'normal' | 'file' | 'profileLink',
    text: string,
    reference?: string
  ) => {
    // Optimistically add user message UI
    let display = <></>

    switch (type) {
      case 'file':
        display = (
          <UserMessage>
            <div className="flex gap-2">
              <FileIcon />
              {reference}
            </div>
          </UserMessage>
        )
        break
      case 'profileLink':
        display = (
          <UserMessage>
            <div className="flex gap-2">
              <LinkedInLogoIcon />
              {reference}
            </div>
          </UserMessage>
        )
        break
      default:
        display = <UserMessage>{text}</UserMessage>
    }

    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display
      }
    ])

    if (type === 'profileLink') {
      //  show spinner while fetching data from rapid api
      setMessages(currentMessages => [
        ...currentMessages,
        {
          id: nanoid(),
          display: <SpinnerMessage />
        }
      ])
      const response = await fetcher(`/api?profileUrl=${input}`)
      text = JSON.stringify(response)

      //  pop after fetching
      setMessages(currentMessages => {
        let temp = [...currentMessages]
        temp.pop()
        return [...temp]
      })
    }

    // Submit and get response message
    const responseMessage = await submitUserMessage(text)
    setMessages(currentMessages => [...currentMessages, responseMessage])
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    // Blur focus on mobile
    if (window.innerWidth < 600) {
      e.target['message']?.blur()
    }

    //  check if it is linkedin profile link
    const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/
    if (regex.test(input)) {
      try {
        processMessage('profileLink', '', input)
      } catch (e) {
        console.log(e)
      }
    } else {
      processMessage('normal', input)
    }
    setInput('')
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="max-w-[940px] min-w-[350px] w-full flex bg-[#CDE2E7] dark:bg-[#071920] rounded-md md:rounded-lg border-black dark:border-white border-2 relative max-h-20 overflow-auto  p-1 md:pl-8 pr-0 cursor-not-allowed"
    >
      <div className="flex justify-center items-center">
        <Button
          variant="default"
          {...getRootProps()}
          type="button"
          disabled={true}
        >
          <input disabled={true} {...getInputProps()} />
          <IconPlus />
          <p className="hidden md:block">File</p>
        </Button>
      </div>
      <Textarea
        ref={inputRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        placeholder="Message Antelope"
        className="min-h-[60px] max-h-16 w-full resize-none bg-transparent p-1 md:pl-4 md:pr-14 py-[1.3rem] focus-within:outline-none sm:text-sm cursor-not-allowed"
        disabled={true}
        // autoFocus
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        name="message"
        rows={1}
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <div className="absolute right-2 top-[13px] sm:right-4">
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
                    <path stroke="none" d="M0 0h24v24H0z" />
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
    </form>
  )
}
