import { useWindowSize } from 'usehooks-ts'
import { Button } from '@radix-ui/themes'
import { companyUrl } from '@/lib/constants/config'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'
import { SendUsMessage } from '../send-us-message'
import Link from 'next/link'
import { ReactElement, useMemo } from 'react'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { BotCard, UserMessage } from '../stocks/message'
import { sleep } from '@/lib/utils'
import { CardSkeleton } from '../ui/card-skeleton'

interface FooterButtonGroupProps {
  submitCaption: string
  onSubmit: () => void
}

export const FooterButtonGroup = ({
  submitCaption,
  onSubmit
}: FooterButtonGroupProps) => {
  const [_, setMessages] = useUIState<typeof AI>()
  const { width: windowWidth } = useWindowSize()
  const { footerButtonIndex: _footerButtonIndex, setFooterButtonIndex } =
    useFreeChatContext()
  const footerButtonIndex = useMemo(() => _footerButtonIndex, []) //  set when the component is mounted

  const onClick = async (
    prompt: string,
    response: ReactElement,
    isCycleButton: boolean
  ) => {
    if (isCycleButton) {
      setFooterButtonIndex(footerButtonIndex + 1)
    }

    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage>{prompt}</UserMessage>
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
            <div className="flex flex-col gap-4">
              {response}
              <hr className="border-gray-500" />
              <p>To continue, select below:</p>
              <FooterButtonGroup
                submitCaption={submitCaption}
                onSubmit={onSubmit}
              />
            </div>
          </BotCard>
        )
      }
    ])
  }

  return (
    <>
      <Button
        size={windowWidth > 768 ? '3' : '1'}
        style={{
          width: '100%',
          height: windowWidth > 768 ? 61 : 36,
          fontSize: windowWidth > 768 ? 22 : 16,
          borderRadius: 14
        }}
        onClick={onSubmit}
      >
        {submitCaption} <ArrowRightIcon height="32" width="32" />
      </Button>
      <p className="text-sm md:text-base">
        Or, learn more by selecting an option below:
      </p>
      <div className="flex flex-wrap">
        {[cycleButtons[footerButtonIndex], ...availableButtons].map(
          (availableButton, index) => (
            <div className="p-2 w-[50%]" key={index}>
              <Button
                onClick={() =>
                  onClick(
                    availableButton.caption,
                    availableButton.response,
                    index === 0
                  )
                }
                size={windowWidth > 768 ? '3' : '1'}
                className="bottom-button"
                style={{
                  height: windowWidth > 768 ? 61 : 36,
                  borderRadius: 14
                }}
              >
                {availableButton.caption}
              </Button>
            </div>
          )
        )}
      </div>
    </>
  )
}

const cycleButtons = [
  {
    caption: 'Tell Me About Antelope',
    response: (
      <div>
        <p>
          Antelope is a strategy and insights team that turns your
          industry&apos;s content and customer feedback into customized research
          with artificial intelligence. We leverage cutting-edge AI to analyze
          your customer feedback and content at scale. For more details, visit
          our website.
        </p>
        <i>
          <Link href={`${companyUrl}/#banner`} target="_blank" rel="noreferrer">
            Learn More
          </Link>
        </i>
      </div>
    )
  },
  {
    caption: 'Data Sources',
    response: (
      <div>
        <p>
          Antelope integrates data from all major social networks and over 50
          top review sources to provide unmatched industry insights. For more
          details, visit our website.
          <i>
            <Link
              href={`${companyUrl}/#banner`}
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </Link>
          </i>
        </p>
      </div>
    )
  },
  {
    caption: 'Client Success',
    response: (
      <div>
        <p>
          Antelope works with some of the world&apos;s largest brands and
          agencies across several industries, including financial services,
          retail, and CPG. For more details, check out our website.
          <i>
            <Link
              href={`${companyUrl}/#banner`}
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </Link>
          </i>
        </p>
      </div>
    )
  },
  {
    caption: 'Content AI',
    response: (
      <div>
        <p>
          Our Content AI uses advanced vision analysis to evaluate images and
          videos across multiple channels. For examples of our work, check out
          our case studies page.
          <i>
            <Link
              href={`${companyUrl}/#banner`}
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </Link>
          </i>
        </p>
      </div>
    )
  },
  {
    caption: 'Feedback AI',
    response: (
      <div>
        <p>
          Our Feedback AI uses natural language processing to categorize and
          summarize customer reviews and comments, providing actionable
          insights. For examples of our work, check out our case studies page.
          <i>
            <Link
              href={`${companyUrl}/#banner`}
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </Link>
          </i>
        </p>
      </div>
    )
  },
  {
    caption: 'Product Development Insights',
    response: (
      <div>
        <p>
          Antelope helps identify product features that customers value most,
          guiding your development process to enhance satisfaction and loyalty.
          Visit our case studies page to learn more.
          <i>
            <Link
              href={`${companyUrl}/#banner`}
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </Link>
          </i>
        </p>
      </div>
    )
  },
  {
    caption: 'Branding Insights',
    response: (
      <div>
        <p>
          Antelope&apos;s platform uses real customer feedback to better
          understand your brand health and pinpoint industry white space. Visit
          our case studies page to learn more.{' '}
          <i>
            <Link
              href={`${companyUrl}/#banner`}
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </Link>
          </i>
        </p>
      </div>
    )
  },
  {
    caption: 'Marketing Insights',
    response: (
      <div>
        <p>
          Antelope determines the best content, channels, and campaigns to drive
          awareness and purchase intent, enhancing your marketing strategy.
          Visit our case studies page to learn more.{' '}
          <i>
            <Link
              href={`${companyUrl}/#banner`}
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </Link>
          </i>
        </p>
      </div>
    )
  },
  {
    caption: 'Customer Support and Experience',
    response: (
      <div>
        <p>
          Antelope identifies pain points and issues, providing deeper product
          and category knowledge to enhance customer support. Visit our case
          studies page to learn more.{' '}
          <i>
            <Link
              href={`${companyUrl}/#banner`}
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </Link>
          </i>
        </p>
      </div>
    )
  }
]

const availableButtons = [
  {
    caption: 'View Case Studies',
    response: (
      <div>
        <p>
          Our case studies section on our website offers an in-depth analysis of
          our strategic offerings and research, segmented by reporting
          objectives to provide detailed insights. Please visit our website to
          explore and access the information.
          <i>
            <Link
              href={`${companyUrl}/case-study`}
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </Link>
          </i>
        </p>
      </div>
    )
  },
  {
    caption: 'Send a Message',
    response: <SendUsMessage />
  },
  {
    caption: 'Book a Demo',
    response: (
      <div>
        <p>
          To connect with a member of our team, please{' '}
          <i>
            <Link
              href={`https://go.oncehub.com/DanielRobinson`}
              target="_blank"
            >
              click this link
            </Link>
          </i>{' '}
          to schedule a meeting at your convenience. You can also{' '}
          <i>
            <Link
              href={`${companyUrl}/#get-in-touch`}
              target="_blank"
              rel="noreferrer"
            >
              send us a message
            </Link>
          </i>{' '}
          or email us at contact@antelopeinc.com.
        </p>
      </div>
    )
  }
]
