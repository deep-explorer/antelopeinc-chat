'use client'

import { BotCard } from '../stocks/message'
import { useActions, useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import * as Form from '@radix-ui/react-form'
import { TextArea, Button, Text } from '@radix-ui/themes'
import { useWindowSize } from 'usehooks-ts'
import Image from 'next/image'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import Stylizer from './stylizer'

export default function Question({
  summary,
  questions,
  onAnswers
}: {
  summary: string
  questions: string[]
  onAnswers: (answers: string[]) => void
}) {
  const { width: windowWidth } = useWindowSize()
  const [_, setMessages] = useUIState<typeof AI>()
  const [questionIndex, setQuestionIndex] = useState<Number>(0)
  const [answers, setAnswers] = useState<string[]>(new Array(5).fill(''))
  const [valueMissing, setValueMissing] = useState(true)
  const handleSelectQuestion = (index: number) => () => {
    setQuestionIndex(index)
  }
  const handleAnswers =
    (index: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let newAnswers = [...answers]
      newAnswers[index] = e.target.value
      setAnswers(newAnswers)
    }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAnswers(answers)
  }
  return (
    <>
      <Form.Root
        className="flex flex-col gap-2 md:gap-4"
        onSubmit={handleSubmit}
      >
        <Text as="div" className="text-sm md:text-base font-semibold">
          {/* Thank you for adding the link. This Textost speaks about AGI and
          estimates a potential timeline for it. To help build a piece of
          content around this topic, please can you answer the following
          questions. If you&apos;d like to skip a post, you can leave the box empty. */}
          {summary.split('\n').map((line, index) => (
            <p key={index}>
              {line}
              <br />
            </p>
          ))}
        </Text>
        <div>
          <Text as="div" weight="bold" size="2" mb="0">
            Question {(questionIndex as number) + 1}:
          </Text>
          <Text as="div" weight="bold" size="2" mb="1">
            {questions[questionIndex as number]}
          </Text>
        </div>
        <Form.Field className="" name="description">
          <Form.Control asChild>
            <TextArea
              radius="large"
              size={windowWidth > 768 ? '3' : '1'}
              resize="vertical"
              placeholder="Please write your answer here."
              // required
              autoFocus
              value={answers[questionIndex as number] || ''}
              style={{
                height: windowWidth > 768 ? 186 : 122,
                padding: '8px 16px',
                backgroundColor: '#1E333B',
                backgroundClip: 'padding-box'
              }}
              onChange={handleAnswers(questionIndex as number)}
            />
          </Form.Control>
          <div className="flex justify-center gap-2 mt-4">
            {new Array(5).fill(0).map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={handleSelectQuestion(i)}
                className={`w-[80px] h-[40px] bg-white text-black hover:bg-gray-400 ${questionIndex === i ? 'bg-gray-400' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </Form.Field>
        <Form.Submit asChild>
          <Button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#E54D2E',
              cursor: 'pointer'
            }}
            size={windowWidth > 768 ? '3' : '2'}
          >
            Submit
          </Button>
        </Form.Submit>
      </Form.Root>
    </>
  )
}
