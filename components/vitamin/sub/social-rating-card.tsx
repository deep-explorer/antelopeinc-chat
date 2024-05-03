import Image from 'next/image'
import { ProsConsScore } from './pros-cons-score'
import { SocialScoreBar } from './social-score-bar'

interface SocialRatingCardProps {
  icon: string
  title: string
  description: string
  totalRating: number
  averageScore: number
}

export function SocialRatingCard({
  icon,
  title,
  description,
  totalRating,
  averageScore
}: SocialRatingCardProps) {
  return (
    <div className="p-3 md:p-5 flex flex-col gap-3 md:gap-6 bg-[#1E333B] rounded min-w-[250px] md:w-[454px]">
      <div className="flex gap-3">
        <Image
          src={`/image-icons/${icon}.png`}
          height={48}
          width={48}
          alt={icon}
        />
        <h2 className="text-xl self-center">{title}</h2>
      </div>
      <p>{description}</p>
      <hr />
      <div className="flex flex-col gap-5">
        <SocialScoreBar flag="cons" title="Total Ratings" value={totalRating} />
        <SocialScoreBar
          flag="pros"
          title="Average Score"
          value={averageScore}
        />
        <p className="text-[#788589]">Industry Avg</p>
      </div>
    </div>
  )
}
