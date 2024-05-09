import { useUIState } from 'ai/rsc'
import { RecommendationCard } from './sub/recommendation-card'
import { Button } from '@radix-ui/themes'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { BotCard, UserMessage } from '../stocks/message'
import { SendUsMessage } from '../send-us-message'
import { companyUrl } from '@/lib/constants/config'
import { useWindowSize } from 'usehooks-ts'
import { sleep } from 'openai/core'

export function ResearchRecommendations() {
  const [_, setMessages] = useUIState<typeof AI>()
  const { width: windowWidth } = useWindowSize()

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
    <div className="flex flex-col gap-3 md:gap-6">
      <div className="flex flex-col gap-2 md:gap-4">
        <h1 className="text-lg md:text-xl font-bold">
          Research Recommendations
        </h1>
        <p className="text-sm md:text-base">
          Antelope&apos;s platform leverages artificial intelligence to analyze
          this data, providing actionable insights to help Renzo&apos;s build
          upon its strengths and address its closest weaknesses.
        </p>
        <p className="text-sm md:text-base">
          Below are some of the key reports we recommend:
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-sm md:text-base font-semibold text-red-500">
          Critical
        </h2>
        <p className="text-sm md:text-base">
          Antalope&apos;s platform leverages artificial intelligence to analyze
          this data, providing actionable insights to help Renzo&apos;s build
          upon ite strengths and address its closest weaknesses:
        </p>
        <div className="flex gap-3 w-full overflow-x-auto pb-2">
          {criticalCards.map((card, index) => (
            <RecommendationCard flag="critical" {...card} key={index} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-sm md:text-base font-semibold text-yellow-500">
          Suggested
        </h2>
        <p className="text-sm md:text-base">
          Antalope&apos;s platform leverages artificial intelligence to analyze
          this data, providing actionable insights to help Renzo&apos;s build
          upon ite strengths and address its closest weaknesses:
        </p>
        <div className="flex gap-3 w-full overflow-x-auto pb-2">
          {suggestedCards.map((card, index) => (
            <RecommendationCard flag="suggested" {...card} key={index} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-sm md:text-base font-semibold text-green-500">
          Consider
        </h2>
        <p className="text-sm md:text-base">
          Antalope&apos;s platform leverages artificial intelligence to analyze
          this data, providing actionable insights to help Renzo&apos;s build
          upon ite strengths and address its closest weaknesses:
        </p>
        <div className="flex gap-3 w-full overflow-x-auto pb-2">
          {suggestedCards.map((card, index) => (
            <RecommendationCard flag="consider" {...card} key={index} />
          ))}
        </div>
      </div>
      <p className="text-sm md:text-base">
        As a next step, we recommend exploring some of the solutions the
        Antelope team provide for research to build upon on your strengths and
        weaknesses
      </p>

      <div className="flex flex-wrap">
        {availableButtons.map((availableButton, index) => (
          <div className="p-1 w-full md:w-[50%]" key={index}>
            <Button
              onClick={() => onClick(index)}
              size={windowWidth > 768 ? '3' : '1'}
              style={{
                width: '100%'
              }}
            >
              {availableButton.caption}
            </Button>
          </div>
        ))}
      </div>
    </div>
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

const criticalCards = [
  {
    icon: 'brand-health-analysis',
    title: 'Brand Health Analysis',
    description:
      "Copture insights from social coinments and reviews to understand your brand's health and sentiment. Highlight both positive and negative feedback to pinpoint oreas of strength and improvement"
  },
  {
    icon: 'support-comparison',
    title: 'Support Comparison',
    description:
      'Compare how beends manage customer support by analyzing online reviews ond social comments. Gain insights into key themes, responses, and customer satisfaction to strengthen support efforts'
  },
  {
    icon: 'support-comparison',
    title: 'Support Comparison',
    description:
      'Compare how beends manage customer support by analyzing online reviews ond social comments. Gain insights into key themes, responses, and customer satisfaction to strengthen support efforts'
  }
]

const suggestedCards = [
  {
    icon: 'swot-comparison',
    title: 'SWOT Comparison',
    description:
      'Reveal key strengths and weaknesses across a category by examining customer feedback through a set of key competitors.'
  },
  {
    icon: 'ranking-report',
    title: 'Ranking Report',
    description:
      'Rank the players in your industry based on the factors most important to your brand.'
  },
  {
    icon: 'support-comparison',
    title: 'Support Comparison',
    description:
      'Compare how beends manage customer support by analyzing online reviews ond social comments. Gain insights into key themes, responses, and customer satisfaction to strengthen support efforts'
  }
]
