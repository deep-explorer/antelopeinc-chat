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
import { showPrompts } from '@/lib/chat/prompt'

interface FooterButtonGroupProps {
  submitCaption: string
  helperText?: string
  onSubmit: () => void
}

export const FooterButtonGroup = ({
  submitCaption,
  helperText,
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

    await showPrompts(
      prompt,
      <div className="flex flex-col gap-4">
        {response}
        <FooterButtonGroup submitCaption={submitCaption} onSubmit={onSubmit} />
      </div>,
      setMessages
    )
  }

  return (
    <>
      <hr className="border-gray-500" />
      <p className="text-left">{helperText ?? 'To continue, select below:'}</p>
      <Button
        size={windowWidth > 768 ? '3' : '1'}
        style={{
          width: '100%',
          height: windowWidth > 768 ? 61 : 42,
          fontSize: windowWidth > 768 ? 22 : 16,
          borderRadius: windowWidth > 768 ? 14 : 8
        }}
        onClick={onSubmit}
      >
        {submitCaption}{' '}
        <ArrowRightIcon
          height={windowWidth > 768 ? 32 : 20}
          width={windowWidth > 768 ? 32 : 20}
        />
      </Button>
      <p className="text-sm md:text-base text-left">
        Or, learn more by selecting an option below:
      </p>
      <div className="flex flex-wrap">
        {[cycleButtons[footerButtonIndex], ...availableButtons].map(
          (availableButton, index) => (
            <div className="p-1 md:p-2 w-[50%]" key={index}>
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
                  height: windowWidth > 768 ? 61 : 42,
                  borderRadius: windowWidth > 768 ? 14 : 8
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
      <p>
        Antelope is a strategy and insights team that turns your industry&apos;s
        content and customer feedback into customized research with artificial
        intelligence. We leverage cutting-edge AI to analyze your customer
        feedback and content at scale. For more details,{' '}
        <Link
          href={`${companyUrl}/#banner`}
          target="_blank"
          rel="noreferrer"
          className="italic hover:underline text-primary"
        >
          visit our website.
        </Link>
      </p>
    )
  },
  {
    caption: 'Data Sources',
    response: (
      <p>
        Antelope integrates data from all major social networks and over 50 top
        review sources to provide unmatched industry insights. For more details,{' '}
        <Link
          href={`${companyUrl}/#banner`}
          target="_blank"
          rel="noreferrer"
          className="italic hover:underline text-primary"
        >
          visit our website.
        </Link>
      </p>
    )
  },
  {
    caption: 'Client Success',
    response: (
      <p>
        Antelope works with some of the world&apos;s largest brands and agencies
        across several industries, including financial services, retail, and
        CPG. For more details,{' '}
        <Link
          href={`${companyUrl}/#banner`}
          target="_blank"
          rel="noreferrer"
          className="italic hover:underline text-primary"
        >
          check out our website.
        </Link>
      </p>
    )
  },
  {
    caption: 'Content AI',
    response: (
      <p>
        Our Content AI uses advanced vision analysis to evaluate images and
        videos across multiple channels. For examples of our work,{' '}
        <Link
          href={`${companyUrl}/#banner`}
          target="_blank"
          rel="noreferrer"
          className="italic hover:underline text-primary"
        >
          check out our case studies page.
        </Link>
      </p>
    )
  },
  {
    caption: 'Feedback AI',
    response: (
      <p>
        Our Feedback AI uses natural language processing to categorize and
        summarize customer reviews and comments, providing actionable insights.
        For examples of our work,{' '}
        <Link
          href={`${companyUrl}/#banner`}
          target="_blank"
          rel="noreferrer"
          className="italic hover:underline text-primary"
        >
          check out our case studies page.
        </Link>
      </p>
    )
  },
  {
    caption: 'Product Development Insights',
    response: (
      <p>
        Antelope helps identify product features that customers value most,
        guiding your development process to enhance satisfaction and loyalty.{' '}
        <Link
          href={`${companyUrl}/#banner`}
          target="_blank"
          rel="noreferrer"
          className="italic hover:underline text-primary"
        >
          Visit our case studies page
        </Link>{' '}
        to learn more.
      </p>
    )
  },
  {
    caption: 'Branding Insights',
    response: (
      <p>
        Antelope&apos;s platform uses real customer feedback to better
        understand your brand health and pinpoint industry white space.{' '}
        <Link
          href={`${companyUrl}/#banner`}
          target="_blank"
          rel="noreferrer"
          className="italic hover:underline text-primary"
        >
          Visit our case studies page
        </Link>{' '}
        to learn more.
      </p>
    )
  },
  {
    caption: 'Marketing Insights',
    response: (
      <p>
        Antelope determines the best content, channels, and campaigns to drive
        awareness and purchase intent, enhancing your marketing strategy.{' '}
        <Link
          href={`${companyUrl}/#banner`}
          target="_blank"
          rel="noreferrer"
          className="italic hover:underline text-primary"
        >
          Visit our case studies page
        </Link>
      </p>
    )
  },
  {
    caption: 'Customer Support and Experience',
    response: (
      <p>
        Antelope identifies pain points and issues, providing deeper product and
        category knowledge to enhance customer support.{' '}
        <Link
          href={`${companyUrl}/#banner`}
          target="_blank"
          rel="noreferrer"
          className="italic hover:underline text-primary"
        >
          Visit our case studies page
        </Link>{' '}
        to learn more.
      </p>
    )
  }
]

const availableButtons = [
  {
    caption: 'View Case Studies',
    response: (
      <p>
        Our case studies section on our website offers an in-depth analysis of
        our strategic offerings and research, segmented by reporting objectives
        to provide detailed insights. Please{' '}
        <Link
          href={`${companyUrl}/case-study`}
          target="_blank"
          rel="noreferrer"
          className="italic hover:underline text-primary"
        >
          visit our website
        </Link>{' '}
        to explore and access the information.
      </p>
    )
  },
  {
    caption: 'Send a Message',
    response: <SendUsMessage />
  },
  {
    caption: 'Book a Demo',
    response: (
      <p>
        To connect with a member of our team, please{' '}
        <Link
          href={`https://go.oncehub.com/DanielRobinson`}
          target="_blank"
          className="italic hover:underline text-primary"
        >
          click this link
        </Link>{' '}
        to schedule a meeting at your convenience. You can also{' '}
        <Link
          href={`${companyUrl}/#get-in-touch`}
          target="_blank"
          rel="noreferrer"
          className="italic hover:underline text-primary"
        >
          send us a message
        </Link>{' '}
        or email us at contact@antelopeinc.com.
      </p>
    )
  }
]
