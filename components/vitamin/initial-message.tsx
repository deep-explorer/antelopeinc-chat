'use client'

import { Button } from '@/components/ui/button'
import { BotCard } from '../stocks/message'
import Image from 'next/image'

export function InitialMessage() {
  return (
    <BotCard>
      <div className="flex flex-col gap-6 text-center">
        <h1 className="text-lg md:text-3xl font-semibold">
          Children&apos;s Vitamins Analysis
        </h1>
        <div className="flex gap-4 items-center">
          <Image
            src="/vitamin/logos/renzo.png"
            height={104}
            width={104}
            className="rounded-full"
            alt="renzo-logo"
          />
          <div className="rounded-full bg-black size-8 p-1 bg-[#2F616A]">
            vs
          </div>
          <Image
            src="/vitamin/logos/flintstonesvitamins.png"
            height={104}
            width={104}
            className="rounded-full"
            alt="flintstones-logo"
          />
          <Image
            src="/vitamin/logos/maryruthorganics.png"
            height={104}
            width={104}
            className="rounded-full"
            alt="flintstones-logo"
          />
          <Image
            src="/vitamin/logos/smartypantsvitamins.png"
            height={104}
            width={104}
            className="rounded-full"
            alt="flintstones-logo"
          />
        </div>
        <p className="text-sm md:text-base px-2">
          This analysis reviews Renzo&apos;s and nine of the largest vitamin
          brands, including Flintstones, MaryRuth&apos;s, and SmartyPants. It
          reveals Renzo&apos;s strengths and weaknesses against these
          competitors and offers ways to improve its overall strategy through
          this insight.
        </p>
        <p className="text-sm md:text-base px-2">
          To begin, please select an option below:
        </p>
        <div className="flex flex-wrap">
          {freePromptMessages.map((message, index) => (
            <div className="p-2 w-full md:w-[50%]" key={index}>
              <Button
                // onClick={() => onClick(message.prompt, message.response)}
                className="w-full"
              >
                {message.prompt}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </BotCard>
  )
}

const freePromptMessages = [
  {
    prompt: 'Start the Analysis'
  },
  {
    prompt: 'Tell Me More About Antelope'
  },
  {
    prompt: 'Book a Demo'
  },
  {
    prompt: 'Show Me Case Studies'
  }
]
