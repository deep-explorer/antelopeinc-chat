'use client'
import { useUIState } from 'ai/rsc'
import { Button } from '@radix-ui/themes'
import { AI } from '@/lib/chat/actions'
import { SendUsMessage } from '../send-us-message'
import { antelopeEndpoint, companyUrl } from '@/lib/constants/config'
import { useWindowSize } from 'usehooks-ts'
import { useEffect, useState } from 'react'
import { ContentTemplate, IContainer } from '../content-template'
import { fetcher, safeCall } from '@/lib/utils'
import { showPrompts } from '@/lib/chat/prompt'
import { useParams } from 'next/navigation'
import { CardSkeleton } from '../ui/card-skeleton'

export function ResearchRecommendations() {
  const [_, setMessages] = useUIState<typeof AI>()
  const { brand } = useParams()
  const { width: windowWidth } = useWindowSize()
  const [recommendation, setRecommendation] = useState<IContainer | null>(null)

  //  TODO: combine with server component
  useEffect(() => {
    safeCall(() =>
      fetcher(
        `${antelopeEndpoint}/chatbots/recos?origin=leadgen&shortcode=${brand}`
      ).then(res => {
        setRecommendation(res.data)
      })
    )
  }, [])

  const onClick = async (index: number) => {
    if (index === 1) {
      await showPrompts('Contact Antelope', <SendUsMessage />, setMessages)
    } else {
      window.open(companyUrl, '_blank')
    }
  }

  return (
    <>
      {recommendation ? (
        <ContentTemplate
          {...recommendation}
          footerComponent={
            <>
              <p>
                As a next step, we recommend reviewing these reports in more
                detail or scheduling a meeting with a member of the Antelope
                team to learn more about our services and how we can help drive
                growth and improvement for Renzo&apos;s. Alternatively, you can
                also contact Antelope and our team will be in touch soon.
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
      ) : (
        <CardSkeleton />
      )}
    </>
  )
}

const availableButtons = [
  {
    caption: 'Book a Demo'
  },
  {
    caption: 'Contact Antelope'
  }
]
