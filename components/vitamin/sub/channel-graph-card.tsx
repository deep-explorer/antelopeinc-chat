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
      width={48}
      height={48}
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
  return (
    <div className="min-w-[605px] rounded-md bg-[#1E333B] flex flex-col gap-6 p-8">
      <div className="flex gap-2">
        <Image
          src={'/image-icons/instagram.png'}
          width={48}
          height={48}
          alt="instagram-logo"
        />
        <h2 className="text-xl self-center">Instagram</h2>
      </div>
      <p>
        Instagram engagement metrics suggest a highly active and loyal
        community, with users resonating strongly with visually-driven
        storytelling and behind-the-scenes content.
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }}
        >
          <CartesianGrid strokeOpacity={0.1} />
          <XAxis
            type="number"
            dataKey="x"
            domain={[0, 100]}
            padding={{ left: 30, right: 30 }}
            tickFormatter={(value, index) => {
              if (value === 0) return 'Few'
              if (value === 100) return 'Many'
              return ''
            }}
          >
            <Label value="Engagement" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis
            type="number"
            dataKey="y"
            domain={[0, 100]}
            padding={{ top: 30, bottom: 30 }}
            tickFormatter={(value, index) => {
              if (value === 0) return 'Low'
              if (value === 100) return 'High'
              return ''
            }}
          >
            <Label value="Content" angle={-90} position="insideLeft" />
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
