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

type RoleType = Pick<Message, 'role'>

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

export async function getPrompt(content: string, role?: any) {

  let systemPrompt = getSystemPrompt('reddit-writer')

  console.log('chatId', content)
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: role || 'user',
        content
      }
    ],
    model: 'gpt-4o'
  })

  return completion
}
