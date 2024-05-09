import { Skeleton } from '@radix-ui/themes'

export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-4 py-1 md:py-2">
      <Skeleton width={'40%'} height={'24px'} />
      <div>
        <Skeleton>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          felis tellus, efficitur id convallis a, viverra eget libero. Nam magna
          erat, fringilla sed commodo sed, aliquet nec magna.
        </Skeleton>
      </div>
      <Skeleton>
        <p className="text-sm md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          felis tellus, efficitur id convallis a, viverra eget libero. Nam magna
          erat, fringilla sed commodo sed, aliquet nec magna. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Pellentesque felis tellus,
          efficitur id convallis a, viverra eget libero. Nam magna erat,
          fringilla sed commodo sed, aliquet nec magna.
        </p>
      </Skeleton>
      <Skeleton>
        <p className="text-sm md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          felis tellus, efficitur id convallis a, viverra eget libero. Nam magna
          erat, fringilla sed commodo sed, aliquet nec magna. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Pellentesque felis tellus,
          efficitur id convallis a, viverra eget libero. Nam magna erat,
          fringilla sed commodo sed, aliquet nec magna.
        </p>
      </Skeleton>
    </div>
  )
}
