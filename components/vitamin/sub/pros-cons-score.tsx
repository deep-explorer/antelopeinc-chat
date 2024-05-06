import * as Tooltip from '@radix-ui/react-tooltip'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import * as Progress from '@radix-ui/react-progress'
import React from 'react'
import Image from 'next/image'
import { useWindowSize } from 'usehooks-ts'
import { PrimaryTooltip } from '@/components/ui/tooltip'

export interface Score {
  title: string
  value: number //  0 - 100
  tooltipDescription?: string
}

interface ProsConsScoreProps extends Score {
  flag: 'pros' | 'cons'
}

export function ProsConsScore({
  flag,
  title,
  value,
  tooltipDescription
}: ProsConsScoreProps) {
  const { width: windowWidth } = useWindowSize()
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-wrap">
      <div className="flex w-full md:w-[170px] justify-between items-center mb-2 md:mr-5">
        <p className="text-xs md:text-base">{title}</p>
        <PrimaryTooltip
          trigger={
            <InfoCircledIcon className="size-[18px] opacity-20 hover:opacity-40 cursor-pointer" />
          }
          description={tooltipDescription || 'No description'}
        />
      </div>

      <div>
        <div className="flex gap-1 md:gap-3 w-[420px]">
          <Image
            src="/vitamin/logos/maryruthorganics.png"
            height={windowWidth > 768 ? 48 : 24}
            width={windowWidth > 768 ? 48 : 24}
            alt="renzo-trails"
            className="rounded-full w-[48px] h-[48px] border-2 border-red-500"
            style={{
              height: windowWidth > 768 ? 48 : 24,
              width: windowWidth > 768 ? 48 : 24
            }}
          />
          <Progress.Root
            className="relative bg-blackA6 rounded-full min-w-[180px] md:min-w-[300px] h-[10px] md:h-4 shadow-md bg-[#32474F] self-center"
            style={{
              // Fix overflow clipping in Safari
              // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
              transform: 'translateZ(0)'
            }}
            value={progress}
          >
            <Progress.Indicator
              className="relative h-full transition-all duration-500 ease-in-out rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: flag === 'pros' ? '#24AE8D' : '#C62828'
              }}
            >
              <div>
                <Image
                  src="/vitamin/logos/renzo.png"
                  height={windowWidth > 768 ? 36 : 20}
                  width={windowWidth > 768 ? 36 : 20}
                  alt="renzo-indicator"
                  className="absolute top-0 right-0 rounded-full border-2 transition-all duration-500 ease-in-out"
                  style={{
                    transform: `translate(9px, ${windowWidth > 768 ? -8 : -4}px)`,
                    borderColor: flag === 'pros' ? '#2E7D32' : '#C62828'
                  }}
                />
              </div>
            </Progress.Indicator>
          </Progress.Root>

          <Image
            src="/vitamin/logos/naturesway.png"
            height={windowWidth > 768 ? 48 : 24}
            width={windowWidth > 768 ? 48 : 24}
            alt="renzo-leads"
            className="rounded-full w-[48px] h-[48px] border-2 border-[#24AE8D]"
            style={{
              height: windowWidth > 768 ? 48 : 24,
              width: windowWidth > 768 ? 48 : 24
            }}
          />
        </div>
      </div>
    </div>
  )
}
