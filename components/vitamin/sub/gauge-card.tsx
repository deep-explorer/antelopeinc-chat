import Image from 'next/image'
import { useWindowSize } from 'usehooks-ts'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { PrimaryTooltip } from '@/components/ui/tooltip'
import { useEffect, useState } from 'react'
import { IBasicElement } from '@/components/content-template'

export interface IGaugeCard extends IBasicElement {
  type: 'gauge'
  value: number //  0 - 100
  texts: string[]
  className?: string
  isInView?: boolean
}

export function GaugeCard({
  icon,
  title,
  value,
  texts,
  tooltip,
  className,
  isInView = true
}: IGaugeCard) {
  const { width: windowWidth } = useWindowSize()
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    if (isInView) {
      setVisible(true)
    }
  }, [isInView])
  return (
    <div
      className={`p-3 md:p-5 flex flex-col gap-3 md:gap-6 bg-[#1E333B] rounded w-[180px] md:w-[314px] ${className}`}
    >
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="size-6 md:size-12 overflow-hidden rounded p-1 md:p-2 bg-[#18898D]">
            <img
              src={icon}
              className="size-4 md:size-8"
              alt={`/image-icons/${icon}.png`}
            />
          </div>
          <h2 className="text-xs md:text-lg font-semibold self-center">
            {title}
          </h2>
        </div>
        <PrimaryTooltip description={tooltip} />
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
              animation: isVisible
                ? `orbit ${((value + 20) / 100) * 3}s linear ${value / 100 / 1.115} forwards`
                : 'none',
              transform:
                windowWidth > 768
                  ? 'translate(-32px, 96px)'
                  : 'translate(-18px, 51px)',
              borderColor: levels[Math.ceil((value / 100) * 5) - 1].color
            }}
          ></div>
          <p
            className="absolute text-center w-full top-[72px] md:top-[140px] text-base md:text-3xl font-bold elementor-heading-title"
            style={{
              color: levels[Math.ceil((value / 100) * 5) - 1].color,
              animation: `elementor-heading-title ${value / 100}s linear 1 forwards`,
              display: isVisible ? 'block' : 'none'
            }}
          >
            {levels[Math.ceil((value / 100) * 5) - 1].caption}
          </p>
        </div>
      </div>
      <p className="text-xs md:text-base h-24 overflow-hidden">{texts[0]}</p>
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
