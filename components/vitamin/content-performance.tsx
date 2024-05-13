import { Button } from '@radix-ui/themes'
import { ChannelGraphCard } from './sub/channel-graph-card'
import { CircularGaugeCard } from './sub/circular-gauge-card'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { BotCard, UserMessage } from '../stocks/message'
import { ResearchRecommendations } from './research-recommendations'
import { companyUrl } from '@/lib/constants/config'
import { useWindowSize } from 'usehooks-ts'
import { CardSkeleton } from '../ui/card-skeleton'
import { sleep } from 'openai/core'
import { Carousel } from '../ui/carousel'
import { useState } from 'react'

export function ContentPerformance() {
  const [_, setMessages] = useUIState<typeof AI>()
  const { width: windowWidth } = useWindowSize()
  const [carouselIndex, setCarouselIndex] = useState(0)

  const onClick = async (index: number) => {
    if (index === 0) {
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
    } else {
      window.open(companyUrl, '_blank')
    }
  }

  return (
    <div className="flex flex-col gap-3 md:gap-6">
      <h1 className="text-lg md:text-xl font-bold">Content Performance</h1>
      <p className="text-sm md:text-base">
        Content analytics feedback suggests high engagement with informative
        articles, but concerns over content relevance and depth could be
        impacting user retention and loyalty.
      </p>
      <Carousel onChange={i => setCarouselIndex(i)}>
        <CircularGaugeCard
          icon="engagement"
          title="Engagement"
          value={920}
          description="The content portfolio has achieved a high level of thematic cohesion, indicating a strong brand voice and consistent messaging."
          className="mr-3"
          isInView={carouselIndex === 0}
        />
        <CircularGaugeCard
          icon="volume"
          title="Volume"
          value={320}
          description="The content repository has reached an unprecedented scale, with a substantial volume of assets available to support user needs"
          className="mr-3"
          isInView={carouselIndex === 1}
        />
        <CircularGaugeCard
          icon="volume"
          title="Volume"
          value={320}
          description="The content repository has reached an unprecedented scale, with a substantial volume of assets available to support user needs"
          className="mr-3"
          isInView={carouselIndex === 2}
        />
      </Carousel>

      <div className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-lg md:text-xl font-bold">Content by Channel</h2>
        <p className="text-sm md:text-base">
          Sentiment varies across different channels, with social media showing
          the most positivity, while online retail feedback indicates areas for
          improvement.
        </p>
        <Carousel>
          <ChannelGraphCard className="mr-2" />
          <ChannelGraphCard className="mr-2" />
        </Carousel>
      </div>

      <p className="text-sm md:text-base">
        As a next step, we recommend exploring some of the solutions the
        Antelope team provide for research to build upon on your strengths and
        weaknesses
      </p>

      <div className="flex flex-wrap">
        {availableButtons.map((availableButton, index) => (
          <div className="p-1 w-[50%]" key={index}>
            <Button
              onClick={() => onClick(index)}
              size={windowWidth > 768 ? '3' : '1'}
              style={{
                width: '100%',
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
    caption: 'Suggest Research'
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
