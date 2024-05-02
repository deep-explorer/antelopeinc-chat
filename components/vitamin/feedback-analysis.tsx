'use client'

import { Button } from '../ui/button'
import { SocialRatingCard } from './sub/social-rating-card'
import { SpeedometerCard } from './sub/speedometer-card'

export function FeedbackAnalysis() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg md:text-3xl font-semibold mb-4">
        Feedback Performance
      </h1>
      <p>
        Renzo&apos;s feedback suggests high customer appreciation for natural
        ingredients, but concerns over taste and texture could be impacting
        repeat purchases.
      </p>
      <div className="flex gap-3 w-full overflow-x-auto">
        <SpeedometerCard
          icon="total-review"
          title="Total Review"
          value={550}
          description="Renzo's has amassed a substantial number of reviews, indicating strong customer engagement and widespread usage."
        />
        <SpeedometerCard
          icon="average-score"
          title="Average Score"
          value={740}
          description="Renzo's has amassed a substantial number of reviews, indicating strong customer engagement and widespread usage."
        />
        <SpeedometerCard
          icon="average-score"
          title="Average Score"
          value={740}
          description="Renzo's has amassed a substantial number of reviews, indicating strong customer engagement and widespread usage."
        />
      </div>
      <div className="flex gap-3 w-full overflow-x-auto">
        <SocialRatingCard
          icon="glassdoor"
          title="Glassdoor"
          description="Renzo's employees rave about the company culture, with 92% of reviewers citing 'opportunities for growth' and 'supportive management' as key drivers of their 4.5-star average rating."
          totalRating={55}
          averageScore={46}
        />
        <SocialRatingCard
          icon="google"
          title="Google"
          description="Renzo's employees rave about the company culture, with 92% of reviewers citing 'opportunities for growth' and 'supportive management' as key drivers of their 4.5-star average rating."
          totalRating={55}
          averageScore={45}
        />
        <SocialRatingCard
          icon="google"
          title="Google"
          description="Renzo's employees rave about the company culture, with 92% of reviewers citing 'opportunities for growth' and 'supportive management' as key drivers of their 4.5-star average rating."
          totalRating={55}
          averageScore={45}
        />
      </div>
      <p>
        Deeper drilldown into feedback suggests that overall sentiment is
        overwhelmingly positive, with reviewers consistently praising innovative
        products and exceptional customer experiences
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
    caption: 'Content Analysis'
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
