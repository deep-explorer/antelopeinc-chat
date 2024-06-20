import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { InitialMessage } from '@/components/vitamin/initial-message'
import type { Metadata, ResolvingMetadata } from 'next'
import { getMetadata } from '@/app/shared-metadata'
import { redirect } from 'next/navigation'

type Props = {
  params: { brand: string }
  searchParams: { [key: string]: string | string[] | undefined }
}


export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { brand } = params
  const metadata = await getMetadata(brand)
  if (!metadata) {
    redirect('http://antelopeinc.com/')
  }
  return {
    title: metadata.preview.title,
    openGraph: {
      title: metadata.preview.title,
      description: metadata.preview.description,
      siteName: "chat.antelopeinc.com",
      images: [
        {
          url: metadata.preview.image,
          width: 1200,
          height: 630
        }
      ],
      locale: 'en_US',
      type: 'website'
    }
  }
}

export default async function IndexPage({ params }: Props) {
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  return (
    <>
      <AI initialAIState={{ chatId: 'leadgen', messages: [] }}>
        <Chat
          initialScreen={<InitialMessage />}
          id={'leadgen'}
          session={session}
          missingKeys={missingKeys}
        />
      </AI>
    </>
  )
}
