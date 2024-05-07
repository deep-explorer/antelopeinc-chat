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
import { useWindowSize } from 'usehooks-ts'

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
  const { width: windowWidth } = useWindowSize()

  const pathname = usePathname()
  const title = titles.find(t => t.pathname === pathname)

  const [isScrolled, setIsScrolled] = React.useState(false)
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > (windowWidth > 768 ? 350 : 220)) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`scrolled p-4 lg:px-12 flex items-center justify-between w-full bg-[#122830] overflow-hidden ease-in-out transition-all duration-1000 shadow-2xl ${isScrolled ? 'h-[48px] md:h-[80px]' : 'h-0 py-0'}`}
      >
        {isScrolled && (
          <>
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
                  width={42}
                  height={42}
                />
              </div>
              <p className="text-3xl font-semibold">{title?.title}</p>
            </div>
            <div>
              {/* <ThemeToggle /> */}
              <Button
                onClick={() => window.open(companyUrl, '_blank')}
                size={'2'}
              >
                Get in touch
              </Button>
            </div>
          </>
        )}
      </header>
      <header>
        <div className="p-4 lg:px-12 lg:py-8 flex items-center justify-between w-full bg-[#122830]  shadow-2xl">
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
              size={'2'}
            >
              Get in touch
            </Button>
          </div>
        </div>
        <div className="text-center pt-8 md:pt-[64px] px-6 flex flex-col gap-4 md:gap-6">
          <h1
            className="text-xs md:text-base text-primary font-bold"
            style={{ letterSpacing: 2 }}
          >
            ANTELOPE CHATBOT
          </h1>
          <h2 className="text-xl md:text-3xl font-bold">{title?.title}</h2>
          <p className="text-[#B9CAD0] text-sm md:text-lg">
            {title?.description}
          </p>
        </div>
      </header>
    </>
  )
}
