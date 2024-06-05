import { useWindowSize } from 'usehooks-ts'
import { PrimaryTooltip } from '@/components/ui/tooltip'
import SlotCounter from 'react-slot-counter'
import { IBasicElement } from '@/components/content-template'

export interface IScoreCard extends IBasicElement {
  type: 'scorecard'
  value: number
  prefix?: string //  scorecard
  suffix?: string //  scorecard
}

export function ScoreCard({
  icon,
  title,
  value,
  tooltip,
  prefix,
  suffix
}: IScoreCard) {
  const { width: windowWidth } = useWindowSize()

  return (
    <div className="p-2 md:p-5 relative flex gap-2 md:gap-4 bg-[#1E333B] rounded">
      <div>
        <img
          src={icon}
          height={windowWidth > 768 ? 80 : 24}
          width={windowWidth > 768 ? 80 : 24}
          alt={title}
        />
      </div>
      <div>
        <div className="text-base md:text-2xl font-bold  md:mb-4">
          <SlotCounter
            value={`${prefix}${value}${suffix}`}
            animateOnVisible={{ triggerOnce: true }}
          />
        </div>
        <p className="text-[10px] md:text-base font-medium text-[#788589]">
          {title}
        </p>
      </div>
      <div className="absolute top-2 md:top-5 right-2 md:right-5">
        <PrimaryTooltip description={tooltip} />
      </div>
    </div>
  )
}
