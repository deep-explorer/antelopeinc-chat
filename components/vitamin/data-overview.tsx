'use client'

import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { Comparison } from './comparison'
import { antelopeEndpoint } from '@/lib/constants/config'
import { useEffect, useState } from 'react'
import { fetcher } from '@/lib/utils'
import { ContentTemplate, IContainer } from '../content-template'
import { FooterButtonGroup } from './footer-button-group'
import { showPrompts } from '@/lib/chat/prompt'
import { useParams } from 'next/navigation'
import { CardSkeleton } from '../ui/card-skeleton'

export function DataOverview() {
  const [_, setMessages] = useUIState<typeof AI>()
  const { brand } = useParams()
  const [content, setContent] = useState<IContainer | null>(null)

  //  TODO: combine with server component
  useEffect(() => {
    fetcher(
      `${antelopeEndpoint}/chatbots/overview?origin=leadgen&shortcode=${brand}`
    )
      .then(res => {
        setContent(res.data)
      })
      .catch(e => console.log(e))
  }, [])

  const onClick = async () => {
    await showPrompts('Start Comparison', <Comparison />, setMessages)
  }

  return (
    <>
      {content ? (
        <ContentTemplate
          {...content}
          footerComponent={
            <FooterButtonGroup
              submitCaption="Start Comparison"
              helperText="To run the comparison, select below:"
              onSubmit={onClick}
            />
          }
        />
      ) : (
        <CardSkeleton />
      )}
    </>
  )
}
