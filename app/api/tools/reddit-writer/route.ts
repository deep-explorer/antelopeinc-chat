// export const dynamic = 'force-dynamic' // defaults to auto

import { fetcher } from '@/lib/utils'
import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest, response: NextResponse) {}

export async function POST(request: NextRequest, response: NextResponse) {
  const { REDDIT_CLIENT_ID, REDDIT_SECRET, REDDIT_REDIRECT_URL } = process.env
  const { searchParams } = new URL(request.url)
  // const profileUrl = searchParams.get('profileUrl')
  const code = searchParams.get('code')
  const { post_id: postId } = await request.json()

  let token = cookies().get('session')?.value
  if (!code) {
    const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?client_id=${REDDIT_CLIENT_ID}&response_type=code&state=random_state&redirect_uri=${REDDIT_REDIRECT_URL}&duration=temperary&scope=read`
    return NextResponse.redirect(redditAuthUrl)
  } else {
    // TODO: if there is no token, get the token
    if (!token) {
      try {
        const tokenResponse = await fetch(
          'https://www.reddit.com/api/v1/access_token',
          {
            method: 'POST',
            body: urlEncode({
              grant_type: 'authorization_code',
              code,
              redirect_uri: REDDIT_REDIRECT_URL
            }),
            headers: {
              Authorization: `Basic ${Buffer.from(
                `${REDDIT_CLIENT_ID}:${REDDIT_SECRET}`
              ).toString('base64')}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
        if (tokenResponse.ok) {
          const { access_token: accessToken, refresh_token } =
            await tokenResponse.json()
          cookies().set({
            name: 'session',
            sameSite: 'strict',
            value: accessToken,
            httpOnly: true,
            path: '/',
            maxAge: undefined
          })
          token = accessToken
        }
      } catch (error) {
        return NextResponse.json(
          { error: 'Failed to get token' },
          { status: 500 }
        )
      }
    }
    //TODO: get the post and its comments
    let postAndComments = await fetchPostComments(postId, token!)
    if (postAndComments) {
      let post = postAndComments[0].data.children
      let comments = postAndComments[1].data.children
      let data = parseResponseToString(post, comments)
      return NextResponse.json({ data })
    } else {
      return NextResponse.json(
        { error: 'Failed to get post and comments' },
        { status: 500 }
      )
    }
  }
}
async function fetchPostInfo(postId: string, accessToken: string) {
  try {
    const response = await fetch(
      `https://oauth.reddit.com/api/info?id=t3_${postId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'User-Agent': 'Your User Agent' // Reddit requires a User-Agent header
        }
      }
    )

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.error('Failed to fetch post info:', response.statusText)
      return null
    }
  } catch (error) {
    console.error('Error fetching post info:', error)
    return null
  }
}
async function fetchPostComments(postId: string, accessToken: string) {
  try {
    const response = await fetch(
      `https://oauth.reddit.com/comments/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'User-Agent': 'Your User Agent' // Reddit requires a User-Agent header
        }
      }
    )

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.error('Failed to fetch post comments:', response.statusText)
      return null
    }
  } catch (error) {
    console.error('Error fetching post comments:', error)
    return null
  }
}
function getSessionData(request: NextRequest) {
  const sessionData = cookies().get('session')?.value
  return sessionData ? JSON.parse(sessionData) : null
}

function urlEncode(obj: any) {
  let urlEncodedData = ''

  for (let key in obj) {
    if (urlEncodedData.length !== 0) urlEncodedData += '&'

    urlEncodedData +=
      encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
  }

  return urlEncodedData
}

const parseResponseToString = (posts: any[], comments: any[]) => {
  let title = `Post Title : ${posts[0].data.title}`
  let tableString = ` Post Title : ${title}\n\n Post Url   : https://www.reddit.com${posts[0].data.permalink}\n\n`
  tableString += `| Comment Number |  Score |   Author Name   |  Content |\n`
  tableString += `|----------------|--------|-----------------|----------|\n`
  let flattenedComments = flattenComments(comments)
  flattenedComments.forEach((comment: any, index: number) => {
    if (!!comment.body && comment.body.length > 0) {
      tableString += `|       ${index + 1}        |  ${comment.score}  | ${comment.author}   |  ${comment.body} |\n`
    }
  })
  return {
    title,
    comments: tableString
  }
}

const flattenComments = (comments: any[]) => {
  let flattened: any = []

  const flattenHelper = (obj: any) => {
    const flattenedObj = {
      score: obj.data.score,
      body: obj.data.body?.replace(/\n|\|/g, ' '),
      downs: obj.data.downs,
      ups: obj.data.ups,
      author: obj.data.author,
      replies: obj.data.replies ? obj.data.replies.data.children.length : 0
    }
    flattened.push(flattenedObj)

    // Recursively flatten nested children arrays
    if (obj.data.replies && obj.data.replies.data.children.length > 0) {
      obj.data.replies.data.children.forEach((child: any) =>
        flattenHelper(child)
      )
    }
  }

  // Iterate through each object in inputData and flatten its children
  comments.forEach(item => flattenHelper(item))

  return flattened
}
