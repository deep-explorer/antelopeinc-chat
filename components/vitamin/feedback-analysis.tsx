'use client'

import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { antelopeEndpoint } from '@/lib/constants/config'
import { ContentPerformance } from './content-performance'
import { Carousel } from '../ui/carousel'
import { useEffect, useState } from 'react'
import { ContentTemplate, IContainer } from '../content-template'
import { fetcher, safeCall } from '@/lib/utils'
import { SocialRatingCard } from './sub/social-rating-card'
import { FooterButtonGroup } from './footer-button-group'
import { showPrompts } from '@/lib/chat/prompt'
import { useParams } from 'next/navigation'
import { CardSkeleton } from '../ui/card-skeleton'

export function FeedbackAnalysis() {
  const [_, setMessages] = useUIState<typeof AI>()
  const { brand } = useParams()
  const [carouselProgress, setCarouselProgress] = useState(0)

  const [feedbackContent, setFeedbackContent] = useState<IContainer | null>(
    null
  )
  //  TODO: normalization
  const [channelFeedbackContent, setChannelFeedbackContent] =
    useState<any>(null)

  //  TODO: combine with server component
  useEffect(() => {
    safeCall(() =>
      fetcher(
        `${antelopeEndpoint}/chatbots/feedback?origin=leadgen&shortcode=${brand}`
      ).then(res => {
        setFeedbackContent(res.data)
      })
    )
    safeCall(() =>
      fetcher(
        `${antelopeEndpoint}/chatbots/channelFeedback?origin=leadgen&shortcode=${brand}`
      ).then(res => {
        setChannelFeedbackContent(res.data)
      })
    )
  }, [])

  const onClick = async () => {
    await showPrompts('Content Analysis', <ContentPerformance />, setMessages)
  }
  return (
    <>
      {feedbackContent && channelFeedbackContent ? (
        <div className="flex flex-col gap-2 md:gap-4">
          <ContentTemplate
            {...feedbackContent}
            footerComponent={
              <>
                {/* <ContentTemplate {...channelFeedbackContent} />
                 */}
              </>
            }
          />

          <div>
            <Carousel onChange={progress => setCarouselProgress(progress)}>
              {channelFeedbackContent.children.map(
                (child: any, index: number) => (
                  <SocialRatingCard
                    icon={child.icon ?? 'customer-reviews'}
                    title={child.header}
                    description={child.texts[0]}
                    totalRating={child.children[0].value.percent}
                    totalRatingInset={child.children[0].inset}
                    industryAverageTotalRating={child.children[0].industry}
                    averageScore={child.children[1].value.percent}
                    averageScoreInset={child.children[1].inset}
                    industryAverageScore={child.children[1].industry}
                    key={index}
                    isInView={
                      index <=
                      (channelFeedbackContent.children.length - 1) *
                        carouselProgress
                    }
                  />
                )
              )}
            </Carousel>
          </div>
          <p className="text-sm md:text-base">
            Deeper drilldown into feedback suggests that overall sentiment is
            overwhelmingly positive, with reviewers consistently praising
            innovative products and exceptional customer experiences
          </p>
          <FooterButtonGroup
            submitCaption="Content Analysis"
            helperText="To compare content performance, select below:"
            onSubmit={onClick}
          />
        </div>
      ) : (
        <CardSkeleton />
      )}
    </>
  )
}
