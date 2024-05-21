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
      className={`p-3 md:p-5 flex flex-col justify-between bg-[#293D45] rounded-xl w-[250px] md:w-[314px] h-[340px] md:h-[284px] border-2 border-[#3E5057] ${className}`}
    >
      <div className="flex flex-col gap-2 md:gap-3">
        <div className="flex justify-between mb-3">
          <div className="flex gap-3">
            <Image
              src={`/image-icons/${icon}.png`}
              height={windowWidth < 768 ? 44 : 64}
              width={windowWidth < 768 ? 44 : 64}
              alt={icon}
            />
            <h3 className="text-lg md:text-2xl font-semibold">{title}</h3>
          </div>
          <div>
            <Image
              src={`/image-icons/${urgency}.png`}
              height={24}
              width={24}
              alt={urgency}
            />
          </div>
        </div>

        <p className="text-xs md:text-sm h-[78px] overflow-hidden">
          {texts[0]}
        </p>
      </div>

      <Button
        variant={'ghost'}
        className="border-white border-solid border-[1px] border-opacity-20 h-8 md:h-[46px]"
        onClick={() => window.open(link.target)}
      >
        <div className="mr-1">{link.caption}</div>
        <ArrowTopRightIcon />
      </Button>
    </div>
  )
}
