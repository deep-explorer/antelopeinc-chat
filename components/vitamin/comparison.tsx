'use client'

import Image from 'next/image'
import { ProsCons } from './sub/pros-cons'
import { Button } from '@/components/ui/button'

export function Comparison() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <Image
          src="/vitamin/logos/renzo.png"
          height={80}
          width={80}
          alt="renzo-loading"
          style={{
            height: 80,
            width: 80
          }}
        />
        <div>
          <h1 className="text-lg md:text-3xl font-semibold mb-4">
            Renzo&apos;s, Your Report is Ready.
          </h1>
          <p>
            Antelope&apos;s platform has evaluated over 2.3 million data points
            accross ten channels and 12 of your closest competitors in the
            children&apos;s vitamin space. Below is a summary of findings:
          </p>
        </div>
      </div>
      <div className="p-5 bg-[#1E333A] rounded-md flex flex-col gap-6">
        <ProsCons
          flag="pros"
          title="Renzo's Strengths"
          description="Renzo's strengths lie in their sentiment, media, and organic reach, demonstrating a robust market presence and customer loyalty across multiple platforms:"
          scores={[
            {
              key: 'Influencer Activity',
              value: 90,
              tooltipDescription:
                'Influencer activity looks at the relative share of sponsored mentions and engagement among competitors'
            },
            {
              key: 'Ratings',
              value: 80,
              tooltipDescription:
                'Influencer activity looks at the relative share of sponsored mentions and engagement among competitors'
            },
            {
              key: 'Testimonials',
              value: 75,
              tooltipDescription:
                'Influencer activity looks at the relative share of sponsored mentions and engagement among competitors'
            },
            {
              key: 'Earn Media',
              value: 60,
              tooltipDescription:
                'Influencer activity looks at the relative share of sponsored mentions and engagement among competitors'
            }
          ]}
        />
        <ProsCons
          flag="cons"
          title="Renzo's Weaknesses"
          description="Renzo's weaknesses are limited product variety and higher pricing compared to competitors, which may hinder market expansion and customer acquisition:"
          scores={[
            {
              key: 'Influencer Activity',
              value: 30,
              tooltipDescription:
                'Influencer activity looks at the relative share of sponsored mentions and engagement among competitors'
            },
            {
              key: 'Ratings',
              value: 25,
              tooltipDescription:
                'Influencer activity looks at the relative share of sponsored mentions and engagement among competitors'
            },
            {
              key: 'Testimonials',
              value: 20,
              tooltipDescription:
                'Influencer activity looks at the relative share of sponsored mentions and engagement among competitors'
            },
            {
              key: 'Earn Media',
              value: 10,
              tooltipDescription:
                'Influencer activity looks at the relative share of sponsored mentions and engagement among competitors'
            }
          ]}
        />
      </div>
      <p>
        Renzo&apos;s strengths and weaknesses highlight strong reviews yet
        comparatively poor content performance, with brands like Flintstones and
        MaryRuth&apos;s leading. Would you like to drill further into the
        analysis, or learn more about Antelope&apos;s reporting solutions?
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
    caption: 'Feedback Analysis'
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
