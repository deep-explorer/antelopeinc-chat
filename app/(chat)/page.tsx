import { nanoid } from '@/lib/utils'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '../actions'
import Link from 'next/link'
import { ENVIRONMENT } from '@/lib/constants/config'

export const metadata = {
  title: 'Antelope Chatbot'
}

export default async function IndexPage() {
  // const id = nanoid()
  // const session = (await auth()) as Session
  // const missingKeys = await getMissingKeys()

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-semibold">Select an analyzer</p>
      <Link href="/renzos" className="italic hover:underline text-primary">
        Renzos
      </Link>
      <Link
        href="/tools/linkedin-analyzer"
        className="italic hover:underline text-primary"
      >
        LinkedIn Analyzer
      </Link>
      <Link
        href="/tools/content-intelligence"
        className="italic hover:underline text-primary"
      >
        Content Intelligence
      </Link>
      <Link
        href={`https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_CLIENT_ID}&response_type=code&state=random_string&redirect_uri=${`https://chat.antelopeinc.com${process.env.REDDIT_REDIRECT_URL}`}&duration=permanent&scope=read`}
        className="italic hover:underline text-primary"
      >
        Reddit Ideator
      </Link>
    </div>
  )
}
