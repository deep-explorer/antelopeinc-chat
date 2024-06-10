import * as Progress from '@radix-ui/react-progress'
import React from 'react'
import Image from 'next/image'
import { useWindowSize } from 'usehooks-ts'

interface SocialScoreBar {
  title: string
  value: number //  0 - 100
  average: number //  0 - 100
  flag: 'pros' | 'cons'
  inset: string
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
  const [progress, setProgress] = React.useState(0)
  const { width: windowWidth } = useWindowSize()
  React.useEffect(() => {
    if (isInview) {
      setProgress(value)
    }
  }, [isInview])
  return (
    <div>
      <h3 className="mb-3 text-sm md:text-base">{title}</h3>
      <div className="flex  items-center gap-1 md:gap-3 md:mx-[4px] mx-[2px]">
        <div className="text-white text-[10px] md:text-[14px] z-10 w-[32px] md:w-[62px]">
          {inset}
        </div>
        <Progress.Root
          className="relative grow  bg-blackA6 rounded-full min-w-[150px] md:min-w-[280px] h-5 md:h-8 shadow-md bg-[#32474F] self-center"
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
            <Image
              src="/image-icons/progress-bar-indicator.png"
              height={windowWidth > 768 ? 32 : 20}
              width={windowWidth > 768 ? 2 : 1.2}
              alt="progress-bar-indicator"
              className="relative transition-all duration-1000 ease-in-out"
              style={{
                left: `${(average / progress) * 100}%`
              }}
            />
            {progress >= 0 && (
              <Image
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
            )}
          </Progress.Indicator>
        </Progress.Root>
      </div>
    </div>
  )
}
