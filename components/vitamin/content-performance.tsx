import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { BotCard, UserMessage } from '../stocks/message'
import { ResearchRecommendations } from './research-recommendations'
import { antelopeEndpoint, renzoClientID } from '@/lib/constants/config'
import { CardSkeleton } from '../ui/card-skeleton'
import { sleep } from 'openai/core'
import { useEffect, useState } from 'react'
import { ContentTemplate, IContainer } from '../content-template'
import { fetcher } from '@/lib/utils'
import { FooterButtonGroup } from './footer-button-group'

export function ContentPerformance() {
  const [_, setMessages] = useUIState<typeof AI>()

  const [contentPerformance, setContentPerformance] =
    useState<IContainer | null>(null)
  const [channelContentPerformance, setChannelContentPerformance] =
    useState<IContainer | null>(null)

  //  TODO: combine with server component
  useEffect(() => {
    fetcher(
      `${antelopeEndpoint}/chatbots/content?origin=leadgen&clientID=${renzoClientID}&brand=Renzo%27s%20Vitamins&since=20230401&until=20240401`
    )
      .then(res => {
        setContentPerformance(res.data)
      })
      .catch(e => console.log(e))
    fetcher(
      `${antelopeEndpoint}/chatbots/channelContent?origin=leadgen&clientID=${renzoClientID}&brand=Renzo%27s%20Vitamins&since=20230401&until=20240401`
    )
      .then(res => {
        setChannelContentPerformance(res.data)
      })
      .catch(e => console.log(e))
  }, [])

  const onClick = async () => {
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage>Suggest Research</UserMessage>
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
            <ResearchRecommendations />
          </BotCard>
        )
      }
    ])
  }

  return (
    <>
      {contentPerformance && channelContentPerformance && (
        <ContentTemplate
          {...contentPerformance}
          footer={
            <>
              <ContentTemplate {...channelContentPerformance} />
              <p className="text-sm md:text-base">
                As a next step, we recommend exploring some of the solutions the
                Antelope team provide for research to build upon on your
                strengths and weaknesses
              </p>
              <FooterButtonGroup
                submitCaption="Suggest Research"
                onSubmit={onClick}
              />
            </>
          }
        />
      )}
    </>
  )
}
