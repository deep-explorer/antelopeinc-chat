import Image from 'next/image'
import ReactSpeedometer, {
  CustomSegmentLabelPosition
} from 'react-d3-speedometer'
import { useWindowSize } from 'usehooks-ts'
import { useTheme } from 'next-themes'

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
    <div className="p-3 md:p-5 flex flex-col gap-3 md:gap-6 bg-[#1E333B] rounded w-[314px]">
      <div className="flex gap-3">
        <Image
          src={`/image-icons/${icon}.png`}
          height={48}
          width={48}
          alt={icon}
        />
        <h2 className="text-xl self-center">{title}</h2>
      </div>
      <ReactSpeedometer
        value={value}
        currentValueText={levels[Math.ceil((value / 1000) * 5) - 1]}
        textColor={theme === 'dark' ? 'white' : 'black'}
        width={250}
        height={150}
        segmentColors={['#EA3F3F', '#EA9A40', '#EABA3F', '#90B564', '#24AE8D']}
        customSegmentLabels={levels.map(level => ({
          text: level,
          position: CustomSegmentLabelPosition.Outside,
          fontSize: windowWidth > 768 ? '12px' : '10px',
          color: theme === 'dark' ? 'white' : 'black'
        }))}
      />
      <p>{description}</p>
    </div>
  )
}

const levels = ['Very Low', 'Low', 'Average', 'High', 'Very High']
