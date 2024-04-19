'use client'

import dynamic from 'next/dynamic'
import { StockSkeleton } from './stock-skeleton'
import { StocksSkeleton } from './stocks-skeleton'
import { EventsSkeleton } from './events-skeleton'

export { spinner } from './ChatSpinner'
export { BotCard, BotMessage, SystemMessage } from './message'

const Stock = dynamic(() => import('./stock').then(mod => mod.Stock), {
  ssr: false,
  loading: () => <StockSkeleton />
})

const Purchase = dynamic(
  () => import('./stock-purchase').then(mod => mod.Purchase),
  {
    ssr: false,
    loading: () => (
      <div className="h-[375px] rounded-xl border bg-zinc-950 p-4 text-green-400 sm:h-[314px]" />
    )
  }
)

const Stocks = dynamic(() => import('./stocks').then(mod => mod.Stocks), {
  ssr: false,
  loading: () => <StocksSkeleton />
})

const Events = dynamic(() => import('./events').then(mod => mod.Events), {
  ssr: false,
  loading: () => <EventsSkeleton />
})

//  NOTE: for now
const FreePromptsMessage = dynamic(
  () => import('../free-prompts-message').then(mod => mod.FreePromptsMessage),
  {
    ssr: false,
    loading: () => <StockSkeleton />
  }
)

export { Stock, Purchase, Stocks, Events, FreePromptsMessage }
