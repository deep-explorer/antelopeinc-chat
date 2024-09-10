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

import { fetcher, safeCall, sleep } from '@/lib/utils'
import { CardSkeleton } from '../ui/card-skeleton'
import { LogoCarousel } from './sub/logo-carousel'
import { useEffect, useState } from 'react'
import { FooterButtonGroup } from './footer-button-group'
import { useParams } from 'next/navigation'
import { getMetaDataOnClient } from '@/lib/utils'
import { ClientMetadata } from '@/lib/types'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'
import { antelopeEndpoint } from '@/lib/constants/config'

export function InitialMessage() {
  const [_, setMessages] = useUIState<typeof AI>()
  const { brand } = useParams()
  const [logos, setLogos] = useState<string[]>([])
  const [metadata, setMetadata] = useState<ClientMetadata | null>(null)
  const { isBypassMode } = useFreeChatContext()
  //  TODO: combine with server component
  useEffect(() => {
    fetch(`${antelopeEndpoint}/cache/clear`)
      .then(() =>
        fetch(
          `${antelopeEndpoint}/chatbots/overview?origin=leadgen&shortcode=${brand}`
        )
      )
      .finally(() => {
        safeCall(() =>
          getMetaDataOnClient(brand).then(data => {
            setMetadata(data)
            setLogos(
              data?.children[1].urls.map((url: string) =>
                url.replaceAll('\\', '')
              )
            )
          })
        )
      })
  }, [])

  const onClick = async () => {
    const loadingTime = 2000
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: 'Start the Analysis',
        role: 'user'
      },
      {
        id: nanoid(),
        display: (
          <Loading
            logo={logos.length > 0 ? logos[0] : ''}
            loadingTime={loadingTime}
          />
        ),
        role: 'assistant'
      }
    ])
    await sleep(100) //  NOTE: to wait for actual UI update
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
    await sleep(loadingTime)
    setMessages(currentMessages => [
      ...currentMessages,
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
        {metadata && logos.length > 0 ? (
          <div className="flex flex-col gap-6 text-center">
            <h2 className="text-xl md:text-[30px] font-bold mt-2">
              {metadata.title}
            </h2>
            <LogoCarousel logos={logos} />
            <div className="flex flex-col gap-2">
              {metadata?.footer.map((f, i) => (
                <p className="text-sm md:text-lg px-2" key={i}>
                  {f}
                </p>
              ))}
            </div>
            <FooterButtonGroup
              submitCaption="Start the Analysis"
              helperText="To begin the analysis, select below:"
              onSubmit={onClick}
            />
          </div>
        ) : (
          <CardSkeleton />
        )}
      </BotCard>

      {isBypassMode && (
        <>
          <BotCard>
            <Loading
              logo={logos.length > 0 ? logos[0] : ''}
              loadingTime={2000}
            />
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
        </>
      )}
    </>
  )
}
