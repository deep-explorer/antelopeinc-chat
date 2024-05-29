'use client'

import { BotCard } from '../stocks/message'
import { Loading } from './loading'
import { DataOverview } from './data-overview'
import { Comparison } from './comparison'
import { FeedbackAnalysis } from './feedback-analysis'
import { ContentPerformance } from './content-performance'
import { ResearchRecommendations } from './research-recommendations'
import { SendUsMessage } from '../send-us-message'
import { ThankYou } from './sub/thank-you'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { antelopeEndpoint, renzoClientID } from '@/lib/constants/config'
import { fetcher, sleep } from '@/lib/utils'
import { CardSkeleton } from '../ui/card-skeleton'
import { LogoCarousel } from './sub/logo-carousel'
import { useEffect, useState } from 'react'
import { FooterButtonGroup } from './footer-button-group'

export function InitialMessage() {
  const [_, setMessages] = useUIState<typeof AI>()
  const [logos, setLogos] = useState<string[]>([])

  //  TODO: combine with server component
  useEffect(() => {
    fetcher(`${antelopeEndpoint}/clients/show?clientID=${renzoClientID}`)
      .then(res => {
        // console.log(res)
        setLogos(
          Object.values(res.data.brands).map(
            (key: any) => 'http://' + key.image.replaceAll('\\', '')
          )
        )
      })
      .catch(e => console.log(e))
  }, [])

  const onClick = async () => {
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: 'Start the Analysis',
        role: 'user'
      },
      {
        id: nanoid(),
        display: <Loading />,
        role: 'assistant'
      }
    ])
    await sleep(100) //  NOTE: to wait for actual UI update
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
    await sleep(2000)
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <CardSkeleton />,
        role: 'assistant'
      }
    ])
    await sleep(2000)
    setMessages(currentMessages => [
      ...currentMessages.slice(0, -1),
      {
        id: nanoid(),
        display: <DataOverview />,
        role: 'assistant'
      }
    ])
  }

  return (
    <>
      <BotCard>
        <div className="flex flex-col gap-6 text-center">
          <h2 className="text-xl md:text-[30px] font-bold mt-2">
            Children&apos;s Vitamins Analysis
          </h2>
          <LogoCarousel logos={logos} />
          <p className="text-sm md:text-lg px-2">
            This analysis reviews Renzo&apos;s and nine of the largest vitamin
            brands, including Flintstones, MaryRuth&apos;s, and SmartyPants. It
            reveals Renzo&apos;s strengths and weaknesses against these
            competitors and offers ways to improve its overall strategy through
            this insight.
          </p>
          <FooterButtonGroup
            submitCaption="Start the Analysis"
            onSubmit={onClick}
          />
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
