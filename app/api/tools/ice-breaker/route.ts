// export const dynamic = 'force-dynamic' // defaults to auto

import { fetcher } from '@/lib/utils'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

//  GET Linkedin Profile Posts using RapidAPI
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const senderLink = searchParams.get('senderLink')
  const receipientLink = searchParams.get('receipientLink')
  if (!senderLink || !receipientLink) {
    return NextResponse.json(
      {
        error: 'Please provide valid linkedin profile links.'
      },
      { status: 400 }
    )
  }

  const headers = {
    'x-rapidapi-host': 'fresh-linkedin-profile-data.p.rapidapi.com',
    'x-rapidapi-key': '0e54669d4amsh1b1d0682667674cp1bc298jsn8e8018621b9f' // Updated API key
  }

  const profileEndpoint =
    'https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile'
  const postsEndpoint =
    'https://fresh-linkedin-profile-data.p.rapidapi.com/get-profile-posts'

  const options = {
    method: 'get',
    headers: headers
  }

  try {
    const [
      profileDataSender,
      postsDataSender,
      profileDataRecipient,
      postsDataRecipient
    ] = await Promise.all([
      fetchProfileData(profileEndpoint, senderLink, options),
      fetchPostsData(postsEndpoint, senderLink, options),
      fetchProfileData(profileEndpoint, receipientLink, options),
      fetchPostsData(postsEndpoint, receipientLink, options)
    ])

    const systemPrompt = `
      You are a LinkedIn sales professional tasked with writing introductory emails based on LinkedIn profiles.

      You will be provided with two LinkedIn profiles: one from the sender and one from the recipient. Your goal is to analyze their interests, skills, and context to generate a series of personalized email introduction suggestions.

      **Output**: Only return a valid JSON array of objects, where each object follows this exact structure:

      [
        {
          "emoji": "🚀",
          "title": "AI's Role in Personal Growth",
          "explanation": "Jordan's reflections on personal growth align with Daniel's work using AI to optimize performance and insights. Mention how Antelope's analytics help organizations measure the effectiveness of personal development programs. You can reference Jordan's post on how 'interruptions are where growth happens' as a segue.",
          "subjects": [
            "Where Data Meets Personal Growth: Let's Chat",
            "Do AI and Self-Discovery Go Hand in Hand?",
            "Loved your post on growth—here's a related idea"
          ],
          "intros": [
            "I came across your post on how interruptions drive growth—it really resonated.",
            "Our work in data-driven insights might align with the personal development journeys you coach.",
            "Seeing your post about 'being enough' got me thinking about how AI can help track progress."
          ],
          "connections": [
            "Hi Jordan, I really enjoyed your recent post on personal growth. It aligns with some of the work we do at Antelope. Would love to connect and discuss.",
            "Hi Jordan, your journey from law to coaching is inspiring. I'd enjoy exchanging insights on how AI and personal development can intersect.",
            "Jordan, I've followed your work on mentorship and purpose for a while—excited to connect and explore synergies."
          ]
        },
        {
          "emoji": "🎓",
          "title": "University of Western Ontario Alumni Connection",
          "explanation": "Both attended the same university, providing an opportunity to reminisce. Reference how alumni often cross paths unexpectedly in consulting and leadership spaces.",
          "subjects": [
            "Western U Alumni Exploring New Frontiers",
            "Alumni Network Meets Innovation—A Catch-up?",
            "From Western to Coaching and Analytics—Small World!"
          ],
          "intros": [
            "Always great to see fellow Western alums doing amazing things!",
            "Your transition from law to coaching reminds me of the entrepreneurial shifts happening in our alumni network.",
            "We might have crossed paths in some Western events—would love to connect and share experiences."
          ],
          "connections": [
            "Jordan, as a fellow Western alum, I'd love to connect and explore mutual interests.",
            "I noticed we both went to Western—excited to connect and discuss some common experiences.",
            "Hi Jordan, I believe our time at Western overlapped—looking forward to exchanging insights."
          ]
        }
      ]

      Ensure the response is **only** a JSON array containing multiple objects if applicable, following this structure. Do not include any extra comments or text outside the JSON. If you cannot generate a valid JSON array, return an empty array \`[]\`.`

    const userPrompt =
      convertProfileDataToString(profileDataSender, 'Sender') +
      '\n\n' +
      convertPostsDataToString(postsDataSender) +
      '\n\n' +
      convertProfileDataToString(profileDataRecipient, 'Recipient') +
      '\n\n' +
      convertPostsDataToString(postsDataRecipient)

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: userPrompt
        }
      ]
    })

    console.log(completion.choices[0].message.content)
    let llmResponse
    try {
      llmResponse = JSON.parse(completion.choices[0].message.content || '[]')
    } catch (e) {
      console.error('Failed to parse JSON:', e)
      llmResponse = []
    }
    return Response.json({ data: llmResponse })
    // const response = await fetcher(
    //   `https://fresh-linkedin-profile-data.p.rapidapi.com/get-profile-posts?linkedin_url=${profileUrl}&type=posts`,
    //   {
    //     headers: {
    //       'X-RapidAPI-Key': process.env.RAPID_API_KEY!
    //     }
    //   }
    // )
    // if (response.data.length > 0) {
    //   return Response.json({ data: parseResponseToString(response.data) })
    // } else {
    //   return NextResponse.json(
    //     {
    //       error:
    //         'This user has not made any posts. Please try a user who actively posts on LinkedIn.'
    //     },
    //     { status: 404 }
    //   )
    // }
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        error:
          "Can't find profiles that meet the criteria. Please try another handle. If the problem persists, email us at contact@antelopeinc.com."
      },
      { status: 400 }
    )
  }
}

