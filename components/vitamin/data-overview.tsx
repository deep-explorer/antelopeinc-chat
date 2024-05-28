'use client'

import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { Comparison } from './comparison'
import { antelopeEndpoint, renzoClientID } from '@/lib/constants/config'
import { BotCard, UserMessage } from '../stocks/message'
import { CardSkeleton } from '../ui/card-skeleton'
import { sleep } from 'openai/core'
import { useEffect, useState } from 'react'
import { fetcher } from '@/lib/utils'
import { ContentTemplate, IContainer } from '../content-template'
import { FooterButtonGroup } from './footer-button-group'

export function DataOverview() {
  const [_, setMessages] = useUIState<typeof AI>()
  const [content, setContent] = useState<IContainer | null>(null)

  //  TODO: combine with server component
  useEffect(() => {
    fetcher(
      `${antelopeEndpoint}/chatbots/overview?origin=leadgen&clientID=${renzoClientID}&brand=Renzo%27s%20Vitamins&since=20230401&until=20240401`
    )
      .then(res => {
        setContent(res.data)
      })
      .catch(e => console.log(e))
  }, [])

  const onClick = async () => {
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage>Start Comparison</UserMessage>
      }
    ])
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
    await sleep(500)
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: (
          <BotCard>
            <CardSkeleton />
          </BotCard>
        )
      }
    ])
    await sleep(2000)
    setMessages(currentMessages => [
      ...currentMessages.slice(0, -1),
      {
        id: nanoid(),
        display: (
          <BotCard>
            <Comparison />
          </BotCard>
        )
      }
    ])
  }

  return (
    <>
      {content ? (
        <ContentTemplate
          {...content}
          footer={
            <FooterButtonGroup
              submitCaption="Start Comparison"
              onSubmit={onClick}
            />
          }
        />
      ) : null}
    </>
  )
}
