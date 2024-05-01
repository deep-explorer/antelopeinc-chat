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

async function UserOrLogin() {
  const session = (await auth()) as Session

  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href={companyUrl} rel="nofollow" className="flex gap-2">
          <Image src={`/header-logo.png`} alt="logo" width={32} height={32} />
          <h2 className="text-xl">Antelope</h2>
        </Link>
      )}
      {/* <div className="flex items-center">
        <IconSeparator className="size-6 text-muted-foreground/50" />
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div> */}
    </>
  )
}

export function Header() {
  return (
    <header className="flex items-center justify-between w-full md:h-[57px]">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      <div className="hidden lg:flex items-center justify-end space-x-2 gap-4">
        <Link href={`${companyUrl}/#banner`}>Home</Link>
        <Link href={`${companyUrl}/#benefits`}>What We Do</Link>
        <Link href={`${companyUrl}/case-study`}>Our Reports</Link>
        <Link href={`${companyUrl}/#process`}>Process</Link>
        <Link href={`${companyUrl}/blog/`}>Blog</Link>

        <Link href="/linkedin-analyzer" className="text-green-500">
          --- LinkedIn ---
        </Link>
        <Link href="/vitamin-analyzer" className="text-green-500">
          --- Vitamin ---
        </Link>
      </div>
      <div>
        <ThemeToggle />
        <Button variant="default">Get in touch</Button>
      </div>
    </header>
  )
}
