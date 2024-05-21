import { Button } from '@radix-ui/themes'
import { MapChart } from './sub/map-chart'
// import { CircularGaugeCard } from './sub/gauge-card'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { BotCard, UserMessage } from '../stocks/message'
import { ResearchRecommendations } from './research-recommendations'
import {
  antelopeEndpoint,
  companyUrl,
  renzoClientID
} from '@/lib/constants/config'
import { useWindowSize } from 'usehooks-ts'
import { CardSkeleton } from '../ui/card-skeleton'
import { sleep } from 'openai/core'
import { Carousel } from '../ui/carousel'
import { useEffect, useState } from 'react'
import { ContentTemplate, IContainer } from '../content-template'
import { fetcher } from '@/lib/utils'

export function ContentPerformance() {
  const [_, setMessages] = useUIState<typeof AI>()
  const { width: windowWidth } = useWindowSize()
  const [carouselIndex, setCarouselIndex] = useState(0)

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
            </>
          }
        />
      )}
    </>
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
