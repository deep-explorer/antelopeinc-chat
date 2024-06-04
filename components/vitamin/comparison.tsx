'use client'

import Image from 'next/image'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { FeedbackAnalysis } from './feedback-analysis'
import { antelopeEndpoint, renzosClientID } from '@/lib/constants/config'
import { useWindowSize } from 'usehooks-ts'
import { EmailInputMessage } from './email-input-message'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'
import { EmailCodeInputMessage } from './email-code-input-message'
import { useEffect, useRef, useState } from 'react'
import { ContentTemplate, IContainer } from '../content-template'
import { fetcher } from '@/lib/utils'
import { FooterButtonGroup } from './footer-button-group'
import { showPrompts } from '@/lib/chat/prompt'

export function Comparison() {
  const [_, setMessages] = useUIState<typeof AI>()
  const { width: windowWidth } = useWindowSize()
  const { userEmail, isEmailVerified } = useFreeChatContext()
  const elementRef = useRef<HTMLDivElement>(null)

  const [strengthContent, setStrengthContent] = useState<IContainer | null>(
    null
  )
  const [weaknessContent, setWeaknessContent] = useState<IContainer | null>(
    null
  )

  //  TODO: combine with server component
  useEffect(() => {
    fetcher(
      `${antelopeEndpoint}/chatbots/strengths?origin=leadgen&clientID=${renzosClientID}&brand=Renzo%27s%20Vitamins&since=20230401&until=20240401`
    )
      .then(res => {
        setStrengthContent(res.data)
      })
      .catch(e => console.log(e))
    fetcher(
      `${antelopeEndpoint}/chatbots/weaknesses?origin=leadgen&clientID=${renzosClientID}&brand=Renzo%27s%20Vitamins&since=20230401&until=20240401`
    )
      .then(res => {
        setWeaknessContent(res.data)
      })
      .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    if (isEmailVerified && elementRef.current) {
      const elementTop =
        elementRef.current.getBoundingClientRect().top + window.scrollY
      const offset = windowWidth > 768 ? 200 : 100
      window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth'
      })
    }
  }, [isEmailVerified])

  const onClick = async () => {
    await showPrompts('Feedback Analysis', <FeedbackAnalysis />, setMessages)
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6" ref={elementRef}>
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <Image
          src="/vitamin/logos/renzos.png"
          height={80}
          width={80}
          alt="renzos-loading"
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
        className={`p-3 md:p-5 rounded-md flex flex-col gap-6 bg-gradient-to-b relative ${isEmailVerified ? 'bg-[#1E333A]' : 'opacity-gradient h-[260px]'}`}
      >
        {strengthContent && (
          <ContentTemplate flag="pros" {...strengthContent} />
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
            helperText="To compare customer feedback, select below:"
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
