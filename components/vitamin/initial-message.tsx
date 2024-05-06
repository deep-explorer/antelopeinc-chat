'use client'

import { Button } from '@radix-ui/themes'
import { BotCard, UserMessage } from '../stocks/message'
import Image from 'next/image'
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

export function InitialMessage() {
  const { width: windowWidth } = useWindowSize()
  const [_, setMessages] = useUIState<typeof AI>()

  const onClick = async (index: number) => {
    if (index === 0) {
      setMessages([
        {
          id: nanoid(),
          display: <UserMessage>Start the Analysis</UserMessage>
        },
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
      setMessages([
        {
          id: nanoid(),
          display: <UserMessage>Start the Analysis</UserMessage>
        },
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
          <h2 className="text-2xl md:text-[40px] font-bold mt-2">
            Children&apos;s Vitamins Analysis
          </h2>
          <div className="flex gap-4 items-center w-full overflow-auto pb-2">
            <Image
              src="/vitamin/logos/renzo.png"
              height={windowWidth > 768 ? 104 : 48}
              width={windowWidth > 768 ? 104 : 48}
              className="rounded-full"
              alt="renzo-logo"
            />
            <div className="rounded-full size-8 p-2 bg-[#2F616A]">
              <p className="text-xs">vs</p>
            </div>
            <Image
              src="/vitamin/logos/flintstonesvitamins.png"
              height={windowWidth > 768 ? 104 : 48}
              width={windowWidth > 768 ? 104 : 48}
              className="rounded-full"
              alt="flintstones-logo"
            />
            <Image
              src="/vitamin/logos/maryruthorganics.png"
              height={windowWidth > 768 ? 104 : 48}
              width={windowWidth > 768 ? 104 : 48}
              className="rounded-full"
              alt="flintstones-logo"
            />
            <Image
              src="/vitamin/logos/smartypantsvitamins.png"
              height={windowWidth > 768 ? 104 : 48}
              width={windowWidth > 768 ? 104 : 48}
              className="rounded-full"
              alt="flintstones-logo"
            />
            <Image
              src="/vitamin/logos/naturesway.png"
              height={windowWidth > 768 ? 104 : 48}
              width={windowWidth > 768 ? 104 : 48}
              className="rounded-full"
              alt="flintstones-logo"
            />
          </div>
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
      </BotCard> */}
    </>
  )
}

const availableButtons = [
  {
    caption: 'Start the Analysis'
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
