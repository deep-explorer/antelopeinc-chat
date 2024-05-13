import { InfoCircledIcon } from '@radix-ui/react-icons'
import { useWindowSize } from 'usehooks-ts'
import { PrimaryTooltip } from '@/components/ui/tooltip'
import SlotCounter from 'react-slot-counter'

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
    <div className="p-2 md:p-5 relative flex gap-2 md:gap-4 bg-[#1E333B] rounded">
      <div>
        <img
          src={`/image-icons/${icon}.png`}
          height={windowWidth > 768 ? 80 : 24}
          width={windowWidth > 768 ? 80 : 24}
          alt={title}
        />
      </div>
      <div>
        <div className="text-base md:text-2xl font-bold  md:mb-4">
          <SlotCounter value={score} animateOnVisible={{ triggerOnce: true }} />
        </div>
        <p className="text-[10px] md:text-base font-medium text-[#788589]">
          {title}
        </p>
      </div>
      <div className="absolute top-2 md:top-5 right-2 md:right-5">
        <PrimaryTooltip
          trigger={
            <InfoCircledIcon className="size-[12px] md:size-[18px] opacity-20 hover:opacity-40 cursor-pointer" />
          }
          description={tooltipDescription}
        />
      </div>
    </div>
  )
}
