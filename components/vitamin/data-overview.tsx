'use client'

import { Button } from '@radix-ui/themes'
import { OverviewSpecCard } from './sub/overview-spec-card'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { Comparison } from './comparison'
import { companyUrl } from '@/lib/constants/config'
import { BotCard, UserMessage } from '../stocks/message'
import { useWindowSize } from 'usehooks-ts'
import { CardSkeleton } from '../ui/card-skeleton'
import { sleep } from 'openai/core'

export function DataOverview() {
  const [_, setMessages] = useUIState<typeof AI>()
  const { width: windowWidth } = useWindowSize()

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
    <div className="flex flex-col gap-4">
      <h1 className="text-lg md:text-xl font-bold">Data Overview</h1>
      <p className="text-sm md:text-base">
        We&apos;ve ingested over 3 million data points for you and your closest
        competitors in the children&apos;s vitamin industry. Next, we&apos;ll
        compare these data points to your industry benchmarks to identify your
        strengths and weaknesses.
      </p>
      <div className="flex flex-wrap">
        {overviewSpecs.map((overviewSpec, index) => (
          <div className="p-1 md:p-2 w-[50%]" key={index}>
            <OverviewSpecCard {...overviewSpec} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap">
        {availableButtons.map((availableButton, index) => (
          <div className="p-1 w-full md:w-[50%]" key={index}>
            <Button
              onClick={() => onClick(index)}
              size={windowWidth > 768 ? '3' : '1'}
              style={{
                width: '100%'
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

const overviewSpecs = [
  {
    icon: 'customer-reviews',
    score: '50.2K',
    title: 'Customer Reviews',
    tooltipDescription:
      'Total number of customer reviews collected across all platforms. Reviews help gauge customer satisfaction and provide valuable feedback.'
  },
  {
    icon: 'earn-media',
    score: '2.3M',
    title: 'Earn Media',
    tooltipDescription:
      'Influencer activity looks at the relative share of sponsored mentions and engagement among competitors'
  },
  {
    icon: 'paid-ads',
    score: '1.2K',
    title: 'Paid Ads',
    tooltipDescription:
      'Count of paid advertising campaigns conducted. This metric highlights the scale of paid promotional efforts.'
  },
  {
    icon: 'organic-content',
    score: '7,532',
    title: 'Organic Content',
    tooltipDescription:
      'Total pieces of content created in-house that have been published. Indicates the level of active content marketing.'
  },
  {
    icon: 'influencer-post',
    score: '203',
    title: 'Influencer Post',
    tooltipDescription:
      'Number of posts made by influencers promoting your products. Reflects the reach and impact of influencer marketing.'
  },
  {
    icon: 'social-comments',
    score: '3.4B',
    title: 'Social Comments',
    tooltipDescription:
      'Aggregate of comments received on social media platforms. This measure helps understand audience engagement and interaction levels.'
  }
]

const availableButtons = [
  {
    caption: 'Start Comparison'
  },
  {
    caption: 'Tell Me More About Antelope'
  },
  {
    caption: 'Book a Demo'
  },
  {
    caption: 'Show Me Case Studies'
  }
]
