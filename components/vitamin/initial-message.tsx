'use client'

import { Button } from '@radix-ui/themes'
import { BotCard, UserMessage } from '../stocks/message'
import { SendUsMessage } from '../send-us-message'
import { Loading } from './loading'
import { DataOverview } from './data-overview'
import { Comparison } from './comparison'
import { FeedbackAnalysis } from './feedback-analysis'
import { ContentPerformance } from './content-performance'
import { ResearchRecommendations } from './research-recommendations'
import { ThankYou } from './sub/thank-you'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { companyUrl } from '@/lib/constants/config'
import { sleep } from '@/lib/utils'
import { useWindowSize } from 'usehooks-ts'
import { CardSkeleton } from '../ui/card-skeleton'
import { LogoCarousel } from './sub/logo-carousel'

export function InitialMessage() {
  const { width: windowWidth } = useWindowSize()
  const [_, setMessages] = useUIState<typeof AI>()

  const onClick = async (index: number) => {
    if (index === 0) {
      setMessages([
        {
          id: nanoid(),
          display: <UserMessage>Start the Analysis</UserMessage>
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
              <Loading />
            </BotCard>
          )
        }
      ])
      await sleep(3000)
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
              <DataOverview />
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
      <BotCard>
        <div className="flex flex-col gap-6 text-center">
          <h2 className="text-xl md:text-[30px] font-bold mt-2">
            Children&apos;s Vitamins Analysis
          </h2>
          <LogoCarousel />
          <p className="text-sm md:text-lg px-2">
            This analysis reviews Renzo&apos;s and nine of the largest vitamin
            brands, including Flintstones, MaryRuth&apos;s, and SmartyPants. It
            reveals Renzo&apos;s strengths and weaknesses against these
            competitors and offers ways to improve its overall strategy through
            this insight.
          </p>
          <p className="text-sm md:text-base px-2">
            To begin, please select an option below:
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
      </BotCard>
      {/* 
      <BotCard>
        <Loading />
      </BotCard>
      <BotCard>
        <DataOverview />
      </BotCard>
      <BotCard>
        <Comparison />
      </BotCard>
      <BotCard>
        <FeedbackAnalysis />
      </BotCard>
      <BotCard>
        <ContentPerformance />
      </BotCard>
      <BotCard>
        <ResearchRecommendations />
      </BotCard>
      <BotCard>
        <SendUsMessage />
      </BotCard>
      <BotCard>
        <ThankYou />
      </BotCard>
      */}
    </>
  )
}

const availableButtons = [
  {
    caption: 'Start the Analysis'
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
