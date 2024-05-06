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
  { name: 'Renzo', x: 20, y: 20 },
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
  // const { width: windowWidth } = useWindowSize()

  const { cx, cy } = props
  let icon = 'renzo'
  switch (props.payload.name) {
    case 'Other1':
      icon = 'flintstonesvitamins'
      break
    case 'Other2':
      icon = 'maryruthorganics'
      break
    case 'Other3':
      icon = 'naturesway'
      break
    case 'Other4':
      icon = 'smartypantsvitamins'
  }

  return (
    <image
      href={`/vitamin/logos/${icon}.png`}
      x={cx - 24}
      y={cy - 24}
      // width={windowWidth > 768 ? 48 : 24}
      // height={windowWidth > 768 ? 48 : 24}
      className="md:w-12 md:h-12 w-6 h-6"
    />
  )
}

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-primary rounded-md p-2">
        <p className="">{payload[0].payload.name}</p>
      </div>
    )
  }

  return null
}

export function ChannelGraphCard() {
  const { width: windowWidth } = useWindowSize()

  return (
    <div className="min-w-[280px] md:min-w-[605px] rounded-md bg-[#1E333B] flex flex-col gap-3 md:gap-6 p-4 md:p-8">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Image
            src={'/image-icons/instagram.png'}
            width={48}
            height={48}
            alt="instagram-logo"
          />
          <h2 className="text-2xl font-bold self-center">Instagram</h2>
        </div>
        <PrimaryTooltip
          trigger={
            <InfoCircledIcon className="size-[18px] opacity-20 hover:opacity-40 cursor-pointer" />
          }
          description="Influencer activity looks at the relative share of sponsored mentions and engagement among competitors"
        />
      </div>
      <p>
        Instagram engagement metrics suggest a highly active and loyal
        community, with users resonating strongly with visually-driven
        storytelling and behind-the-scenes content.
      </p>
      <ResponsiveContainer width="100%" height={windowWidth > 768 ? 400 : 200}>
        <ScatterChart>
          <CartesianGrid
            strokeOpacity={0.1}
            enableBackground={'/image-icons/invalid.png'}
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
          >
            <Label
              value="Engagement"
              offset={10}
              position="insideBottom"
              className="fill-white"
              style={{
                textAnchor: 'middle',
                letterSpacing: '1px'
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
          >
            <Label
              value="Content"
              offset={40}
              angle={-90}
              position="insideLeft"
              className="fill-white"
              style={{
                textAnchor: 'middle',
                letterSpacing: '1px'
              }}
            />
          </YAxis>
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={CustomTooltip}
          />
          <Scatter
            name="A school"
            data={data}
            shape={renderCustomShape as ScatterCustomizedShape}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
