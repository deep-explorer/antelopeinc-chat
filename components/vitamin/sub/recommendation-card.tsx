import Image from 'next/image'
import { ProsConsScore } from './pros-cons-score'
import { SocialScoreBar } from './social-score-bar'
import { Button } from '@/components/ui/button'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import { companyUrl } from '@/lib/constants/config'
import { useWindowSize } from 'usehooks-ts'

interface RecommendationCardProps {
  flag: 'critical' | 'suggested' | 'consider'
  icon: string
  title: string
  description: string
}

export function RecommendationCard({
  flag,
  icon,
  title,
  description
}: RecommendationCardProps) {
  const { width: windowWidth } = useWindowSize()

  return (
    <div
      className="p-3 md:p-5 flex flex-col justify-between bg-[#1E333B] rounded min-w-[250px] md:min-w-[314px] h-[270px] md:h-[400px] border-2"
      style={{
        borderColor:
          flag === 'critical'
            ? '#C62828'
            : flag === 'suggested'
              ? '#FFA000'
              : '#2E7D32'
      }}
    >
      <div className="flex flex-col gap-2 md:gap-3">
        <div className="flex justify-between mb-3">
          <Image
            src={`/image-icons/${icon}.png`}
            height={windowWidth > 768 ? 44 : 72}
            width={windowWidth > 768 ? 44 : 72}
            alt={icon}
          />
          <div>
            <Image
              src={`/image-icons/${flag}.png`}
              height={24}
              width={24}
              alt={flag}
            />
          </div>
        </div>
        <h3 className="text-[14px] md:text-2xl font-semibold">{title}</h3>
        <p className="text-[10px] md:text-[15px] text-[#999EA3]">
          {description}
        </p>
      </div>

      <Button
        variant={'ghost'}
        className="border-white border-solid border-[1px] border-opacity-20 h-8 md:h-[46px]"
        onClick={() => window.open(companyUrl)}
      >
        <div className="mr-1">Learn More</div>
        <ArrowTopRightIcon />
      </Button>
    </div>
  )
}
