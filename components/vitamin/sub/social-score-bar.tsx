import * as Progress from '@radix-ui/react-progress'
import React from 'react'
import Image from 'next/image'
import { useWindowSize } from 'usehooks-ts'

interface SocialScoreBar {
  title: string
  value: number //  0 - 100
  average: number //  0 - 100
  flag: 'pros' | 'cons'
}

export function SocialScoreBar({
  flag,
  title,
  value,
  average
}: SocialScoreBar) {
  const [progress, setProgress] = React.useState(0)
  const { width: windowWidth } = useWindowSize()

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <h3 className="mb-2 text-[10px] md:text-2xl">{title}</h3>
      <Progress.Root
        className="relative bg-blackA6 rounded-full min-w-[200px] md:min-w-[280px] h-5 md:h-8 shadow-md bg-[#32474F] self-center"
        style={{
          transform: 'translateZ(0)'
        }}
        value={progress}
      >
        <Progress.Indicator
          className="relative h-full transition-all duration-500 ease-in-out rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: flag === 'pros' ? '#18898D' : '#E76F51'
          }}
        >
          <div className="absolute top-0 md:top-1 left-2 md:left-4 text-white text-[14px]">
            {progress}%
          </div>
          <img
            src="/image-icons/progress-bar-indicator.png"
            height={windowWidth > 768 ? 32 : 20}
            width={windowWidth > 768 ? 2 : 1.2}
            alt="progress-bar-indicator"
            className="relative transition-all duration-500 ease-in-out"
            style={{
              left: `${(average / progress) * 100}%`
            }}
          />
          <Image
            src="/vitamin/logos/renzo.png"
            height={windowWidth > 768 ? 60 : 32}
            width={windowWidth > 768 ? 60 : 32}
            alt="renzo-indicator"
            className="absolute top-0 right-0 rounded-full border-[3px] md:border-[6px] transition-all duration-500 ease-in-out"
            style={{
              transform: `translate(18px, ${windowWidth > 768 ? -12 : -6}px)`,
              borderColor: flag === 'pros' ? '#18898D' : '#E76F51'
            }}
          />
        </Progress.Indicator>
      </Progress.Root>
    </div>
  )
}