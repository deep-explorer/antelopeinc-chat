'use client'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import {
  PersonIcon,
  EnvelopeClosedIcon,
  PaperPlaneIcon,
  HomeIcon
} from '@radix-ui/react-icons'
import * as Form from '@radix-ui/react-form'
import { TextArea, TextField, Button } from '@radix-ui/themes'

export function SendUsMessage() {
  const [_, setMessages] = useUIState<typeof AI>()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement))
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-1 md:gap-4">
      <h1 className="text-lg md:text-xl font-semibold">Send Us a Message</h1>
      <p className="text-sm md:text-base">
        Have a question or want to learn more? Send us a message and our team
        will be in touch soon.
      </p>
      <Form.Root onSubmit={onSubmit} className="flex flex-wrap">
        <Form.Field className="p-3 w-full md:w-[50%]" name="name">
          <Form.Control asChild>
            <TextField.Root
              size="3"
              radius="large"
              placeholder="Your name"
              required
            >
              <TextField.Slot side="right">
                <PersonIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </Form.Control>
          <Form.Message
            className="opacity-[0.8] text-red-500"
            match="valueMissing"
          >
            Please enter your name
          </Form.Message>
        </Form.Field>

        <Form.Field className="p-3 w-full md:w-[50%]" name="email">
          <Form.Control asChild>
            <TextField.Root
              size="3"
              radius="large"
              placeholder="Company Email"
              type="email"
              required
            >
              <TextField.Slot side="right">
                <EnvelopeClosedIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </Form.Control>
          <Form.Message
            className="opacity-[0.8] text-red-500"
            match="valueMissing"
          >
            Please enter your email
          </Form.Message>
          <Form.Message
            className="opacity-[0.8] text-red-500"
            match="typeMismatch"
          >
            Please provide a valid email
          </Form.Message>
        </Form.Field>

        <Form.Field className="p-3 w-full md:w-[50%]" name="phone">
          <Form.Control asChild>
            <TextField.Root
              size="3"
              radius="large"
              placeholder="Phone"
              type="tel"
              required
            >
              <TextField.Slot side="right">
                <PaperPlaneIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </Form.Control>
          <Form.Message
            className="opacity-[0.8] text-red-500"
            match="valueMissing"
          >
            Please enter your phone number
          </Form.Message>
          <Form.Message
            className="opacity-[0.8] text-red-500"
            match="typeMismatch"
          >
            Please enter a valid phone number
          </Form.Message>
        </Form.Field>
        <Form.Field className="p-3 w-full md:w-[50%]" name="company">
          <Form.Control asChild>
            <TextField.Root
              size="3"
              radius="large"
              placeholder="Company"
              required
            >
              <TextField.Slot side="right">
                <HomeIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </Form.Control>
          <Form.Message
            className="opacity-[0.8] text-red-500"
            match="valueMissing"
          >
            Please enter your company name
          </Form.Message>
        </Form.Field>
        <Form.Field className="p-3 w-full" name="subject">
          <Form.Control asChild>
            <TextField.Root
              size="3"
              radius="large"
              placeholder="Subject"
              required
            />
          </Form.Control>
          <Form.Message
            className="opacity-[0.8] text-red-500"
            match="valueMissing"
          >
            Please enter a subject
          </Form.Message>
        </Form.Field>

        <Form.Field className="p-3 w-full" name="description">
          <Form.Control asChild>
            <TextArea
              radius="large"
              size={'3'}
              className="h-[180px]"
              resize="vertical"
              placeholder="Tell us about your project"
              required
            />
          </Form.Control>
          <Form.Message
            className="opacity-[0.8] text-red-500"
            match="valueMissing"
          >
            Please tell about your project
          </Form.Message>
        </Form.Field>
        <Form.Submit asChild>
          <div className="p-3 w-full flex">
            <Button style={{ width: '100%' }} size={'3'}>
              Start Analysis
            </Button>
          </div>
        </Form.Submit>
      </Form.Root>
    </div>
  )
}
