import Image from 'next/image'
import * as Tooltip from '@radix-ui/react-tooltip'
import { InfoCircledIcon } from '@radix-ui/react-icons'

interface OverviewSpecCardProps {
  icon: string
  score: string
  title: string
  tooltipDescription: string
}

export function OverviewSpecCard({
  icon,
  score,
  title,
  tooltipDescription
}: OverviewSpecCardProps) {
  return (
    <div className="p-5 flex justify-between bg-[#1E333B] rounded">
      <div className="flex gap-4">
        <Image
          src={`/image-icons/${icon}.png`}
          height={80}
          width={80}
          alt={title}
        />
        <div>
          <h2 className="text-[40px] font-bold">{score}</h2>
          <p className="text-[#788589]">{title}</p>
        </div>
      </div>
      <Tooltip.Provider>
        <Tooltip.Root delayDuration={200}>
          <Tooltip.Trigger asChild>
            <InfoCircledIcon className="size-[18px] opacity-20 hover:opacity-40 cursor-pointer" />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="bottom"
              align="end"
              className="max-w-[220px] data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-primary px-[15px] py-[10px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] text-xs font-extralight"
              sideOffset={4}
              style={{ transform: 'translateX(8px)' }}
            >
              {tooltipDescription}
              <Tooltip.Arrow
                className="fill-primary"
                style={{ transform: 'translateX(8px)' }}
              />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  )
}
