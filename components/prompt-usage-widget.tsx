import { Message } from '@/lib/chat/actions'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useAIState } from 'ai/rsc'
import { encode, encodeChat } from 'gpt-tokenizer'
import { useEffect, useMemo, useState } from 'react'

export interface PromptUsageWidgetProps {}

const costPerInputToken = 0.00001
const costPerOutputToken = 0.00003

export function PromptUsageWidget({}: PromptUsageWidgetProps) {
  const [aiState] = useAIState()
  const [totalCost, setTotalCost] = useState(0)

  const lastPromptCost = useMemo(() => {
    if (aiState.messages.length > 0) {
      const lastInputTokens = encodeChat(
        [
          systemMessage,
          ...aiState.messages.filter(
            (message: Message) => message.role === 'user'
          )
        ],
        'gpt-4-32k-0314'
      )
      const lastOutputTokens = encodeChat(
        [aiState.messages[aiState.messages.length - 1]],
        'gpt-4-32k-0314'
      )

      return (
        lastInputTokens.length * costPerInputToken +
        lastOutputTokens.length * costPerOutputToken
      )
    } else {
      return 0
    }
  }, [aiState.messages])

  useEffect(() => {
    setTotalCost(prev => prev + lastPromptCost)
  }, [lastPromptCost])

  return (
    <div className="relative mx-auto px-4">
      <div className="group relative mb-4 flex items-start md:-ml-12">
        <div className="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border shadow-sm">
          <ExclamationTriangleIcon />
        </div>
        <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
          <p className="text-muted-foreground leading-normal">
            Last prompt cost = <i>{lastPromptCost.toFixed(2)} USD</i>. Total
            cost = <i>{totalCost.toFixed(2)} USD</i>.
          </p>
        </div>
      </div>
    </div>
  )
}

export const systemMessage = {
  role: 'system',
  content: `You are a social media analyst who specializes in LinkedIn marketing. You are able to analyze data from posts to identify best practices from leading influencers.

I have included data containing LinkedIn post data from an influencer. You will analyze the influencer's content tactics and their success based on the engagement data (comments, likes and reposts). Break down each tactic one by one into the following sections:

Section A: Overall Summary
-Provide an intro to the influencer and an overall summary of the influencer's LinkedIn strategy. Do this in 2-3 sentences focusing on what they post about and how they leverage the platform.

Section B: What's Working
-Provide two bullet point lists. The first including what has worked for them. The second what has been less effective. Use the engagement data (e.g.: likes, comments) in the dataset to determine this. For all examples, provide a short description of the tactic and then a hyperlinked example to a specific LinkedIn post that illustrates what has worked and what has note. Give put this in brackets with a short description, and link to the post. Ensure you give at least 1 and no more than 5 examples for each list. Avoid generic takeaways focusing on specific examples that apply to this influencer's niche.

Section C: Writing Style

-Give a quick two sentence overview of his writing style, citing some examples on how they use key LinkedIn tactics (e.g.: introductory hooks, writing length, style. Avoid generic takeaways here focusing on specific things you can learn from this influencer.

Section D: Posting Frequency
-A quick sentence noting how often he posts. Use the date detail to determine this (e.g.: 3x weekly, 1x monthly etc)

Section E: Tactic Overview

-Create a table with the following columns. Sorting the tactics with the ones that have the higheset engagement first
1. Content Tactic: Identify the main types of content the influencer posts.
2. Volume: Identify how often the influencers uses this tactic (very low, low, medium, high, very high)
3. Engagement: Evaluate the success of each content tactic (very low, low, medium, high, very high) based on engagement metrics like likes, comments, shares, etc.
4. Explanation: Provide a brief explanation of why each content tactic is successful or not.
5. Example Posts: For each content tactic, provide 3 example post URLs and a brief summary of the post in no more than 8 words. Separate these by a numbered list but keep within the same cell. Avoid HTML formatting here (e.g. <br>).

More instructions:
-Please bolden all headers
-Bolden all links so its obvious they are hyperlinked.
-List each tactic one by one
-There is no reason to write the word section (e.g.: "Section A: Overall Summary") in your headlines, you can just use the title (e.g.: Overall Summary)
-Use succinct language, ensuring all salient poitns are made but focusing on the most important ideas
-In the "Example Posts" section, include the post URL and a brief summary of the post. You can hyperlink the summary to the URL. There is no need to list the URL as well.
-Ensure you review all posts included, and do not ignore any
-No yapping! Take a deep breath and ensure you do this to the best of your ability, it is very important! You will get a tip if you get it right.`
}
