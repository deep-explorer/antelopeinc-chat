'use client'

import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { antelopeEndpoint, renzoClientID } from '@/lib/constants/config'
import { ContentPerformance } from './content-performance'
import { BotCard, UserMessage } from '../stocks/message'
import { CardSkeleton } from '../ui/card-skeleton'
import { sleep } from 'openai/core'
import { Carousel } from '../ui/carousel'
import { useEffect, useState } from 'react'
import { ContentTemplate, IContainer } from '../content-template'
import { fetcher } from '@/lib/utils'
import { SocialRatingCard } from './sub/social-rating-card'
import { FooterButtonGroup } from './footer-button-group'

export function FeedbackAnalysis() {
  const [_, setMessages] = useUIState<typeof AI>()

  const [feedbackContent, setFeedbackContent] = useState<IContainer | null>(
    null
  )
  //  TODO: normalization
  const [channelFeedbackContent, setChannelFeedbackContent] =
    useState<any>(null)

  //  TODO: combine with server component
  useEffect(() => {
    fetcher(
      `${antelopeEndpoint}/chatbots/feedback?origin=leadgen&clientID=${renzoClientID}&brand=Renzo%27s%20Vitamins&since=20230401&until=20240401`
    )
      .then(res => {
        setFeedbackContent(res.data)
      })
      .catch(e => console.log(e))
    fetcher(
      `${antelopeEndpoint}/chatbots/channelFeedback?origin=leadgen&clientID=${renzoClientID}&brand=Renzo%27s%20Vitamins&since=20230401&until=20240401`
    )
      .then(res => {
        setChannelFeedbackContent(res.data)
      })
      .catch(e => console.log(e))
  }, [])

  const onClick = async () => {
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage>Content Analysis</UserMessage>
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
            <ContentPerformance />
          </BotCard>
        )
      }
    ])
  }

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      {feedbackContent && channelFeedbackContent && (
        <ContentTemplate
          {...feedbackContent}
          footer={
            <>
              {/* <ContentTemplate {...channelFeedbackContent} />
               */}
            </>
          }
        />
      )}

      {channelFeedbackContent && (
        <Carousel>
          {channelFeedbackContent.children.map((child: any, index: number) => (
            <SocialRatingCard
              icon={child.icon ?? 'customer-reviews'}
              title={child.header}
              description={child.texts[0]}
              totalRating={child.children[0].value.percent}
              industryAverageTotalRating={child.children[0].industry}
              averageScore={child.children[1].value.percent}
              industryAverageScore={child.children[1].industry}
              className="mr-3"
              key={index}
            />
          ))}
        </Carousel>
      )}
      <p className="text-sm md:text-base">
        Deeper drilldown into feedback suggests that overall sentiment is
        overwhelmingly positive, with reviewers consistently praising innovative
        products and exceptional customer experiences
      </p>
      <FooterButtonGroup submitCaption="Content Analysis" onSubmit={onClick} />
    </div>
  )
}
