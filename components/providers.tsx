'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { FreeChatProvider } from '@/lib/hooks/use-free-chat'
import { Theme } from '@radix-ui/themes'
import { LeadgenContextProvider } from '@/lib/context/leadgen-context'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <Theme accentColor="tomato">
        <SidebarProvider>
          <TooltipProvider>
            <FreeChatProvider>
              <LeadgenContextProvider>{children}</LeadgenContextProvider>
            </FreeChatProvider>
          </TooltipProvider>
        </SidebarProvider>
      </Theme>
    </NextThemesProvider>
  )
}
