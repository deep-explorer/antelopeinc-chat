import * as Progress from '@radix-ui/react-progress'
import React from 'react'
import Image from 'next/image'

interface SocialScoreBar {
  title: string
  value: number //  0 - 100
  flag: 'pros' | 'cons'
}

export function SocialScoreBar({ flag, title, value }: SocialScoreBar) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <h3 className="mb-2">{title}</h3>
      <Progress.Root
        className="relative bg-blackA6 rounded-full min-w-[200px] md:min-w-[280px] h-4 shadow-md bg-[#32474F] self-center"
        style={{
          transform: 'translateZ(0)'
        }}
        value={progress}
      >
        <Progress.Indicator
          className="relative h-full transition-all duration-500 ease-in-out rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: flag === 'pros' ? '#2E7D32' : '#C62828'
          }}
        >
          <Image
            src="/vitamin/logos/renzo.png"
            height={36}
            width={36}
            alt="renzo-indicator"
            className="absolute top-0 right-0 rounded-full w-[25px] h-[25px] border-2 transition-all duration-500 ease-in-out"
            style={{
              height: 36,
              width: 36,
              transform: 'translate(18px, -8px)',
              borderColor: flag === 'pros' ? '#2E7D32' : '#C62828'
            }}
          />
        </Progress.Indicator>
      </Progress.Root>
    </div>
  )
}
