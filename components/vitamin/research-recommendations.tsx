import { useUIState } from 'ai/rsc'
import { Button } from '@radix-ui/themes'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { BotCard, UserMessage } from '../stocks/message'
import { SendUsMessage } from '../send-us-message'
import {
  antelopeEndpoint,
  companyUrl,
  renzoClientID
} from '@/lib/constants/config'
import { useWindowSize } from 'usehooks-ts'
import { sleep } from 'openai/core'
import { useEffect, useState } from 'react'
import { ContentTemplate, IContent } from '../content-template'
import { fetcher } from '@/lib/utils'

export function ResearchRecommendations() {
  const [_, setMessages] = useUIState<typeof AI>()
  const { width: windowWidth } = useWindowSize()
  const [recommendation, setRecommendation] = useState<IContent | null>(null)

  //  TODO: combine with server component
  useEffect(() => {
    fetcher(
      `${antelopeEndpoint}/chatbots/recos?origin=leadgen&clientID=${renzoClientID}&brand=Renzo%27s%20Vitamins&since=20230401&until=20240401`
    )
      .then(res => {
        setRecommendation(res.data)
      })
      .catch(e => console.log(e))
  }, [])

  const onClick = async (index: number) => {
    if (index === 1) {
      setMessages(currentMessages => [
        ...currentMessages,
        {
          id: nanoid(),
          display: <UserMessage>Send Us a Message</UserMessage>
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
              <SendUsMessage />
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
      {recommendation && (
        <ContentTemplate
          {...recommendation}
          footer={
            <>
              <p>
                As a next step, we recommend reviewing these reports in more
                detail or scheduling a meeting with a member of the Antelope
                team to learn more about our services and how we can help drive
                growth and improvement for Renzo's. Alternatively, you can also
                send us a message and our team will be in touch soon.
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
      )}
    </>
  )
}

const availableButtons = [
  {
    caption: 'Book a Demo'
  },
  {
    caption: 'Send Us a Message'
  }
]
