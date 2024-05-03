import { Button } from '../ui/button'
import { ChannelGraphCard } from './sub/channel-graph-card'
import { RecommendationCard } from './sub/recommendation-card'
import { SpeedometerCard } from './sub/speedometer-card'

export function ResearchRecommendations() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-lg md:text-3xl font-semibold">
          Research Recommendations
        </h1>
        <p>
          Antelope&apos;s platform leverages artificial intelligence to analyze
          this data, providing actionable insights to help Renzo&apos;s build
          upon its strengths and address its closest weaknesses.
        </p>
        <p>Below are some of the key reports we recommend:</p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-base md:text-xl font-semibold text-red-500">
          Critical
        </h2>
        <p>
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
        <h2 className="text-base md:text-xl font-semibold text-yellow-500">
          Suggested
        </h2>
        <p>
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
        <h2 className="text-base md:text-xl font-semibold text-green-500">
          Consider
        </h2>
        <p>
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
      <p>
        As a next step, we recommend exploring some of the solutions the
        Antelope team provide for research to build upon on your strengths and
        weaknesses
      </p>

      <div className="flex flex-wrap">
        {availableButtons.map((availableButton, index) => (
          <div className="p-2 w-full md:w-[50%]" key={index}>
            <Button
              // onClick={() => onClick(message.prompt, message.response)}
              className="w-full"
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
