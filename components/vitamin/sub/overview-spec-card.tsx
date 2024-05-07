import Image from 'next/image'
import * as Tooltip from '@radix-ui/react-tooltip'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { useWindowSize } from 'usehooks-ts'
import { PrimaryTooltip } from '@/components/ui/tooltip'

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
  const { width: windowWidth } = useWindowSize()

  return (
    <div className="p-2 md:p-5 flex justify-between bg-[#1E333B] rounded">
      <div className="flex gap-4">
        <img
          src={`/image-icons/${icon}.png`}
          height={windowWidth > 768 ? 80 : 40}
          width={windowWidth > 768 ? 80 : 40}
          alt={title}
        />
        <div>
          <h2 className="text-lg md:text-2xl font-bold mb-4">{score}</h2>
          <p className="text-xs md:text-base font-medium text-[#788589]">
            {title}
          </p>
        </div>
      </div>
      <PrimaryTooltip
        trigger={
          <InfoCircledIcon className="size-[18px] opacity-20 hover:opacity-40 cursor-pointer" />
        }
        description={tooltipDescription}
      />
    </div>
  )
}
