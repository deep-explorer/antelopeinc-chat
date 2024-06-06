import {cache} from 'react'
import { fetcher } from '@/lib/utils'
import { antelopeEndpoint } from '@/lib/constants/config'

export const openGraphImage = {
  images: ['/thumbnail.png']
}

export const getMetadata = cache(async (brand: string) => {
  try {
    const res = await fetcher(
      `${antelopeEndpoint}/chatbots/intro?origin=leadgen&shortcode=${brand}`
    )

    return res.data
  } catch (err) {
    console.log('error------>', err)
    return null
  }
})