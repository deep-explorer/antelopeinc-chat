'use client'
import OpenAI from 'openai'
import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  render,
  createStreamableValue
} from 'ai/rsc'
import { AI } from './actions'
import { getRedditPrompt, getSystemPrompt } from '@/lib/constants/systemPrompt'
import { nanoid } from 'nanoid'
import { UIState, Message } from '@/lib/chat/actions'
import { useFreeChatContext } from '../hooks/use-free-chat'

type RoleType = Pick<Message, 'role'>
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

export async function getPrompt(content: any, systemPromptType?:string, role?: any) {

  let systemPrompt = ''
  switch(systemPromptType) {
    case 'reddit-writer':
      systemPrompt = getSystemPrompt('reddit-writer')
      break
    case 'thread':
      systemPrompt = getRedditPrompt('thread')
      break
    case 'comment':
      systemPrompt = getRedditPrompt('comment')
      break
    case 'feedback': 
      systemPrompt = getRedditPrompt('feedback')
      break
    default:
      systemPrompt = getSystemPrompt('reddit-writer')
  }
  const answer = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: systemPrompt
      },
      { 
        role: 'user', 
        content: content 
      }
    ],
    model: 'gpt-4o'
  })
  return answer.choices[0].message.content
}
