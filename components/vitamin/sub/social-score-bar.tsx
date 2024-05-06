import * as Progress from '@radix-ui/react-progress'
import React from 'react'
import Image from 'next/image'

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

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <h3 className="mb-2 text-2xl">{title}</h3>
      <Progress.Root
        className="relative bg-blackA6 rounded-full min-w-[200px] md:min-w-[280px] h-8 shadow-md bg-[#32474F] self-center"
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
          <div className="absolute top-1 left-4 text-white text-[14px]">
            {progress}%
          </div>
          <Image
            src="/image-icons/progress-bar-indicator.png"
            height={32}
            width={2}
            alt="progress-bar-indicator"
            className="relative transition-all duration-500 ease-in-out"
            style={{
              left: `${(average / progress) * 100}%`
            }}
          />
          <Image
            src="/vitamin/logos/renzo.png"
            height={60}
            width={60}
            alt="renzo-indicator"
            className="absolute top-0 right-0 rounded-full w-[25px] h-[25px] border-[6px] transition-all duration-500 ease-in-out"
            style={{
              height: 60,
              width: 60,
              transform: 'translate(18px, -12px)',
              borderColor: flag === 'pros' ? '#18898D' : '#E76F51'
            }}
          />
        </Progress.Indicator>
      </Progress.Root>
    </div>
  )
}
