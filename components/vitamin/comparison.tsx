'use client'

import Image from 'next/image'
import { Button } from '@radix-ui/themes'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { FeedbackAnalysis } from './feedback-analysis'
import {
  antelopeEndpoint,
  companyUrl,
  renzoClientID
} from '@/lib/constants/config'
import { BotCard } from '../stocks'
import { UserMessage } from '../stocks/message'
import { useWindowSize } from 'usehooks-ts'
import { EmailInputMessage } from './email-input-message'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'
import { EmailCodeInputMessage } from './email-code-input-message'
import { CardSkeleton } from '../ui/card-skeleton'
import { sleep } from 'openai/core'
import { useEffect, useState } from 'react'
import { ContentTemplate, IContainer } from '../content-template'
import { fetcher } from '@/lib/utils'
import { FooterButtonGroup } from './footer-button-group'

export function Comparison() {
  const [_, setMessages] = useUIState<typeof AI>()
  const { width: windowWidth } = useWindowSize()
  const { userEmail, isEmailVerified } = useFreeChatContext()

  const [strentghContent, setStrengthContent] = useState<IContainer | null>(
    null
  )
  const [weaknessContent, setWeaknessContent] = useState<IContainer | null>(
    null
  )

  //  TODO: combine with server component
  useEffect(() => {
    fetcher(
      `${antelopeEndpoint}/chatbots/strengths?origin=leadgen&clientID=${renzoClientID}&brand=Renzo%27s%20Vitamins&since=20230401&until=20240401`
    )
      .then(res => {
        setStrengthContent(res.data)
      })
      .catch(e => console.log(e))
    fetcher(
      `${antelopeEndpoint}/chatbots/weaknesses?origin=leadgen&clientID=${renzoClientID}&brand=Renzo%27s%20Vitamins&since=20230401&until=20240401`
    )
      .then(res => {
        setWeaknessContent(res.data)
      })
      .catch(e => console.log(e))
  }, [])

  const onClick = async () => {
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage>Feedback Analysis</UserMessage>
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
            <FeedbackAnalysis />
          </BotCard>
        )
      }
    ])
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <Image
          src="/vitamin/logos/renzo.png"
          height={80}
          width={80}
          alt="renzo-loading"
          style={{
            height: windowWidth > 768 ? 80 : 64,
            width: windowWidth > 768 ? 80 : 64
          }}
        />
        <div>
          <h1 className="text-lg md:text-xl font-bold mb-4">
            Renzo&apos;s, Your Report is Ready.
          </h1>
          <p className="text-sm md:text-base">
            Antelope&apos;s platform has evaluated over 2.3 million data points
            accross ten channels and 12 of your closest competitors in the
            children&apos;s vitamin space. Below is a summary of findings:
          </p>
        </div>
      </div>
      <div
        className={`p-5 rounded-md flex flex-col gap-6 bg-gradient-to-b relative ${isEmailVerified ? 'bg-[#1E333A]' : 'opacity-gradient h-[260px]'}`}
      >
        {strentghContent && (
          <ContentTemplate flag="pros" {...strentghContent} />
        )}

        {isEmailVerified && weaknessContent && (
          <ContentTemplate flag="cons" {...weaknessContent} />
        )}
      </div>
      {isEmailVerified ? (
        <>
          <p className="text-sm md:text-base">
            Renzo&apos;s strengths and weaknesses highlight strong reviews yet
            comparatively poor content performance, with brands like Flintstones
            and MaryRuth&apos;s leading. Would you like to drill further into
            the analysis, or learn more about Antelope&apos;s reporting
            solutions?
          </p>
          <FooterButtonGroup
            submitCaption="Feedback Analysis"
            onSubmit={onClick}
          />
        </>
      ) : (
        <div className="flex flex-col gap-6 mt-[-48px] z-10">
          <EmailInputMessage />
          {userEmail && <EmailCodeInputMessage />}
        </div>
      )}
    </div>
  )
}

const availableButtons = [
  {
    caption: 'Feedback Analysis'
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
