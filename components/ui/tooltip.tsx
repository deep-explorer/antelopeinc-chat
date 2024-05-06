'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@/lib/utils'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

import * as BasicTooltip from '@radix-ui/react-tooltip'

interface PrimaryTooltipProps {
  trigger: React.ReactNode
  description: string
}

export function PrimaryTooltip({ trigger, description }: PrimaryTooltipProps) {
  return (
    <BasicTooltip.Provider>
      <BasicTooltip.Root delayDuration={200}>
        <BasicTooltip.Trigger asChild>
          {trigger}
          {/* <InfoCircledIcon className="size-[18px] opacity-20 hover:opacity-40 cursor-pointer" /> */}
        </BasicTooltip.Trigger>
        <BasicTooltip.Portal>
          <BasicTooltip.Content
            side="bottom"
            align="end"
            className="max-w-[183px] data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-primary p-[10px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] text-[10px] font-extralight"
            sideOffset={4}
            style={{
              transform: 'translateX(8px)',
              fontFamily: 'Satoshi-Variable'
            }}
          >
            {description}
            <BasicTooltip.Arrow
              className="fill-primary"
              style={{ transform: 'translateX(8px)' }}
            />
          </BasicTooltip.Content>
        </BasicTooltip.Portal>
      </BasicTooltip.Root>
    </BasicTooltip.Provider>
  )
}
