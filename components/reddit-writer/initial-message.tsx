'use client'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { spinner } from '../stocks'
import { fetcher, sleep } from '@/lib/utils'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { BotCard, UserMessage } from '../stocks/message'
import { LinkedInLogoIcon } from '@radix-ui/react-icons'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'
import { EmailInputMessage } from '../email-input-message'
import { useActions, useUIState } from 'ai/rsc'
import Question from './question'
import { getSystemPrompt } from '@/lib/constants/systemPrompt'
import { getStaticAIAnswer } from '@/lib/chat/getStaticAIAnswer'
import { url } from 'inspector'
import { IconSpinner } from '../ui/icons'
import { ChatSpinner, RoundSpinner } from '../stocks/ChatSpinner'
import Stylizer from './stylizer'
import { useSearchParams } from 'next/navigation'
type Response = {
  title: string
  comments: string
}
export function InitialMessage() {
  const code = useSearchParams().get('code')
  const state = useSearchParams().get('state')
  const [link, setLink] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [urlSubmitted, setUrlSubmitted] = useState(false)
  const [questionSpinner, setQuestionSpinner] = useState(false)
  const [wentWrong, setWentWrong] = useState(false)
  const { submitUserMessage } = useActions()

  const [_, setMessages] = useUIState<typeof AI>()
  const { setLinkedinPosts } = useFreeChatContext()
  const [questions, setQuestions] = useState<string[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [answerPrompt, setAnswerPrompt] = useState<string>('')
  const [showStylizer, setShowStylizer] = useState(false)
  const [stylePrompt, setStylePrompt] = useState<string>('')
  const [threadAnswer, setThreadAnswer] = useState<string>('')
  const [summary, setSummary] = useState<string>('')
  const [response, setResponse] = useState<Response>({
    title: '',
    comments: ''
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setUrlSubmitted(true)
    setQuestions([])
    setShowStylizer(false)
    setWentWrong(false)

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
    let res: any
    try {
      res = await fetcher(`/api/tools/reddit-writer?code=${code}`, {
        method: 'POST',
        body: JSON.stringify({ post_id })
      })
      setResponse(res.data)
    } catch (e: any) {
      setLoading(false)
      setError(e.message || 'Please provide a correct post URL.')
    }

    //TODO: Call the AI system prompt
    try {
      setQuestionSpinner(true)
      let title = (await getStaticAIAnswer(res.data.title, 'thread')) || ''
      if (title.length == 0) {
        setError('Internal Error!  Please try again later.')
        return
      }
      title = `Thank you for adding the link. ${title ? title : link}
       To help build a piece of content around this topic, please can you answer the following questions.\n
       If you'd like to skip a question, you can leave the box empty.`
      setSummary(title)

      let q =
        (await getStaticAIAnswer(res.data.comments, 'reddit-writer')) || ''
      if (q.length == 0) {
        setError('Internal Error! Please try again later.')
        return
      }
      setLoading(false)
      setQuestionSpinner(false)

      //TODO: Parse the questions from the response
      new Array(5).fill(0).forEach((_, i) => {
        let match =
          q?.match(
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
      await sleep(100) //  NOTE: to wait for actual UI update
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      })
    } catch (e) {
      setLoading(false)
      setWentWrong(true)
      setQuestionSpinner(false)
    }
  }
  const handleAnswers = async (answers: string[]) => {
    setAnswerPrompt(
      '------------------------My answers to the questions on above comments------------------------\n'
    )
    setShowStylizer(true)
    await sleep(100) //  NOTE: to wait for actual UI update
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
    new Array(5).fill(0).forEach((_, i) => {
      setAnswerPrompt(answerPrompt => {
        return `
        ${answerPrompt}
        - Question ${i + 1}: ${questions[i]}
        - Answer: ${answers[i].length > 0 ? answers[i] : "I don't know"}
        `
      })
    })
    await new Promise(resolve => setTimeout(resolve, 0))
  }

  const handleStyle = async (styles: string) => {
    setStylePrompt(styles)

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
    var prompt =
      getSystemPrompt('comment') +
      response.comments +
      answerPrompt +
      styles +
      `\n So far, I have included all the comments and answers to the questions, Please write the response as required and please use pretty many emojis and decorate the text as possible\n
      You start writing with the below.
      "Thank you!, Here is your post:
      ------------------------------------------------------------------------------------------
      <Your answer here>
      `
    const responseMessage = await submitUserMessage(prompt, 'reddit-writer')

    setMessages(currentMessages => [...currentMessages, responseMessage])
    setUrlSubmitted(false)
  }
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
          <div className="flex flex-col">
            <Input
              placeholder="https://www.reddit.com/r/content_marketing/comments/1ddabnu/does_somebody_want_to_build_his_or_her_personal/"
              className="w-full overflow-hidden bg-[#FFFFFF] dark:bg-[#071920] sm:rounded-md border-[1px] border-[#1F3C45]"
              autoFocus
              value={link}
              onChange={e => {
                setLink(e.target.value)
              }}
            />
            {error && <div className="text-primary">{error}</div>}
          </div>
          <Button type="submit" disabled={urlSubmitted && !wentWrong && !error}>
            Submit
          </Button>
        </form>
      </BotCard>
      {urlSubmitted && !error && !wentWrong && (
        <BotCard>
          <div className="flex gap-2 h-6 p-1">
            <div>Thank you, processing...</div>
            {isLoading && <div>{spinner}</div>}
          </div>
        </BotCard>
      )}
      {wentWrong && (
        <BotCard>
          <p className="text-sm md:text-base font-semibold">
            Sorry, something went wrong. Please try again.
          </p>
        </BotCard>
      )}
      {questions.length > 0 && (
        <BotCard>
          <Question
            summary={summary}
            questions={questions}
            onAnswers={handleAnswers}
          />
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
