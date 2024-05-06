import Image from 'next/image'
import ReactSpeedometer, {
  CustomSegmentLabelPosition
} from 'react-d3-speedometer'
import { useWindowSize } from 'usehooks-ts'
import { useTheme } from 'next-themes'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import React from 'react'
import { PrimaryTooltip } from '@/components/ui/tooltip'

interface SpeedometerCardProps {
  icon: string
  title: string
  value: number
  description: string
}

export function SpeedometerCard({
  icon,
  title,
  value,
  description
}: SpeedometerCardProps) {
  const { width: windowWidth } = useWindowSize()
  const { theme } = useTheme()

  return (
    <div className="p-3 md:p-5 flex flex-col gap-3 md:gap-6 bg-[#1E333B] rounded min-w-[180px] md:min-w-[314px]">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Image
            src={`/image-icons/${icon}.png`}
            height={windowWidth > 768 ? 48 : 30}
            width={windowWidth > 768 ? 48 : 30}
            alt={icon}
          />
          <h2 className="text-[14px] md:text-2xl font-bold self-center">
            {title}
          </h2>
        </div>
        <PrimaryTooltip
          trigger={
            <InfoCircledIcon className="size-[18px] opacity-20 hover:opacity-40 cursor-pointer" />
          }
          description="Influencer activity looks at the relative share of sponsored mentions and engagement among competitors"
        />
      </div>
      <ReactSpeedometer
        value={value}
        currentValueText={levels[Math.ceil((value / 1000) * 5) - 1]}
        textColor={theme === 'dark' ? 'white' : 'black'}
        width={windowWidth > 768 ? 250 : 150}
        height={windowWidth > 768 ? 150 : 100}
        segmentColors={['#EA3F3F', '#EA9A40', '#EABA3F', '#90B564', '#24AE8D']}
        customSegmentLabels={levels.map(level => ({
          text: level,
          position: CustomSegmentLabelPosition.Outside,
          fontSize: windowWidth > 768 ? '12px' : '10px',
          color: theme === 'dark' ? 'white' : 'black'
        }))}
      />
      <p className="text-[10px] md:text-sm">{description}</p>
    </div>
  )
}

const levels = ['Very Low', 'Low', 'Average', 'High', 'Very High']
