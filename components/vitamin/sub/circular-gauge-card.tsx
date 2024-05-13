import Image from 'next/image'
import ReactSpeedometer, {
  CustomSegmentLabelPosition
} from 'react-d3-speedometer'
import { useWindowSize } from 'usehooks-ts'
import { useTheme } from 'next-themes'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import React from 'react'
import { PrimaryTooltip } from '@/components/ui/tooltip'

interface CircularGaugeCardProps {
  icon: string
  title: string
  value: number
  description: string
  className?: string
}

export function CircularGaugeCard({
  icon,
  title,
  value,
  description,
  className
}: CircularGaugeCardProps) {
  const { width: windowWidth } = useWindowSize()
  const { theme } = useTheme()

  return (
    <div
      className={`p-3 md:p-5 flex flex-col gap-3 md:gap-6 bg-[#1E333B] rounded w-[180px] md:w-[314px] ${className}`}
    >
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div>
            <Image
              src={`/image-icons/${icon}.png`}
              height={windowWidth > 768 ? 48 : 30}
              width={windowWidth > 768 ? 48 : 30}
              alt={icon}
            />
          </div>
          <h2 className="text-sm md:text-lg font-semibold self-center">
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
      <div className="w-full flex justify-center">
        <div className="orbit">
          <img
            src="/image-icons/gauge.png"
            height={windowWidth > 768 ? 220 : 120}
            width={windowWidth > 768 ? 220 : 120}
            alt="gauge"
          />
          <div
            className="absolute top-[45%] left-[45%] md:top-[43%] md:left-[43%] w-[12px] h-[12px] md:w-[28px] md:h-[28px] rounded-full border-[3px] md:border-[6px] bg-white"
            style={{
              animation: `orbit 2s linear ${value / 1000 / 1.115} forwards`,
              borderColor: levels[Math.ceil((value / 1000) * 5) - 1].color
            }}
          ></div>
          <p
            className="absolute text-center w-full top-[48px] md:top-[92px] text-base md:text-3xl font-bold"
            style={{
              color: levels[Math.ceil((value / 1000) * 5) - 1].color
            }}
          >
            {levels[Math.ceil((value / 1000) * 5) - 1].caption}
          </p>
        </div>
      </div>
      {/* <ReactSpeedometer
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
      /> */}
      <p className="text-sm md:text-base">{description}</p>
    </div>
  )
}

const levels = [
  { caption: 'Very Low', color: '#EA3F3F' },
  { caption: 'Low', color: '#EA9A40' },
  { caption: 'Average', color: '#EABA3F' },
  { caption: 'High', color: '#90B564' },
  { caption: 'Very High', color: '#24AE8D' }
]