async function fetchProfileData(
  endpoint: string,
  linkedinUrl: string,
  options?: any
) {
  const url = `${endpoint}?linkedin_url=${encodeURIComponent(linkedinUrl)}&include_skills=false&include_certifications=false&include_publications=false&include_honors=false&include_volunteers=false&include_projects=false&include_patents=false&include_courses=false&include_organizations=false&include_profile_status=false&include_company_public_url=false`
  const response = await fetch(url, options)
  return await response.json()
}

async function fetchPostsData(
  endpoint: string,
  linkedinUrl: string,
  options?: any
) {
  const url = `${endpoint}?linkedin_url=${encodeURIComponent(linkedinUrl)}&type=posts`
  const response = await fetch(url, options)
  return await response.json()
}

function convertProfileDataToString(profileData: any, personTitle: string) {
  const data = profileData.data
  let result = `${personTitle} LinkedIn Profile\n`

  if (data.full_name) result += `Full Name: ${data.full_name}\n`
  if (data.headline) result += `Headline: ${data.headline}\n`
  if (data.about) result += `About: ${data.about}\n`
  if (data.location) result += `Location: ${data.location}\n`
  if (data.country) result += `Country: ${data.country}\n`
  if (data.company) result += `Company: ${data.company}\n`
  if (data.job_title) result += `Job Title: ${data.job_title}\n`
  if (data.connection_count)
    result += `Connection Count: ${data.connection_count}\n`
  if (data.follower_count) result += `Follower Count: ${data.follower_count}\n`
  if (data.linkedin_url) result += `LinkedIn URL: ${data.linkedin_url}\n`
  if (data.profile_image_url)
    result += `Profile Image URL: ${data.profile_image_url}\n`

  if (data.educations && data.educations.length > 0) {
    result += `Education:\n`
    data.educations.forEach((education: any) => {
      if (education.school) result += `  School: ${education.school}\n`
      if (education.degree) result += `  Degree: ${education.degree}\n`
      if (education.field_of_study)
        result += `  Field of Study: ${education.field_of_study}\n`
      if (education.date_range)
        result += `  Date Range: ${education.date_range}\n`
    })
  }

  if (data.experiences && data.experiences.length > 0) {
    result += `Experience:\n`
    data.experiences.forEach((experience: any) => {
      if (experience.company) result += `  Company: ${experience.company}\n`
      if (experience.title) result += `  Title: ${experience.title}\n`
      if (experience.date_range)
        result += `  Date Range: ${experience.date_range}\n`
      if (experience.description)
        result += `  Description: ${experience.description}\n`
    })
  }

  return result
}
function convertPostsDataToString(postsData: any) {
  // Initialize the result string with headers
  let result = 'Post Text | Total Engagements | Posted Date | Post URL\n'

  // Extract the posts and build the result string
  const posts = postsData.data
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    const engagements =
      (post.num_appreciations || 0) +
      (post.num_comments || 0) +
      (post.num_empathy || 0) +
      (post.num_interests || 0) +
      (post.num_likes || 0) +
      (post.num_reposts || 0)

    // Append post data to the result string
    const postText = post.text || 'No content available'
    const postTime = post.time || ''
    const postUrl = post.post_url || ''

    result += `${postText} | ${engagements} | ${postTime} | ${postUrl}\n`
  }

  return result
}

const parseResponseToString = (posts: any[]) => {
  let tableString = `LinkedIn poster url: ${posts[0].poster_linkedin_url}\n\n`
  tableString += `| Post Number | Text | URL | Appreciations | Comments | Empathy | Interests | Likes | Praises | Reposts | Posted Date | Reshared |\n`
  tableString += `|-------------|------|-----|---------------|----------|---------|-----------|-------|---------|---------|-------------|----------|\n`

  // Iterate over each post and add a row to the table string
  posts.forEach((post, index) => {
    const resharedText = post.reshared ? 'Yes' : 'No'
    const textSnippet = post.text?.replace(/\n|\|/g, ' ') // Replace newlines with spaces
    tableString += `| ${index + 1} | ${textSnippet} | ${post.post_url} | ${post.num_appreciations} | ${post.num_comments} | ${post.num_empathy} | ${post.num_interests} | ${post.num_likes} | ${post.num_praises} | ${post.num_reposts} | ${post.posted} | ${resharedText} |\n`
  })
  return tableString
}
