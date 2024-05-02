'use client'

import { Button } from '@/components/ui/button'
import { OverviewSpecCard } from './sub/overview-spec-card'

export function DataOverview() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg md:text-3xl font-semibold">Data Overview</h1>
      <p>
        We've ingested over 3 million data points for you and your closest
        competitors in the children&apos;s vitamin industry. Next, we'll compare
        these data points to your industry benchmarks to identify your strengths
        and weaknesses.
      </p>
      <div className="flex flex-wrap">
        {overviewSpecs.map((overviewSpec, index) => (
          <div className="p-2 w-full lg:w-[50%]" key={index}>
            <OverviewSpecCard {...overviewSpec} />
          </div>
        ))}
      </div>
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

const overviewSpecs = [
  {
    icon: 'customer-reviews',
    score: '50.2K',
    title: 'Customer Reviews',
    tooltipDescription:
      'Total number of customer reviews collected across all platforms. Reviews help gauge customer satisfaction and provide valuable feedback.'
  },
  {
    icon: 'earn-media',
    score: '2.3M',
    title: 'Earn Media',
    tooltipDescription:
      'Tracks the volume of mentions and engagement generated without direct payment, such as through media coverage or unpaid endorsements.'
  },
  {
    icon: 'paid-ads',
    score: '1.2K',
    title: 'Paid Ads',
    tooltipDescription:
      'Count of paid advertising campaigns conducted. This metric highlights the scale of paid promotional efforts.'
  },
  {
    icon: 'organic-content',
    score: '7,532',
    title: 'Organic Content',
    tooltipDescription:
      'Total pieces of content created in-house that have been published. Indicates the level of active content marketing.'
  },
  {
    icon: 'influencer-post',
    score: '203',
    title: 'Influencer Post',
    tooltipDescription:
      'Number of posts made by influencers promoting your products. Reflects the reach and impact of influencer marketing.'
  },
  {
    icon: 'social-comments',
    score: '3.4B',
    title: 'Social Comments',
    tooltipDescription:
      'Aggregate of comments received on social media platforms. This measure helps understand audience engagement and interaction levels.'
  }
]

const availableButtons = [
  {
    caption: 'Start Comparison'
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
