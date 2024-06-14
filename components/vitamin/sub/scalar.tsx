import * as Tooltip from '@radix-ui/react-tooltip'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import * as Progress from '@radix-ui/react-progress'
import React from 'react'
import Image from 'next/image'
import { useWindowSize } from 'usehooks-ts'
import { PrimaryTooltip } from '@/components/ui/tooltip'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'
import { IBasicElement } from '@/components/content-template'

export interface IScalarElement {
  title: string
  logo: string
  tooltip: string
  // value: number //  0 - 100
  tooltipDescription?: string
}

export interface IScalarIndicator extends IScalarElement {
  percent: number //  0 - 100
}

export interface IScalar extends IBasicElement {
  type: 'scalar'
  low?: IScalarElement
  high?: IScalarElement
  value: IScalarIndicator
  inset?: string
  industry?: number

  flag?: 'pros' | 'cons'
}

export function Scalar({
  title,
  tooltip,
  icon,
  low,
  high,
  value,
  industry,
  flag = 'pros'
}: IScalar) {
  const { width: windowWidth } = useWindowSize()
  const [progress, setProgress] = React.useState(0)
  const { isEmailVerified } = useFreeChatContext()

  React.useEffect(() => {
    if (isEmailVerified) {
      setProgress(value.percent)
    }
  }, [isEmailVerified])

  const internalFlag = industry
    ? industry > value.percent
      ? 'cons'
      : 'pros'
    : flag
  return (
    <div className="flex flex-wrap">
      <div className="flex w-full md:w-[160px] justify-between items-center mb-2 md:mr-5">
        <p className="text-xs md:text-base">{title}</p>
        <PrimaryTooltip description={tooltip || 'No description'} />
      </div>

      <div className="flex justify-between gap-1 md:gap-3 w-full md:w-auto">
        {low && (
          <PrimaryTooltip
            description={low?.tooltip}
            bgColor='#ea3f3f'
          >
            <Image
              src={low.logo}
              height={windowWidth > 768 ? 48 : 24}
              width={windowWidth > 768 ? 48 : 24}
              alt="renzos-trails"
              className="rounded-full w-[48px] h-[48px] border-2 hover:border-[#EA3F3F]  cursor-pointer"
              style={{
                height: windowWidth > 768 ? 48 : 24,
                width: windowWidth > 768 ? 48 : 24
              }}
            />
          </PrimaryTooltip>
        )}

        <Progress.Root
          className="relative bg-blackA6 rounded-full min-w-[180px] w-[inherit] md:min-w-[365px] h-[10px] md:h-4 shadow-md bg-[#32474F] self-center"
          style={{
            // Fix overflow clipping in Safari
            // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
            transform: 'translateZ(0)'
          }}
          value={progress}
        >
          <Progress.Indicator
            className="relative h-full transition-all duration-1000 ease-in-out rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: internalFlag === 'pros' ? '#24AE8D' : '#EA3F3F'
            }}
          >
            {industry && (
              <>
                <div className="absolute top-0 md:top-1 left-2 md:left-4 text-white text-[14px]">
                  {progress > 0 ? `${progress}%` : ''}
                </div>
                <img
                  src="/image-icons/progress-bar-indicator.png"
                  height={windowWidth > 768 ? 32 : 20}
                  width={windowWidth > 768 ? 2 : 1.2}
                  alt="progress-bar-indicator"
                  className="relative transition-all duration-1000 ease-in-out"
                  style={{
                    left: `${(industry / progress) * 100}%`
                  }}
                />
              </>
            )}

            <div>
              {isEmailVerified && (
                <Image
                  src={value.logo}
                  height={windowWidth > 768 ? 36 : 20}
                  width={windowWidth > 768 ? 36 : 20}
                  alt="renzos-indicator"
                  className="absolute top-0 right-0 rounded-full border-2 transition-all duration-1000 ease-in-out"
                  style={{
                    transform: `translate(9px, ${windowWidth > 768 ? -8 : -4}px)`,
                    borderColor: internalFlag === 'pros' ? '#24AE8D' : '#EA3F3F'
                  }}
                />
              )}
            </div>
          </Progress.Indicator>
        </Progress.Root>

        {high && (
          <PrimaryTooltip
            description={high?.tooltip}
            bgColor="#24ae8d"
          >
            <Image
              src={high.logo}
              height={windowWidth > 768 ? 48 : 24}
              width={windowWidth > 768 ? 48 : 24}
              alt="renzos-leads"
              className="rounded-full w-[48px] h-[48px] border-2 hover:border-[#24AE8D]  cursor-pointer"
              style={{
                height: windowWidth > 768 ? 48 : 24,
                width: windowWidth > 768 ? 48 : 24
              }}
            />
          </PrimaryTooltip>
        )}
      </div>
      <img
        src="/image-icons/ruler.png"
        height={36}
        alt="ruler"
        className="md:hidden mt-1 w-full"
      />
    </div>
  )
}
