'use client'
import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { Button } from '@radix-ui/themes'
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

/* 
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
      <div className="flex items-center">
        <IconSeparator className="size-6 text-muted-foreground/50" />
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </>
  )
}
*/

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

export function Header() {
  const pathname = usePathname()
  const title = titles.find(t => t.pathname === pathname)

  const [isScrolled, setIsScrolled] = React.useState(false)
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`navbar ${isScrolled ? 'scrolled h-[80px] md:h-[120px]' : 'h-[320px] md:h-[500px]'} bg-[#ebf5f8] dark:bg-[#122830] overflow-hidden`}
    >
      {isScrolled ? (
        <div className="p-6 lg:px-20 lg:py-8 flex items-center justify-between w-full ">
          <div className="flex items-center">
            <Link href={companyUrl} rel="nofollow" className="flex gap-2">
              <Image
                src={`/header-logo.png`}
                alt="logo"
                width={32}
                height={32}
              />
              <h2 className="text-xl">Antelope</h2>
            </Link>
          </div>
          <div className="hidden lg:flex gap-2 items-center">
            <div>
              <Image
                src={`/vitamin/logos/renzo.png`}
                alt="renzologo"
                width={56}
                height={56}
              />
            </div>
            <p className="text-3xl font-semibold">{title?.title}</p>
          </div>
          <div>
            {/* <ThemeToggle /> */}
            <Button
              onClick={() => window.open(companyUrl, '_blank')}
              size={'3'}
            >
              Get in touch
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-6 lg:px-20 lg:py-12 flex items-center justify-between w-full ">
            <div className="flex items-center">
              <Link href={companyUrl} rel="nofollow" className="flex gap-2">
                <Image
                  src={`/header-logo.png`}
                  alt="logo"
                  width={32}
                  height={32}
                />
                <h2 className="text-xl">Antelope</h2>
              </Link>
            </div>
            <div className="hidden lg:flex items-center justify-end space-x-2 gap-12 text-lg">
              <Link href={`${companyUrl}/#banner`}>Home</Link>
              <Link href={`${companyUrl}/#benefits`}>What We Do</Link>
              <Link href={`${companyUrl}/case-study`}>Our Reports</Link>
              <Link href={`${companyUrl}/#process`}>Process</Link>
              <Link href={`${companyUrl}/blog/`}>Blog</Link>
            </div>
            <div>
              {/* <ThemeToggle /> */}
              <Button
                onClick={() => window.open(companyUrl, '_blank')}
                size={'3'}
              >
                Get in touch
              </Button>
            </div>
          </div>
          <div className="text-center pb-12 pt-12 md:pt-[100px] px-6 flex flex-col gap-4 md:gap-6">
            <h1
              className="text-xs md:text-base text-primary font-bold"
              style={{ letterSpacing: 2 }}
            >
              ANTELOPE CHATBOT
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold">{title?.title}</h2>
            <p className="text-[#B9CAD0] text-sm md:text-lg">
              {title?.description}
            </p>
          </div>
        </>
      )}
    </header>
  )
}
