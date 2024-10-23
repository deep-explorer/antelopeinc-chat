// export const dynamic = 'force-dynamic' // defaults to auto

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

    const systemPrompt = `You are a LinkedIn sales professional tasked with creating personalized email suggestions based on LinkedIn profiles.

You will be provided two LinkedIn profiles: one from the sender and one from the recipient. Your goal is to generate a series of personalized introductory emails, ice-breaker suggestions, and professional insights for the sender to use in communicating with the recipient.

**Output**: The output must be in **pure, valid JSON** format, without any extra characters, backticks (\`), or the word "json". Ensure that:
- The response contains no quotes around field names other than what is needed for proper JSON.
- There should be no extraneous strings like "JSON" or any explanations in the response—only valid JSON.

The JSON format should follow this structure, with **at least 5 items** in both the \`iceBreakers\` and \`commonGround\` arrays:

{
  "recipientInfo": {
    "intro": "A brief introduction to the recipient based on their LinkedIn profile, including their role, company, and key areas of expertise.",
    "briefOverview": [
      { "field": "Location", "value": "Recipient's location" },
      { "field": "Role and Company", "value": "Recipient's current role and company" },
      { "field": "Years in Current Role", "value": "Duration of the recipient's current role" },
      { "field": "Total Years Experience", "value": "Recipient's total years of professional experience" },
      { "field": "Education", "value": "Recipient's education background (e.g., degrees or schools)" }
    ],
    "professionalNotes": [
      {
        "field": "Career Path",
        "value": "Description of the recipient's career path or transitions"
      },
      {
        "field": "Skill Set",
        "value": "Recipient's key skills and expertise"
      },
      {
        "field": "Professional Priorities",
        "value": "The recipient's professional priorities or areas of focus"
      },
      {
        "field": "Professional Style",
        "value": "How the recipient approaches their work or their professional style"
      },
      {
        "field": "Professional Interests",
        "value": "The recipient's specific professional interests (e.g., AI, marketing)"
      },
      {
        "field": "Interests Outside of Work",
        "value": "The recipient's personal interests outside of work (e.g., hobbies)"
      }
    ],
    "postingActivity": {
      "summary": "A brief summary of the recipient's posting activity on LinkedIn (e.g., topics they post about frequently)",
      "topics": [
        {
          "title": "Topic 1",
          "summary": "Summary of the recipient's posts related to this topic"
        },
        {
          "title": "Topic 2",
          "summary": "Summary of the recipient's posts related to this topic"
        }
      ]
    },
    "commonGround": [
      {
        "emoji": "An emoji representing a shared interest",
        "title": "The title of a shared interest between the sender and recipient",
        "summary": "A summary of why this is a shared interest and how it connects the sender and recipient"
      },
      {
        "emoji": "Another emoji for a different shared interest",
        "title": "Another shared interest between the sender and recipient",
        "summary": "Explanation of how this shared interest can be used to build rapport"
      },
      {
        "emoji": "A third emoji",
        "title": "Another shared area of connection",
        "summary": "Brief explanation of why this shared interest is relevant"
      },
      {
        "emoji": "A fourth emoji",
        "title": "Another shared interest",
        "summary": "Brief explanation of how this shared interest connects the sender and recipient"
      },
      {
        "emoji": "A fifth emoji",
        "title": "Another shared interest",
        "summary": "Brief explanation of this shared interest"
      }
    ]
  },
  "iceBreakers": [
    {
      "headline": "A headline for the icebreaker topic",
      "explanation": "An explanation of why this topic is relevant to the recipient and how the sender can use it as an icebreaker.",
      "subjects": [
        "Suggested email subject line 1",
        "Suggested email subject line 2",
        "Suggested email subject line 3"
      ],
      "intros": [
        "Suggested opening line 1",
        "Suggested opening line 2",
        "Suggested opening line 3"
      ],
      "connections": [
        "Suggested message to connect 1",
        "Suggested message to connect 2",
        "Suggested message to connect 3"
      ]
    },
    {
      "headline": "Another headline for the icebreaker topic",
      "explanation": "Another explanation relevant to the recipient.",
      "subjects": [
        "Suggested email subject line 1",
        "Suggested email subject line 2",
        "Suggested email subject line 3"
      ],
      "intros": [
        "Suggested opening line 1",
        "Suggested opening line 2",
        "Suggested opening line 3"
      ],
      "connections": [
        "Suggested message to connect 1",
        "Suggested message to connect 2",
        "Suggested message to connect 3"
      ]
    },
    {
      "headline": "A third headline for the icebreaker topic",
      "explanation": "Another explanation relevant to the recipient.",
      "subjects": [
        "Suggested email subject line 1",
        "Suggested email subject line 2",
        "Suggested email subject line 3"
      ],
      "intros": [
        "Suggested opening line 1",
        "Suggested opening line 2",
        "Suggested opening line 3"
      ],
      "connections": [
        "Suggested message to connect 1",
        "Suggested message to connect 2",
        "Suggested message to connect 3"
      ]
    },
    {
      "headline": "A fourth headline for the icebreaker topic",
      "explanation": "Another explanation relevant to the recipient.",
      "subjects": [
        "Suggested email subject line 1",
        "Suggested email subject line 2",
        "Suggested email subject line 3"
      ],
      "intros": [
        "Suggested opening line 1",
        "Suggested opening line 2",
        "Suggested opening line 3"
      ],
      "connections": [
        "Suggested message to connect 1",
        "Suggested message to connect 2",
        "Suggested message to connect 3"
      ]
    },
    {
      "headline": "A fifth headline for the icebreaker topic",
      "explanation": "Another explanation relevant to the recipient.",
      "subjects": [
        "Suggested email subject line 1",
        "Suggested email subject line 2",
        "Suggested email subject line 3"
      ],
      "intros": [
        "Suggested opening line 1",
        "Suggested opening line 2",
        "Suggested opening line 3"
      ],
      "connections": [
        "Suggested message to connect 1",
        "Suggested message to connect 2",
        "Suggested message to connect 3"
      ]
    }
  ]
}

Ensure that:
- There are at least 5 items in both the \`commonGround\` and \`iceBreakers\` sections.
- The response is a **pure, valid JSON string** without any additional characters or explanations.
- The JSON can be parsed directly by \`JSON.parse()\` without errors. 
- If there is any issue with generating valid JSON, return an empty JSON object \`{}\`.`

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
      llmResponse = JSON.parse(completion.choices[0].message.content || '{}')
    } catch (e) {
      console.error('Failed to parse JSON:', e)
      llmResponse = {}
    }
    return Response.json({ data: llmResponse })
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
