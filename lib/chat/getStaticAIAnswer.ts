'use server'
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
import { getSystemPrompt } from '@/lib/constants/systemPrompt'
import { nanoid } from 'nanoid'
import { UIState, Message } from '@/lib/chat/actions'
import { useFreeChatContext } from '../hooks/use-free-chat'

type RoleType = Pick<Message, 'role'>
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

export async function getStaticAIAnswer(content: any, systemPromptType?:string, role?: any) {

  let systemPrompt = ''
  switch(systemPromptType) {
    case 'reddit-writer':
      systemPrompt = getSystemPrompt('reddit-writer')
      break
    case 'thread':
      systemPrompt = getSystemPrompt('thread')
      break
    case 'comment':
      systemPrompt = getSystemPrompt('comment')
      break
    case 'feedback': 
      systemPrompt = getSystemPrompt('feedback')
      break
    default:
      systemPrompt = getSystemPrompt('reddit-writer')
  }
  try {
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
  } catch (error) {
    console.log(error)
    return ''
  }
  
}
