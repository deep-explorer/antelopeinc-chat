import * as Progress from '@radix-ui/react-progress'
import React from 'react'
import Image from 'next/image'
import { useWindowSize } from 'usehooks-ts'

interface SocialScoreBar {
  title: string
  value: number //  0 - 100
  average: number //  0 - 100
  inset: number | string
  flag: 'pros' | 'cons'
  isInview?: boolean
}

export function SocialScoreBar({
  flag,
  title,
  value,
  average,
  inset,
  isInview = true
}: SocialScoreBar) {
  const [progress, setProgress] = React.useState(20)
  const { width: windowWidth } = useWindowSize()
  React.useEffect(() => {
    if (isInview) {
      setProgress(20 + (value * 80) / 100)
    }
  }, [isInview])

  return (
    <div>
      <h3 className="mb-2 text-sm md:text-base">{title}</h3>
      <Progress.Root
        className="relative bg-blackA6 rounded-full min-w-[200px] md:min-w-[280px] h-5 md:h-8 shadow-md bg-[#32474F] self-center"
        style={{
          transform: 'translateZ(0)'
        }}
        value={progress}
      >
        <Progress.Indicator
          className="relative h-full transition-all duration-1000 ease-in-out rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: flag === 'pros' ? '#18898D' : '#EA3F3F'
          }}
        >
          <div
            className={`absolute top-0 md:top-1 left-2 md:left-4 text-white text-[14px] z-10`}
          >
            {inset}
          </div>
          <img
            src="/image-icons/progress-bar-indicator.png"
            height={windowWidth > 768 ? 32 : 20}
            width={windowWidth > 768 ? 2 : 1.2}
            alt="progress-bar-indicator"
            className="relative transition-all duration-1000 ease-in-out z-10"
            style={{
              // (20 + 80/100 * value) : 100%
              // (20 + 80/100 * average) : x%
              left: `${((20 + 0.8 * average) * 100) / (20 + 0.8 * value)}%`
            }}
          />
          <img
            src="/vitamin/logos/renzos.png"
            height={windowWidth > 768 ? 60 : 32}
            width={windowWidth > 768 ? 60 : 32}
            alt="renzos-indicator"
            className="absolute top-0 right-0 rounded-full border-[3px] md:border-[6px] transition-all duration-1000 ease-in-out"
            style={{
              transform: `translate(18px, ${windowWidth > 768 ? -12 : -6}px)`,
              borderColor: flag === 'pros' ? '#18898D' : '#EA3F3F',
              maxWidth: 'fit-content'
            }}
          />
        </Progress.Indicator>
      </Progress.Root>
    </div>
  )
}
