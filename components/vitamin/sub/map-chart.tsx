import { IBasicElement } from '@/components/content-template'
import { PrimaryTooltip } from '@/components/ui/tooltip'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from 'recharts'
import { ScatterCustomizedShape } from 'recharts/types/cartesian/Scatter'
import { useWindowSize } from 'usehooks-ts'

const data = [
  { name: 'Other1', x: 10, y: 60 },
  { name: 'Renzos', x: 20, y: 20 },
  {
    name: 'Other2',
    x: 60,
    y: 60
  },
  {
    name: 'Other3',
    x: 75,
    y: 93
  },
  {
    name: 'Other4',
    x: 88,
    y: 17
  }
]

const renderCustomShape = (props: {
  cx: number
  cy: number
  payload: any
}): JSX.Element => {
  const { cx, cy } = props

  return (
    <>
      <defs>
        <clipPath id={`round${props.payload.key}`}>
          <circle cx={cx} cy={cy} r={window.innerWidth > 768 ? 24 : 12} />
        </clipPath>
      </defs>
      <image
        href={`${props.payload.logo}`}
        x={cx - (window.innerWidth > 768 ? 24 : 12)}
        y={cy - (window.innerWidth > 768 ? 24 : 12)}
        className="size-6 md:size-12"
        clipPath={`url(#round${props.payload.key})`}
      />
    </>
  )
}

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-primary rounded-md p-2">
        <p className="text-[10px] md:text-[14px]">{payload[0].payload.name}</p>
      </div>
    )
  }

  return null
}

export interface IMapChartProps extends IBasicElement {
  type: 'map'
  axes: {
    x: string
    y: string
  }
  children: IMapElements
  className?: string
}

interface IMapElements {
  [key: string]: {
    logo: string
    tooltip: string
    x: number
    y: number
    size: number //   ?
  }
}
export function MapChart({
  title,
  tooltip,
  axes,
  icon,
  children,
  className
}: IMapChartProps) {
  const { width: windowWidth } = useWindowSize()

  return (
    <div
      className={`w-[260px] md:w-[605px] rounded-md bg-[#1E333B] flex flex-col gap-3 md:gap-6 p-4 md:p-8 ${className}`}
    >
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Image
            src={icon}
            width={windowWidth > 768 ? 48 : 24}
            height={windowWidth > 768 ? 48 : 24}
            alt={`/image-icons/${icon}.png`}
            className="rounded-md"
          />
          <h2 className="text-lg md:text-xl font-bold self-center">{title}</h2>
        </div>
        <PrimaryTooltip description={tooltip} />
      </div>
      <p className="text-xs md:text-lg">
        {/* TODO: description from Props */}
        {title} engagement metrics suggest a highly active and loyal community,
        with users resonating strongly with visually-driven storytelling and
        behind-the-scenes content.
      </p>
      <ResponsiveContainer width="100%" height={windowWidth > 768 ? 400 : 200}>
        <ScatterChart>
          <CartesianGrid
            strokeOpacity={0.1}
            // enableBackground={'/image-icons/invalid.png'}
          />
          <XAxis
            type="number"
            dataKey="x"
            domain={[0, 100]}
            padding={{
              left: windowWidth > 768 ? 20 : 8
            }}
            tickFormatter={(value, index) => {
              if (value === 0) return 'Few'
              if (value === 100) return 'Many'
              return ''
            }}
            style={{
              fontSize: windowWidth > 768 ? 14 : 10
            }}
          >
            <Label
              value={axes.x}
              offset={10}
              position="insideBottom"
              className="fill-white"
              style={{
                textAnchor: 'middle',
                letterSpacing: '1px',
                fontSize: windowWidth > 768 ? 14 : 10
              }}
            />
          </XAxis>
          <YAxis
            type="number"
            dataKey="y"
            domain={[0, 100]}
            padding={{
              bottom: windowWidth > 768 ? 20 : 8
            }}
            tickFormatter={(value, index) => {
              if (value === 0) return 'Low'
              if (value === 100) return 'High'
              return ''
            }}
            style={{
              fontSize: windowWidth > 768 ? 14 : 10
            }}
          >
            <Label
              value={axes.y}
              offset={40}
              angle={-90}
              position="insideLeft"
              className="fill-white"
              style={{
                textAnchor: 'middle',
                letterSpacing: '1px',
                fontSize: windowWidth > 768 ? 14 : 10
              }}
            />
          </YAxis>
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={CustomTooltip}
          />
          <Scatter
            name="A school"
            data={Object.keys(children).map((key, index) => {
              const maxX = Math.max(
                ...Object.values(children).map(child => child.x)
              )
              const maxY = Math.max(
                ...Object.values(children).map(child => child.y)
              )

              const minX = Math.min(
                ...Object.values(children).map(child => child.x)
              )
              const minY = Math.min(
                ...Object.values(children).map(child => child.y)
              )

              const avgX =
                Object.values(children).reduce(
                  (acc, child) => acc + child.x,
                  0
                ) / Object.keys(children).length
              const avgY =
                Object.values(children).reduce(
                  (acc, child) => acc + child.y,
                  0
                ) / Object.keys(children).length

              return {
                name: key,
                x:
                  children[key].x > avgX
                    ? 50 + ((children[key].x - avgX) / (maxX - avgX)) * 45
                    : 50 - ((avgX - children[key].x) / (avgX - minX)) * 45,
                y:
                  children[key].y > avgY
                    ? 50 + ((children[key].y - avgY) / (maxY - avgY)) * 45
                    : 50 - ((avgY - children[key].y) / (avgY - minY)) * 45,
                logo: children[key].logo,
                tooltip: children[key].tooltip,
                size: children[key].size,
                key: title + index
              }
            })}
            shape={renderCustomShape as ScatterCustomizedShape}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
