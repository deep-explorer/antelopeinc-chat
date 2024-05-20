import { ReactElement, useState } from 'react'
import { IScoreCard, ScoreCard } from './vitamin/sub/score-card'
import { IScalar, IScalarElement, Scalar } from './vitamin/sub/scalar'
import { useWindowSize } from 'usehooks-ts'
import { Carousel } from './ui/carousel'
import { GaugeCard, IGaugeCard } from './vitamin/sub/gauge-card'
import Image from 'next/image'
import { PrimaryTooltip } from './ui/tooltip'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { IMapChartProps, MapChart } from './vitamin/sub/map-chart'
import { Explainer, IExplainer } from './vitamin/sub/explainer'
import { Accordion } from './ui/accordion'

type ContainerType = 'grid' | 'stacked' | 'slider'

export interface IContent {
  display: 'container'
  type: ContainerType
  header: string
  texts?: string[]
  icon?: string
  tooltip?: string
  children: (
    | IContent
    | IScoreCard
    | IScalar
    | IGaugeCard
    | IMapChartProps
    | IExplainer
  )[]
}

export interface IBasicElement {
  display: 'element'
  type: 'scorecard' | 'scalar' | 'gauge' | 'map' | 'explainer'
  title: string
  icon: string
  tooltip: string
}

interface ContentTemplateProps extends IContent {
  flag?: 'pros' | 'cons'
  footer?: React.ReactNode
  containerClassName?: string
}

export const ContentTemplate = ({
  header,
  texts,
  type,
  tooltip,
  icon,
  flag,
  children,
  footer,
  containerClassName
}: ContentTemplateProps) => {
  const { width: windowWidth } = useWindowSize()

  return (
    <div className={`flex flex-col gap-2 md:gap-4 ${containerClassName}`}>
      <div className="flex justify-between">
        <div className="flex gap-3">
          {icon && (
            <div>
              <Image
                src={`/image-icons/${icon}.png`}
                height={windowWidth > 768 ? 48 : 30}
                width={windowWidth > 768 ? 48 : 30}
                alt={icon}
              />
            </div>
          )}
          <h1
            className={`text-lg md:text-xl font-bold self-center ${children[0].type === 'explainer' ? (children[0].urgency === 'critical' ? 'text-[#EA3F3F]' : children[0].urgency === 'suggested' ? 'text-[#FFA34E]' : 'text-[#24AE8D]') : ''}`}
          >
            {header}
          </h1>
        </div>
        {tooltip && (
          <PrimaryTooltip
            trigger={
              <InfoCircledIcon className="size-[18px] opacity-20 hover:opacity-40 cursor-pointer" />
            }
            description={tooltip}
          />
        )}
      </div>

      {texts?.map((text, index) => (
        <p className="text-sm md:text-base" key={index}>
          {text}
        </p>
      ))}

      <ElementsWrapper type={type} child={children[0]}>
        {children.map((child, index) => (
          <>
            {child.display === 'container' && (
              <ContentTemplate {...child} containerClassName="gap-1 md:gap-2" />
            )}
            {child.type === 'scorecard' && <ScoreCard {...child} />}
            {child.type === 'scalar' && <Scalar flag={flag} {...child} />}
            {child.type === 'gauge' && (
              <GaugeCard {...child} className="mr-3" />
            )}
            {child.type === 'map' && <MapChart {...child} className="mr-3" />}
            {child.type === 'explainer' && (
              <Explainer {...child} className="mr-3" />
            )}
          </>
        ))}
      </ElementsWrapper>

      {children[0].type === 'scalar' &&
        (children[0].inset ? (
          <div className="flex gap-2 text-[#788589] text-sm md:text-base">
            <p>Industry Avg</p>
            <p>-----</p>
          </div>
        ) : (
          <div className="flex flex-wrap">
            <div className="w-[190px] hidden md:block" />
            <img
              src="/image-icons/ruler.png"
              height={36}
              width={420}
              alt="ruler"
            />
          </div>
        ))}

      {footer}
    </div>
  )
}

interface ElementsWrapperProps {
  type: ContainerType
  child:
    | IContent
    | IScoreCard
    | IScalar
    | IGaugeCard
    | IMapChartProps
    | IExplainer
  children: ReactElement[]
}

export const ElementsWrapper = ({
  type,
  child,
  children
}: ElementsWrapperProps) => {
  const { width: windowWidth } = useWindowSize()
  const [carouselIndex, setCarouselIndex] = useState(0)

  switch (type) {
    case 'grid':
      return (
        <div className="flex flex-wrap">
          {children.map((child, index) => (
            <div className="p-1 md:p-2 w-[50%]" key={index}>
              {child}
            </div>
          ))}
        </div>
      )
    case 'stacked':
      return <div className="flex flex-col gap-3 w-full">{children}</div>
    case 'slider':
      if (child.type === 'explainer') {
        let color
        let title = <></>
        switch (child.urgency) {
          case 'critical':
            color = '#EA3F3F'
            title = (
              <div className="font-semibold flex items-center gap-2">
                <Image
                  src={`/image-icons/${child.urgency}.png`}
                  height={20}
                  width={20}
                  alt={child.urgency}
                />
                Critical ({children.length})
              </div>
            )
            break
          case 'suggested':
            color = '#FFA34E'
            title = (
              <div className="font-semibold flex items-center gap-2">
                <Image
                  src={`/image-icons/${child.urgency}.png`}
                  height={20}
                  width={20}
                  alt={child.urgency}
                />
                Suggested ({children.length})
              </div>
            )
            break
          case 'consider':
            color = '#24AE8D'
            title = (
              <div className="font-semibold flex items-center gap-2">
                <Image
                  src={`/image-icons/${child.urgency}.png`}
                  height={20}
                  width={20}
                  alt={child.urgency}
                />
                Consider ({children.length})
              </div>
            )
            break
          default:
            break
        }

        return (
          <Accordion title={title} containerClassName={`border-[${color}]`}>
            <Carousel onChange={i => setCarouselIndex(i)}>{children}</Carousel>
          </Accordion>
        )
      }
      return <Carousel onChange={i => setCarouselIndex(i)}>{children}</Carousel>
    default:
      return <div>{children}</div>
  }
}
