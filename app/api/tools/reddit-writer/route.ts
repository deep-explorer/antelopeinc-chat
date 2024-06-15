// export const dynamic = 'force-dynamic' // defaults to auto

import { fetcher } from '@/lib/utils'
import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { access } from 'fs'
export async function POST(request: NextRequest, response: NextResponse) {
  const { REDDIT_CLIENT_ID, REDDIT_SECRET, REDDIT_REDIRECT_URL } = process.env
  const { searchParams } = new URL(request.url)
  // const profileUrl = searchParams.get('profileUrl')
  const code = searchParams.get('code')
  const { post_id: postId } = await request.json()
  console.log(postId)

  let token = cookies().get('session')?.value
  console.log('tokensssssssss', token)
  if (!code) {
    const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?client_id=${REDDIT_CLIENT_ID}&response_type=code&state=random_state&redirect_uri=${REDDIT_REDIRECT_URL}&duration=permanent&scope=read`
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
            maxAge: 60 * 60 * 24
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
    // let post = await fetchPostInfo(postId, token!)
    let postAndComments = await fetchPostComments(postId, token!)
    if (postAndComments) {
      let post = postAndComments[0].data.children
      let comments = postAndComments[1].data.children
      let res = parseResponseToString(post, comments)
      return NextResponse.json({ post, comments })
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
          Authorization: `Bearer ${accessToken}`
          // 'User-Agent': 'Your User Agent' // Reddit requires a User-Agent header
        }
      }
    )

    if (response.ok) {
      const data = await response.json()
      console.log('Post info:', data)
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
      // `https://www.reddit.com/r/t5_2rk5q/comments/${postId}`,
      // `https://oauth.reddit.com/r/3Dprinting/comments/${postId}`,
      `https://oauth.reddit.com/comments/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
          // 'User-Agent': 'Your User Agent' // Reddit requires a User-Agent header
        }
      }
    )

    if (response.ok) {
      const data = await response.json()
      console.log('Post comments:', data)
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
  let tableString = `Post Title : ${posts[0].data.title}\n
       Post Url   : https://www.reddit.com${posts[0].data.permlink}\n\n`
  tableString += `| Comment Number | Author Name | Score | Down Votes | Up Votes |  Content |\n`
  tableString += `|----------------|-------------|-------|------------|----------|----------|\n`
  let flattenedComments = flattenComments(comments)
  flattenedComments.forEach((comment:any, index:number) => {
    tableString += `| ${index +1} | ${comment.author} | ${comment.score} | ${comment.downs} | ${comment.ups} | ${comment.replies} | ${comment.body} |\n`
  })
  console.log(tableString)
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
      obj.data.replies.data.children.forEach((child:any) => flattenHelper(child))
    }
  }

  // Iterate through each object in inputData and flatten its children
  comments.forEach(item => flattenHelper(item))

  return flattened
}
// const parseResponseToString = (posts: any[]) => {
//   let tableString = `LinkedIn poster url: ${posts[0].poster_linkedin_url}\n\n`
//   tableString += `| Post Number | Text | URL | Appreciations | Comments | Empathy | Interests | Likes | Praises | Reposts | Posted Date | Reshared |\n`
//   tableString += `|-------------|------|-----|---------------|----------|---------|-----------|-------|---------|---------|-------------|----------|\n`

//   // Iterate over each post and add a row to the table string
//   posts.forEach((post, index) => {
//     const resharedText = post.reshared ? 'Yes' : 'No'
//     const textSnippet = post.text?.replace(/\n|\|/g, ' ') // Replace newlines with spaces
//     tableString += `| ${index + 1} | ${textSnippet} | ${post.post_url} | ${post.num_appreciations} | ${post.num_comments} | ${post.num_empathy} | ${post.num_interests} | ${post.num_likes} | ${post.num_praises} | ${post.num_reposts} | ${post.posted} | ${resharedText} |\n`
//   })

//   return tableString
// }

// console.log(process.env.RAPID_API_KEY!)
// try {
//   console.log('ssssss')
//   const accessToken = await fetcher(
//     'https://reddit-scraper2.p.rapidapi.com/reddit_0_token',
//     {
//       headers: {
//         'X-RapidAPI-Key': process.env.RAPID_API_KEY!
//       },
//       method: 'GET'
//     }
//   )
//   if (accessToken) {
//     const body = { ...(await request.json()), ...accessToken }
//     const postInfo = await fetcher(
//       'https://reddit-scraper2.p.rapidapi.com/reddit_3_post_info',
//       {
//         headers: {
//           'X-RapidAPI-Key': process.env.RAPID_API_KEY!
//         },
//         method: 'POST',
//         body: JSON.stringify(body)
//       }
//     )
//     const commentsFromPost = await fetcher(
//       'https://reddit-scraper2.p.rapidapi.com/reddit_4_comment_from_post',
//       {
//         headers: {
//           'X-RapidAPI-Key': process.env.RAPID_API_KEY!
//         },
//         method: 'POST',
//         body: JSON.stringify(body)
//       }
//     )

//     let data = `
//       Comments are below:
//       Message
//       ${postInfo.title}
//       ${postInfo.url}
//       ------------------- \n`
//     commentsFromPost.comments.forEach((comment: any) => {
//       data += `${comment?.content} `
//     })

//     if (postInfo) {
//       return Response.json({ data })
//     } else {
//       return NextResponse.json(
//         {
//           error:
//             'This user has not made any posts. Please try a user who actively posts on LinkedIn.'
//         },
//         { status: 404 }
//       )
//     }
//   } else {
//     return NextResponse.json(
//       {
//         error: 'You are not authorized!'
//       },
//       { status: 404 }
//     )
//   }
// } catch (error) {
//   console.log(error)
//   return NextResponse.json(
//     {
//       error:
//         "Can't find profiles that meet the criteria. Please try another handle. If the problem persists, email us at contact@antelopeinc.com."
//     },
//     { status: 400 }
//   )
// }
// const content = (await file.text()).replace(/[\r\n]/g, ' ')
