import { Fragment, ReactElement, useState } from 'react'
import { IScoreCard, ScoreCard } from './vitamin/sub/score-card'
import { IScalar, IScalarElement, Scalar } from './vitamin/sub/scalar'
import { useWindowSize } from 'usehooks-ts'
import { Carousel } from './ui/carousel'
import { GaugeCard, IGaugeCard } from './vitamin/sub/gauge-card'
import Image from 'next/image'
import { PrimaryTooltip } from './ui/tooltip'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { IMapChartProps, MapChart } from './vitamin/sub/map-chart'
import { Explainer, IExplainer, Urgency } from './vitamin/sub/explainer'
import { Accordion } from './ui/accordion'

type ContainerType = 'grid' | 'stacked' | 'slider' | 'accordion'

export interface IContainer {
  display: 'container'
  type: ContainerType
  header: string
  caption?: string //  accordion
  texts?: string[]
  icon?: string
  tooltip?: string
  children: (
    | IContainer
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

interface ContentTemplateProps extends IContainer {
  flag?: 'pros' | 'cons'
  footer?: React.ReactNode
  containerClassName?: string
}

export const ContentTemplate = ({
  header,
  caption,
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
  const [carouselProgress, setCarouselProgress] = useState(0)
  
  return (
    <div className={`flex flex-col gap-2 md:gap-4 ${containerClassName}`}>
      <div className="flex justify-between">
        <div className="flex gap-3">
          {icon && (
            <div>
              <Image
                src={icon}
                height={windowWidth > 768 ? 48 : 30}
                width={windowWidth > 768 ? 48 : 30}
                alt={`/image-icons/${icon}.png`}
              />
            </div>
          )}
          <h1
            className={`text-lg md:text-xl font-bold self-center ${header === 'Critical' ? 'text-[#EA3F3F]' : header === 'Suggested' ? 'text-[#FFA34E]' : header === 'Consider' ? 'text-[#24AE8D]' : ''}`}
          >
            {header}
          </h1>
        </div>
        {tooltip && (
          <PrimaryTooltip
            description={tooltip}
          />
        )}
      </div>

      {texts?.map((text, index) => (
        <p className="text-xs md:text-base" key={index}>
          {text}
        </p>
      ))}

      <ElementsWrapper
        type={type}
        child={children[0]}
        caption={caption}
        setCarouselProgress={setCarouselProgress}
      >
        {children.map((child, index) => (
          <Fragment key={index}>
            {child.display === 'container' && (
              <ContentTemplate {...child} containerClassName="gap-1 md:gap-2" />
            )}
            {child.type === 'scorecard' && <ScoreCard {...child} />}
            {child.type === 'scalar' && <Scalar flag={flag} {...child} />}
            {child.type === 'gauge' && (
              <>
                <GaugeCard
                  {...child}
                  isInView={
                    index <= (children.length - 1) * carouselProgress + 1
                  }
                />
              </>
            )}
            {child.type === 'map' && <MapChart {...child} />}
            {child.type === 'explainer' && <Explainer {...child} />}
          </Fragment>
        ))}
      </ElementsWrapper>

      {children[0].type === 'scalar' &&
        (children[0].inset ? (
          <div className="flex gap-2 text-[#788589] text-sm md:text-base">
            <p>Industry Avg</p>
            <p>-----</p>
          </div>
        ) : (
          <div className="hidden md:flex flex-wrap">
            <div className="w-[180px]" />
            <img src="/image-icons/ruler.png" height={36} alt="ruler" />
          </div>
        ))}

      {footer}
    </div>
  )
}

interface ElementsWrapperProps {
  type: ContainerType
  child:
    | IContainer
    | IScoreCard
    | IScalar
    | IGaugeCard
    | IMapChartProps
    | IExplainer
  caption?: string
  children: ReactElement[]
  setCarouselProgress: (index: number) => void
}

export const ElementsWrapper = ({
  type,
  child,
  caption,
  children,
  setCarouselProgress
}: ElementsWrapperProps) => {
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
      return (
        <Carousel onChange={progress => setCarouselProgress(progress)}>
          {children}
        </Carousel>
      )
    case 'accordion':
      let color = '#fff'
      let title = <>{caption}</>

      let urgency
      if (child.display === 'container') {
        urgency = getUrgencyOfContainer(child)
      } else {
        urgency = child.type === 'explainer' ? child.urgency : undefined
      }
      if (urgency) {
        title = (
          <div className="font-semibold flex items-center gap-2">
            <Image
              src={`/image-icons/${urgency}.png`}
              height={20}
              width={20}
              alt={urgency}
            />
            {caption}
          </div>
        )
        switch (urgency) {
          case 'critical':
            color = '#EA3F3F'
            break
          case 'suggested':
            color = '#FFA34E'
            break
          case 'consider':
            color = '#24AE8D'
            break
          default:
            break
        }
      }

      return (
        <Accordion title={title} containerBorderColor={color}>
          {children}
        </Accordion>
      )
    // }
    default:
      return <div>{children}</div>
  }
}

const getUrgencyOfContainer = (container: IContainer): Urgency | undefined => {
  if (container.children.length === 0) return undefined
  if (container.children[0].display === 'container') {
    return getUrgencyOfContainer(container.children[0])
  }

  if (container.children[0].type === 'explainer') {
    return container.children[0].urgency
  }
  return undefined
}
