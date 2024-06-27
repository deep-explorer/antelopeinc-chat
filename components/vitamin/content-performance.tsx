import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { ResearchRecommendations } from './research-recommendations'
import { antelopeEndpoint } from '@/lib/constants/config'
import { useEffect, useState } from 'react'
import { ContentTemplate, IContainer } from '../content-template'
import { fetcher, safeCall } from '@/lib/utils'
import { FooterButtonGroup } from './footer-button-group'
import { showPrompts } from '@/lib/chat/prompt'
import { useParams } from 'next/navigation'
import { CardSkeleton } from '../ui/card-skeleton'

export function ContentPerformance() {
  const [_, setMessages] = useUIState<typeof AI>()
  const { brand } = useParams()

  const [contentPerformance, setContentPerformance] =
    useState<IContainer | null>(null)
  const [channelContentPerformance, setChannelContentPerformance] =
    useState<IContainer | null>(null)

  //  TODO: combine with server component
  useEffect(() => {
    safeCall(() =>
      fetcher(
        `${antelopeEndpoint}/chatbots/content?origin=leadgen&shortcode=${brand}`
      ).then(res => {
        setContentPerformance(res.data)
      })
    )
    safeCall(() =>
      fetcher(
        `${antelopeEndpoint}/chatbots/channelContent?origin=leadgen&shortcode=${brand}`
      ).then(res => {
        setChannelContentPerformance(res.data)
      })
    )
  }, [])

  const onClick = async () => {
    await showPrompts(
      'Suggest Research',
      <ResearchRecommendations />,
      setMessages
    )
  }

  return (
    <>
      {contentPerformance && channelContentPerformance ? (
        <ContentTemplate
          {...contentPerformance}
          footerComponent={
            <>
              <ContentTemplate {...channelContentPerformance} />
              <p className="text-sm md:text-base">
                As a next step, we recommend exploring some of the solutions the
                Antelope team provide for research to build upon on your
                strengths and weaknesses
              </p>
              <FooterButtonGroup
                submitCaption="Suggest Research"
                helperText="To get strategic recommendations, select below:"
                onSubmit={onClick}
              />
            </>
          }
        />
      ) : (
        <CardSkeleton />
      )}
    </>
  )
}
