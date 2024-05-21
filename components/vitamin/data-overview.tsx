'use client'

import { Button } from '@radix-ui/themes'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { Comparison } from './comparison'
import {
  antelopeEndpoint,
  companyUrl,
  renzoClientID
} from '@/lib/constants/config'
import { BotCard, UserMessage } from '../stocks/message'
import { useWindowSize } from 'usehooks-ts'
import { CardSkeleton } from '../ui/card-skeleton'
import { sleep } from 'openai/core'
import { useEffect, useState } from 'react'
import { fetcher } from '@/lib/utils'
import { ContentTemplate, IContainer } from '../content-template'

export function DataOverview() {
  const [_, setMessages] = useUIState<typeof AI>()
  const { width: windowWidth } = useWindowSize()
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

  const onClick = async (index: number) => {
    if (index === 0) {
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
    } else {
      window.open(companyUrl, '_blank')
    }
  }

  return (
    <>
      {content ? (
        <ContentTemplate
          {...content}
          footer={
            <div className="flex flex-wrap">
              {availableButtons.map((availableButton, index) => (
                <div className="p-1 w-[50%]" key={index}>
                  <Button
                    onClick={() => onClick(index)}
                    size={windowWidth > 768 ? '3' : '1'}
                    style={{
                      width: '100%',
                      height: windowWidth > 768 ? 61 : 36,
                      letterSpacing: -0.5
                    }}
                  >
                    {availableButton.caption}
                  </Button>
                </div>
              ))}
            </div>
          }
        />
      ) : null}
    </>
  )
}

const availableButtons = [
  {
    caption: 'Start Comparison'
  },
  {
    caption: 'Tell Me About Antelope'
  },
  {
    caption: 'Book a Demo'
  },
  {
    caption: 'Show Me Case Studies'
  }
]
