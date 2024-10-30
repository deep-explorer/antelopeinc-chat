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
import { nanoid } from 'nanoid'
import { ThankYou } from './vitamin/sub/thank-you'
import { useWindowSize } from 'usehooks-ts'
import Image from 'next/image'
import { useState } from 'react'
import { phone } from 'phone'
import { sleep } from '@/lib/utils'

export function SendUsMessage() {
  const { width: windowWidth } = useWindowSize()
  const [_, setMessages] = useUIState<typeof AI>()
  const [serverErrors, setServerErrors] = useState({
    phoneNumber: false
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement))
    if (!phone(data.phone as string).isValid) {
      setServerErrors({
        phoneNumber: true
      })
      return
    } else {
      setServerErrors({
        phoneNumber: false
      })
    }
    // data.phone = phone(data.phone as string).phoneNumber
    //  TODO: Send data to the server

    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <ThankYou />,
        role: 'assistant'
      }
    ])
    await sleep(100) //  NOTE: to wait for actual UI update
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  }

  return (
    <div className="flex flex-col gap-1 md:gap-4">
      <h1 className="text-lg md:text-3xl font-bold">Contact Antelope</h1>
      <p className="text-sm md:text-base">
        Have a question or want to learn more? Contact Antelope and our team
        will be in touch soon.
      </p>
      <Form.Root onSubmit={onSubmit} className="flex flex-wrap">
        <Form.Field className="p-1 md:p-3 w-full md:w-[50%]" name="name">
          <Form.Control asChild>
            <TextField.Root
              size={windowWidth > 768 ? '3' : '1'}
              radius="large"
              placeholder="Your name"
              required
              style={{
                height: windowWidth > 768 ? 50 : 42,
                padding: '0 16px',
                backgroundColor: '#1E333B',
                backgroundClip: 'padding-box'
              }}
            >
              <TextField.Slot side="right">
                <PersonIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </Form.Control>
          <Form.Message
            className="opacity-[0.8] text-[#18898D] text-xs md:text-sm flex gap-1 py-1"
            match="valid"
          >
            <div className="self-center">
              <img
                src="/image-icons/valid.png"
                height={14}
                width={14}
                alt="valid"
              />
            </div>
            <p className="text-[14px]">filled</p>
          </Form.Message>
          <Form.Message
            className="flex gap-1 py-1 opacity-[0.8] text-red-500 text-xs md:text-sm"
            match="valueMissing"
          >
            <div className="self-center">
              <img
                src="/image-icons/invalid.png"
                height={14}
                width={14}
                alt="valid"
              />
            </div>
            <p className="text-[14px]">Please enter your name</p>
          </Form.Message>
        </Form.Field>

        <Form.Field className="p-1 md:p-3 w-full md:w-[50%]" name="email">
          <Form.Control asChild>
            <TextField.Root
              size={windowWidth > 768 ? '3' : '1'}
              radius="large"
              placeholder="Company Email"
              type="email"
              required
              style={{
                height: windowWidth > 768 ? 50 : 42,
                padding: '0 16px',
                backgroundColor: '#1E333B',
                backgroundClip: 'padding-box'
              }}
            >
              <TextField.Slot side="right">
                <EnvelopeClosedIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </Form.Control>
          <Form.Message
            className="opacity-[0.8] text-[#18898D] text-xs md:text-sm flex gap-1 py-1"
            match="valid"
          >
            <div className="self-center">
              <img
                src="/image-icons/valid.png"
                height={14}
                width={14}
                alt="valid"
              />
            </div>
            <p className="text-[14px]">valid email address</p>
          </Form.Message>
          <Form.Message
            className="flex gap-1 py-1 opacity-[0.8] text-red-500 text-xs md:text-sm"
            match="valueMissing"
          >
            <div className="self-center">
              <img
                src="/image-icons/invalid.png"
                height={14}
                width={14}
                alt="valid"
              />
            </div>
            <p className="text-[14px]">Please enter your email</p>
          </Form.Message>
          <Form.Message
            className="flex gap-1 py-1 opacity-[0.8] text-red-500 text-xs md:text-sm"
            match="typeMismatch"
          >
            <div className="self-center">
              <img
                src="/image-icons/invalid.png"
                height={14}
                width={14}
                alt="valid"
              />
            </div>
            <p className="text-[14px]">Please provide a valid email</p>
          </Form.Message>
        </Form.Field>

        <Form.Field
          className="p-1 md:p-3 w-full md:w-[50%]"
          name="phone"
          serverInvalid={serverErrors.phoneNumber}
        >
          <Form.Control asChild>
            <TextField.Root
              size={windowWidth > 768 ? '3' : '1'}
              radius="large"
              placeholder="Phone"
              type="tel"
              required
              style={{
                height: windowWidth > 768 ? 50 : 42,
                padding: '0 16px',
                backgroundColor: '#1E333B',
                backgroundClip: 'padding-box'
              }}
            >
              <TextField.Slot side="right">
                <PaperPlaneIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </Form.Control>
          {/* <Form.Message
            className="opacity-[0.8] text-[#18898D] text-xs md:text-sm flex gap-1 py-1"
            match="valid"
          >
            <div className="self-center">
              <img
                src="/image-icons/valid.png"
                height={14}
                width={14}
                alt="valid"
              />
            </div>
            <p className="text-[14px]">filled</p>
          </Form.Message> */}
          <Form.Message
            className="flex gap-1 py-1 opacity-[0.8] text-red-500 text-xs md:text-sm"
            match="valueMissing"
          >
            <div className="self-center">
              <img
                src="/image-icons/invalid.png"
                height={14}
                width={14}
                alt="valid"
              />
            </div>
            <p className="text-[14px]">Please enter your phone number</p>
          </Form.Message>
          {serverErrors.phoneNumber && (
            <Form.Message className="flex gap-1 py-1 opacity-[0.8] text-red-500 text-xs md:text-sm">
              <div className="self-center">
                <img
                  src="/image-icons/invalid.png"
                  height={14}
                  width={14}
                  alt="valid"
                />
              </div>
              <p className="text-[14px]">Please enter a valid phone number</p>
            </Form.Message>
          )}
        </Form.Field>
        <Form.Field className="p-1 md:p-3 w-full md:w-[50%]" name="company">
          <Form.Control asChild>
            <TextField.Root
              size={windowWidth > 768 ? '3' : '1'}
              radius="large"
              placeholder="Company"
              required
              style={{
                height: windowWidth > 768 ? 50 : 42,
                padding: '0 16px',
                backgroundColor: '#1E333B',
                backgroundClip: 'padding-box'
              }}
            >
              <TextField.Slot side="right">
                <HomeIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </Form.Control>
          <Form.Message
            className="opacity-[0.8] text-[#18898D] text-xs md:text-sm flex gap-1 py-1"
            match="valid"
          >
            <div className="self-center">
              <img
                src="/image-icons/valid.png"
                height={14}
                width={14}
                alt="valid"
              />
            </div>
            <p className="text-[14px]">filled</p>
          </Form.Message>
          <Form.Message
            className="flex gap-1 py-1 opacity-[0.8] text-red-500 text-xs md:text-sm"
            match="valueMissing"
          >
            <div className="self-center">
              <img
                src="/image-icons/invalid.png"
                height={14}
                width={14}
                alt="valid"
              />
            </div>
            <p className="text-[14px]">Please enter your company name</p>
          </Form.Message>
        </Form.Field>
        <Form.Field className="p-1 md:p-3 w-full" name="subject">
          <Form.Control asChild>
            <TextField.Root
              size={windowWidth > 768 ? '3' : '1'}
              radius="large"
              placeholder="Subject"
              required
              style={{
                height: windowWidth > 768 ? 50 : 42,
                padding: '0 16px',
                backgroundColor: '#1E333B',
                backgroundClip: 'padding-box'
              }}
            />
          </Form.Control>
          <Form.Message
            className="opacity-[0.8] text-[#18898D] text-xs md:text-sm flex gap-1 py-1"
            match="valid"
          >
            <div className="self-center">
              <img
                src="/image-icons/valid.png"
                height={14}
                width={14}
                alt="valid"
              />
            </div>
            <p className="text-[14px]">filled</p>
          </Form.Message>
          <Form.Message
            className="flex gap-1 py-1 opacity-[0.8] text-red-500 text-xs md:text-sm"
            match="valueMissing"
          >
            <div className="self-center">
              <img
                src="/image-icons/invalid.png"
                height={14}
                width={14}
                alt="valid"
              />
            </div>
            <p className="text-[14px]">Please enter a subject</p>
          </Form.Message>
        </Form.Field>

        <Form.Field className="p-1 md:p-3 w-full" name="description">
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
            className="opacity-[0.8] text-[#18898D] text-xs md:text-sm flex gap-1 py-1"
            match="valid"
          >
            <div className="self-center">
              <img
                src="/image-icons/valid.png"
                height={14}
                width={14}
                alt="valid"
              />
            </div>
            <p className="text-[14px]">filled</p>
          </Form.Message>
          <Form.Message
            className="flex gap-1 py-1 opacity-[0.8] text-red-500 text-xs md:text-sm"
            match="valueMissing"
          >
            <div className="self-center">
              <img
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
          <div className="p-1 md:p-3 w-full flex">
            <Button
              style={{ width: '100%' }}
              size={windowWidth > 768 ? '3' : '2'}
            >
              Submit
            </Button>
          </div>
        </Form.Submit>
      </Form.Root>
    </div>
  )
}
