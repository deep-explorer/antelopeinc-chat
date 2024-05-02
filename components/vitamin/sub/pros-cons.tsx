import * as Tooltip from '@radix-ui/react-tooltip'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import * as Progress from '@radix-ui/react-progress'
import React from 'react'
import Image from 'next/image'

interface ProsConsProps {
  flag: 'pros' | 'cons'
  title: string
  description: string
  scores: Score[]
}

interface Score {
  key: string
  value: number //  0 - 100
  tooltipDescription?: string
}

export function ProsCons({ flag, title, description, scores }: ProsConsProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p>{description}</p>
      <div className="flex flex-col gap-3 w-full">
        {scores.map((score, index) => {
          const [progress, setProgress] = React.useState(0)

          React.useEffect(() => {
            const timer = setTimeout(() => setProgress(score.value), 1000)
            return () => clearTimeout(timer)
          }, [])

          return (
            <div className="flex flex-wrap" key={index}>
              <div className="flex w-[170px] justify-between items-center mr-5">
                <p>{score.key}</p>
                <Tooltip.Provider>
                  <Tooltip.Root delayDuration={200}>
                    <Tooltip.Trigger asChild>
                      <InfoCircledIcon className="size-[18px] opacity-20 hover:opacity-40 cursor-pointer" />
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="bottom"
                        align="end"
                        className="max-w-[160px] data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-primary px-[15px] py-[10px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] text-xs font-extralight"
                        sideOffset={4}
                        style={{ transform: 'translateX(8px)' }}
                      >
                        {score.tooltipDescription}
                        <Tooltip.Arrow
                          className="fill-primary"
                          style={{ transform: 'translateX(8px)' }}
                        />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>

              <div>
                <div className="flex gap-2 w-[420px]">
                  <Image
                    src="/vitamin/logos/maryruthorganics.png"
                    height={48}
                    width={48}
                    alt="renzo-trails"
                    className="rounded-full w-[48px] h-[48px] border-2 border-red-500"
                    style={{
                      height: 48,
                      width: 48
                    }}
                  />
                  <Progress.Root
                    className="relative bg-blackA6 rounded-full min-w-[200px] md:min-w-[300px] h-4 shadow-md bg-[#32474F] self-center"
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

                  <Image
                    src="/vitamin/logos/naturesway.png"
                    height={48}
                    width={48}
                    alt="renzo-leads"
                    className="rounded-full w-[48px] h-[48px] border-2 border-green-500"
                    style={{
                      height: 48,
                      width: 48
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex flex-wrap">
        <div className="w-[190px] hidden md:block" />

        <Image
          src="/image-icons/ruler.png"
          height={36}
          width={420}
          alt="ruler"
        />
      </div>
    </div>
  )
}
