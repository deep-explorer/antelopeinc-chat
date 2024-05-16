'use client'

import { BotCard } from '../stocks/message'
import { useActions, useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import * as Form from '@radix-ui/react-form'
import { TextArea, Button } from '@radix-ui/themes'
import { useWindowSize } from 'usehooks-ts'
import Image from 'next/image'

export function InitialMessage() {
  const { width: windowWidth } = useWindowSize()
  const [_, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement))

    const responseMessage = await submitUserMessage(data.description)
    setMessages(currentMessages => [...currentMessages, responseMessage])
  }

  return (
    <BotCard>
      <Form.Root onSubmit={onSubmit} className="flex flex-col gap-4 md:gap-8">
        <p className="font-semibold">
          To analyze your content, paste it into the field below
        </p>
        <Form.Field className="" name="description">
          <Form.Control asChild>
            <TextArea
              radius="large"
              size={windowWidth > 768 ? '3' : '1'}
              resize="vertical"
              placeholder="Tell us about your project"
              required
              style={{
                height: windowWidth > 768 ? 186 : 122,
                padding: '8px 16px',
                backgroundColor: '#1E333B',
                backgroundClip: 'padding-box'
              }}
            />
          </Form.Control>
          <Form.Message
            className="flex gap-1 py-1 opacity-[0.8] text-red-500 text-xs md:text-sm"
            match="valueMissing"
          >
            <div className="self-center">
              <Image
                src="/image-icons/invalid.png"
                height={14}
                width={14}
                alt="valid"
              />
            </div>
            <p className="text-[14px]">Please tell about your project</p>
          </Form.Message>
        </Form.Field>
        <Form.Submit asChild>
          <Button
            style={{ width: '100%' }}
            size={windowWidth > 768 ? '3' : '2'}
          >
            Submit
          </Button>
        </Form.Submit>
      </Form.Root>
    </BotCard>
  )
}
