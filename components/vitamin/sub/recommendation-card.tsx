import Image from 'next/image'
import { ProsConsScore } from './pros-cons-score'
import { SocialScoreBar } from './social-score-bar'
import { Button } from '@/components/ui/button'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import { companyUrl } from '@/lib/constants/config'

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
  return (
    <div
      className="p-5 flex flex-col justify-between bg-[#1E333B] rounded min-w-[250px] md:min-w-[300px] h-[400px] border-2"
      style={{
        borderColor:
          flag === 'critical'
            ? '#C62828'
            : flag === 'suggested'
              ? '#FFA000'
              : '#2E7D32'
      }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <Image
            src={`/image-icons/${icon}.png`}
            height={72}
            width={72}
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
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <Button variant={'outline'} onClick={() => window.open(companyUrl)}>
        <div className="mr-1">Learn More</div>
        <ArrowTopRightIcon />
      </Button>
    </div>
  )
}
