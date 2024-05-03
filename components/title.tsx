'use client'

import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'
import { Session } from '@/lib/types'
import { ThemeToggle } from './theme-toggle'
import Image from 'next/image'
import { companyUrl } from '@/lib/constants/config'
import { usePathname } from 'next/navigation'
import { title } from 'process'
import path from 'path'

const titles = [
  {
    pathname: '/linkedin-analyzer',
    title: 'LinkedIn Profile Analyzer',
    description:
      "Reverse engineer the strengths and weaknesses of anyone's LinkedIn content strategy"
  },
  {
    pathname: '/vitamin-analyzer',
    title: "Children's Vitamins Analysis",
    description:
      "Analysis of children's vitamins in the market to assess their benefits and shortcomings."
  }
]

export function Title() {
  const pathname = usePathname()
  const title = titles.find(t => t.pathname === pathname)

  return (
    <div className="text-center mb-8">
      <h1 className="text-primary">ANTELOPE CHATBOT</h1>
      <h2 className="text-4xl my-4 font-semibold">{title?.title}</h2>
      <p>{title?.description}</p>
    </div>
  )
}
