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
import { fetcher } from '@/lib/utils'
import { FileIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import { usePathname } from 'next/navigation'

export function PromptForm({
  input,
  setInput
}: {
  input: string
  setInput: (value: string) => void
}) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState<typeof AI>()
  const pathname = usePathname()

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
    let display: React.ReactElement | string = <></>

    switch (type) {
      case 'file':
        display = (
          <div className="flex gap-2">
            <FileIcon />
            {reference}
          </div>
        )
        break
      case 'profileLink':
        display = (
          <div className="flex gap-2">
            <LinkedInLogoIcon />
            {reference}
          </div>
        )
        break
      default:
        display = text
    }

    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display,
        role: 'user'
      }
    ])

    if (type === 'profileLink') {
      //  show spinner while fetching data from rapid api
      setMessages(currentMessages => [
        ...currentMessages,
        {
          id: nanoid(),
          display: <SpinnerMessage />,
          role: 'assistant'
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
    <div className="flex justify-center">
      <div className="fixed z-10 bottom-0 max-w-[350px] md:max-w-[876px] w-full">
        <div className="w-full rounded-lg p-2 md:p-4 bg-[#122830] shadow-xl">
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="flex bg-[#CDE2E7] dark:bg-[#071920] rounded-md md:rounded-lg border-[#35474F] border-2 relative max-h-20 overflow-auto  p-1 md:pl-8 pr-0"
          >
            {pathname === '/tools/linkedin-analyzer' && (
              <div className="flex justify-center items-center">
                <Button variant="default" {...getRootProps()} type="button">
                  <input {...getInputProps()} />
                  <IconPlus />
                  <p className="hidden md:block">File</p>
                </Button>
              </div>
            )}
            <Textarea
              ref={inputRef}
              tabIndex={0}
              onKeyDown={onKeyDown}
              placeholder="Message Antelope"
              className={`min-h-[48px] max-h-16 w-full resize-none bg-transparent p-1 md:pl-4 md:pr-14 py-3 focus-within:outline-none sm:text-sm ${pathname !== '/renzos' ? 'cursor-not-allowed' : ''}`}
              disabled={pathname !== '/renzos'}
              // autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              name="message"
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{ height: 48 }}
            />
            <div className="absolute right-2 top-[13px] sm:right-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={'outline'}
                    type="submit"
                    size="icon"
                    disabled={input === '' || pathname !== '/renzos'}
                  >
                    <span>
                      <div
                        role="button"
                        className="send-btn relative right-[-3px] size-[28px] rounded-lg rount send-btn text-base flex justify-center items-center bg-[transparent] hover:bg-darken2 cursor-pointer opacity-30 pointer-events-none"
                      >
                        <svg
                          className="size-4"
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
        </div>
        <div className="h-8 bg-gradient-to-b opacity-gradient" />
      </div>
    </div>
  )
}
