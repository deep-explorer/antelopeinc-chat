import { Button } from '../ui/button'
import { ChannelGraphCard } from './sub/channel-graph-card'
import { SpeedometerCard } from './sub/speedometer-card'

export function ContentPerformance() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg md:text-3xl font-semibold mb-4">
        Content Performance
      </h1>
      <p>
        Content analytics feedback suggests high engagement with informative
        articles, but concerns over content relevance and depth could be
        impacting user retention and loyalty.
      </p>
      <div className="flex gap-3 w-full overflow-x-auto">
        <SpeedometerCard
          icon="engagement"
          title="Engagement"
          value={920}
          description="The content portfolio has achieved a high level of thematic cohesion, indicating a strong brand voice and consistent messaging."
        />
        <SpeedometerCard
          icon="volume"
          title="Volume"
          value={320}
          description="The content repository has reached an unprecedented scale, with a substantial volume of assets available to support user needs"
        />
        <SpeedometerCard
          icon="volume"
          title="Volume"
          value={320}
          description="The content repository has reached an unprecedented scale, with a substantial volume of assets available to support user needs"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-base md:text-xl font-semibold">
          Content by Channel
        </h2>
        <p>
          Sentiment varies across different channels, with social media showing
          the most positivity, while online retail feedback indicates areas for
          improvement.
        </p>

        <div className="flex gap-3 w-full overflow-x-auto">
          <ChannelGraphCard />
          <ChannelGraphCard />
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
    caption: 'Suggest Research'
  },
  {
    caption: 'Tell Me More About Antelope'
  },
  {
    caption: 'Book a Demo'
  },
  {
    caption: 'Show Me Case Studies'
  }
]
