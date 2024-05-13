'use client'

import { Button } from '@radix-ui/themes'
import { SocialRatingCard } from './sub/social-rating-card'
import { CircularGaugeCard } from './sub/circular-gauge-card'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { companyUrl } from '@/lib/constants/config'
import { ContentPerformance } from './content-performance'
import { BotCard, UserMessage } from '../stocks/message'
import { useWindowSize } from 'usehooks-ts'
import { CardSkeleton } from '../ui/card-skeleton'
import { sleep } from 'openai/core'
import { Carousel } from '../ui/carousel'
import { useState } from 'react'

export function FeedbackAnalysis() {
  const [_, setMessages] = useUIState<typeof AI>()
  const { width: windowWidth } = useWindowSize()
  const [gaugeCarouselIndex, setGaugeCarouselIndex] = useState(0)
  const [socialRatingCarouselIndex, setSocialRatingCarouselIndex] = useState(0)

  const onClick = async (index: number) => {
    if (index === 0) {
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
    } else {
      window.open(companyUrl, '_blank')
    }
  }

  return (
    <div className="flex flex-col gap-3 md:gap-6">
      <h1 className="text-lg md:text-xl font-bold">Feedback Performance</h1>
      <p className="text-sm md:text-base">
        Renzo&apos;s feedback suggests high customer appreciation for natural
        ingredients, but concerns over taste and texture could be impacting
        repeat purchases.
      </p>
      <Carousel onChange={i => setGaugeCarouselIndex(i)}>
        <CircularGaugeCard
          icon="total-review"
          title="Total Review"
          value={700}
          description="Renzo's has amassed a substantial number of reviews, indicating strong customer engagement and widespread usage."
          className="mr-3"
          isInView={gaugeCarouselIndex === 0}
        />
        <CircularGaugeCard
          icon="average-score"
          title="Average Score"
          value={550}
          description="Renzo's has amassed a substantial number of reviews, indicating strong customer engagement and widespread usage."
          className="mr-3"
          isInView={
            gaugeCarouselIndex === 1 ||
            (windowWidth > 768 && gaugeCarouselIndex === 0)
          }
        />
        <CircularGaugeCard
          icon="average-score"
          title="Average Score"
          value={660}
          description="Renzo's has amassed a substantial number of reviews, indicating strong customer engagement and widespread usage."
          className="mr-3"
          isInView={
            gaugeCarouselIndex === 2 ||
            (windowWidth > 768 && gaugeCarouselIndex === 1)
          }
        />
      </Carousel>
      <Carousel onChange={i => setSocialRatingCarouselIndex(i)}>
        <SocialRatingCard
          icon="glassdoor"
          title="Glassdoor"
          description="Renzo's employees rave about the company culture, with 92% of reviewers citing 'opportunities for growth' and 'supportive management' as key drivers of their 4.5-star average rating."
          totalRating={55}
          industryAverageTotalRating={32}
          averageScore={46}
          industryAverageScore={65}
          className="mr-3"
          isInView={socialRatingCarouselIndex === 0}
        />
        <SocialRatingCard
          icon="google"
          title="Google"
          description="Renzo's employees rave about the company culture, with 92% of reviewers citing 'opportunities for growth' and 'supportive management' as key drivers of their 4.5-star average rating."
          totalRating={77}
          industryAverageTotalRating={54}
          averageScore={45}
          industryAverageScore={68}
          className="mr-3"
          isInView={socialRatingCarouselIndex === 1}
        />
        <SocialRatingCard
          icon="google"
          title="Google"
          description="Renzo's employees rave about the company culture, with 92% of reviewers citing 'opportunities for growth' and 'supportive management' as key drivers of their 4.5-star average rating."
          totalRating={77}
          industryAverageTotalRating={54}
          averageScore={45}
          industryAverageScore={68}
          className="mr-3"
          isInView={socialRatingCarouselIndex === 2}
        />
      </Carousel>
      <p className="text-sm md:text-base">
        Deeper drilldown into feedback suggests that overall sentiment is
        overwhelmingly positive, with reviewers consistently praising innovative
        products and exceptional customer experiences
      </p>
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
    </div>
  )
}

const availableButtons = [
  {
    caption: 'Content Analysis'
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
