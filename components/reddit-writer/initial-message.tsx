'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { spinner } from '../stocks'
import { fetcher } from '@/lib/utils'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { BotCard, UserMessage } from '../stocks/message'
import { LinkedInLogoIcon } from '@radix-ui/react-icons'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'
import { EmailInputMessage } from '../email-input-message'
import { useActions, useUIState } from 'ai/rsc'
import Question from './question'
import { getSystemPrompt } from '@/lib/constants/systemPrompt'
import { getPrompt } from '@/lib/chat/getPrompt'
import { url } from 'inspector'
import { IconSpinner } from '../ui/icons'
import { ChatSpinner, RoundSpinner } from '../stocks/ChatSpinner'
import Stylizer from './stylizer'
import { useSearchParams } from 'next/navigation'
export function InitialMessage() {
  const code = useSearchParams().get('code')
  const state = useSearchParams().get('state')
  const [link, setLink] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [urlSubmitted, setUrlSubmitted] = useState(false)
  const [questionSpinner, setQuestionSpinner] = useState(false)
  const { submitUserMessage } = useActions()

  const [_, setMessages] = useUIState<typeof AI>()
  const { setLinkedinPosts } = useFreeChatContext()
  const [questions, setQuestions] = useState<string[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [answerPrompt, setAnswerPrompt] = useState<string>('')
  const [showStylizer, setShowStylizer] = useState(false)
  const [stylePrompt, setStylePrompt] = useState<string>('')
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setUrlSubmitted(true)
    setQuestions([])
    if (!link) {
      setError('Please enter a reddit URL.')
      return
    }

    const match = link.match(/\/comments\/(.*?)\//)
    const post_id = match ? match[1] : null
    if (!post_id) {
      setError('Please provide a correct post URL.')
      return
    }
    // TODO: Call reddit scraper API
    let comments: any
    console.log(code)
    try {
      comments = await fetcher(`/api/tools/reddit-writer?code=${code}`, {
        method: 'POST',
        body: JSON.stringify({ post_id })
      })
      console.log(comments)
      setLoading(false)
    } catch (e: any) {
      setLoading(false)
      setError(e.message || 'Please provide a correct post URL.')
    }

    //TODO: Call the AI system prompt
    try {
      setQuestionSpinner(true)
      const content = await getPrompt(comments.data)
      const questionsMessage = content.choices[0].message.content

      setQuestionSpinner(false)
      //TODO: Parse the questions from the response
      new Array(5).fill(0).forEach((_, i) => {
        let match = questionsMessage?.match(
          new RegExp(`<Question ${i + 1}>(.*?)<\/Question ${i + 1}>`)
        ) || []
        if (match && match[1]) {
          setQuestions(currentQuestions => [
            ...currentQuestions.slice(0, i),
            match[1],
            ...currentQuestions.slice(i + 1)
          ])
        }
      })
    } catch (e) {
      setMessages(currentMessages => [
        ...currentMessages,
        {
          id: nanoid(),
          display: (
            <p className="text-sm md:text-base font-semibold">
              Sorry, something went wrong. Please try again.
            </p>
          ),
          role: 'assistant'
        }
      ])
    }
  }
  const handleAnswers = async(answers: string[]) => {
    console.log('answers', answers)

    console.log('1111111')
    new Array(5).fill(0).forEach((_, i) => {
      setAnswerPrompt(
        answerPrompt => {
      console.log('222222222')

          return `
        ${answerPrompt}
        - Question ${i + 1}: ${questions[i]}
        - Answer: ${answers[i].length > 0 ? answers[i] : 'Skip this question'}
        `}
      )
    })
    await new Promise(resolve => setTimeout(resolve, 0));

    const responseMessage = await submitUserMessage(answerPrompt)
    setMessages(currentMessages => [...currentMessages, responseMessage])
    setShowStylizer(true)
  }
  console.log(answerPrompt)

  const handleStyle = async (styles: object[]) => {
    console.log('styles', styles)
    let format = `
        Please write this outline into a compelling Linkedin post. 
        Keep the`
    styles.forEach(style => {
      Object.entries(style).forEach(([key, value]) => {
        format += ` ${key} in ${value}, `
      })
    })
    console.log(format)
    setStylePrompt(format)
    const responseMessage = await submitUserMessage(answerPrompt + format)
    console.log(answerPrompt + format)
    setMessages(currentMessages => [...currentMessages, responseMessage])
  }
  console.log(answerPrompt)
  return (
    <div>
      <BotCard>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-1 md:gap-4 p-1 md:p-4 "
        >
          <h1 className="text-lg md:text-xl font-semibold">
            Welcome to Antelope&apos;s Reddit content ideator
          </h1>
          <p className="text-sm md:text-base">
            To begin, please input the URL of an active Reddit thread you would
            like to write about:
          </p>
          <div>
            <Input
              placeholder="https://www.reddit.com/r/content_marketing/comments/1ddabnu/does_somebody_want_to_build_his_or_her_personal/"
              className="w-full overflow-hidden bg-[#FFFFFF] dark:bg-[#071920] sm:rounded-md border-[1px] border-[#1F3C45]"
              autoFocus
              value={link}
              onChange={e => {
                setLink(e.target.value)
              }}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </BotCard>
      {urlSubmitted && !error && (
        <BotCard>
          <div className="flex gap-2 h-6 p-1">
            <div>Thank you, processing...</div>
            {isLoading && <div>{spinner}</div>}
          </div>
        </BotCard>
      )}
      {questionSpinner && !error && (
        <BotCard>
          <ChatSpinner />
        </BotCard>
      )}
      {questions.length > 0 && (
        <BotCard>
          <Question questions={questions} onAnswers={handleAnswers} />
        </BotCard>
      )}
      {showStylizer && (
        <BotCard>
          <Stylizer onStyle={handleStyle} />
        </BotCard>
      )}
    </div>
  )
}
