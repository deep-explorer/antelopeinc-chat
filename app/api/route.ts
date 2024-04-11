// export const dynamic = 'force-dynamic' // defaults to auto

import { fetcher } from '@/lib/utils'

export async function POST(request: Request) {
  const form = await request.formData()
  const file = form.get('file') as File

  const content = await file.text()
  try {
    const json = JSON.parse(content)
    return Response.json({
      content:
        `poster_linkedin_url: ${json.data[0].poster_linkedin_url} \n` +
        json.data.map((item: any) => item.post_url).join('\n')
    })
  } catch (e) {
    return Response.json({ content })
  }
  // const content = (await file.text()).replace(/[\r\n]/g, ' ')
}

//  GET Linkedin Profile Posts using RapidAPI
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const profileUrl = searchParams.get('profileUrl')

  try {
    const response = await fetcher(
      `https://fresh-linkedin-profile-data.p.rapidapi.com/get-profile-posts?linkedin_url=${profileUrl}&type=posts`,
      {
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY!
        }
      }
    )
    return Response.json({ data: response.data })
  } catch (error) {
    console.error(error)
    return new Response('An error occurred', { status: 500 })
  }
}
