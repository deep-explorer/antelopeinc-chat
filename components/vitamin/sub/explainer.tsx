import Image from 'next/image'
import { useWindowSize } from 'usehooks-ts'
import { ArrowTopRightIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { PrimaryTooltip } from '@/components/ui/tooltip'
import { useEffect, useState } from 'react'
import { IBasicElement } from '@/components/content-template'
import { Carousel } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'

export type Urgency = 'critical' | 'suggested' | 'consider'
export interface IExplainer extends IBasicElement {
  display: 'element'
  type: 'explainer'
  urgency: Urgency
  texts: string[]
  detail: {
    texts: string[]
  }
  link: {
    caption: string
    target: string
  }
  className?: string
  isInView?: boolean
}

export function Explainer({
  icon,
  title,
  urgency,
  texts,
  detail,
  link,
  tooltip,
  className,
  isInView = true
}: IExplainer) {
  const { width: windowWidth } = useWindowSize()
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    if (isInView) {
      setVisible(true)
    }
  }, [isInView])
  return (
    <div
      className={`p-3 md:p-5 flex flex-col justify-between bg-[#293D45] rounded-xl w-[224px] md:w-[310px] h-full border-2 border-[#3E5057] ${className}`}
    >
      <div className="flex flex-col gap-2 md:gap-3">
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <img
              src={`/image-icons/${icon}.png`}
              style={{
                height: `${windowWidth < 768 ? '44px' : '64px'}`,
                width: `${windowWidth < 768 ? '44px' : '64px'}`
              }}
              alt={icon}
            />
            <h3 className="text-base md:text-xl font-semibold">{title}</h3>
          </div>
          <img
            src={`/image-icons/${urgency}.png`}
            style={{
              height: '18px',
              width: '18px'
            }}
            alt="urgency"
          />
        </div>

        <div
          className="text-sm md:text-base"
          dangerouslySetInnerHTML={{ __html: texts[0] }}
        ></div>
        <div>
          <div
            className="text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: texts[1] }}
          ></div>
          <div className="text-sm md:text-base my-2 px-2 md:px-4 py-4 md:py-8 rounded-md bg-[#3D5057] text-center">
            {detail.texts[0]}
          </div>
        </div>
      </div>

      <Button
        // variant={'ghost'}
        className="border-white border-solid border-[1px] border-opacity-20 h-8 md:h-[46px]"
        onClick={() => window.open(link.target)}
      >
        <div className="mr-1">{link.caption}</div>
        <ArrowTopRightIcon />
      </Button>
    </div>
  )
}
