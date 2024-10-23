import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const example = {
  recipientInfo: {
    intro:
      'Daniel Dippold is a seasoned technology executive with a passion for AI and data-driven marketing strategies. As the VP of Technology at Antelope, he brings a wealth of experience in leveraging cutting-edge technologies to drive business growth and innovation.',
    briefOverview: [
      { field: 'Location', value: 'San Francisco Bay Area' },
      { field: 'Role and Company', value: 'VP of Technology at Antelope' },
      { field: 'Years in Current Role', value: '2 years' },
      { field: 'Total Years Experience', value: '15+ years' },
      {
        field: 'Education',
        value: 'MBA from Stanford Graduate School of Business'
      }
    ],
    professionalNotes: [
      {
        field: 'Career Path',
        value:
          'Transitioned from consulting to technology leadership, focusing on AI and data analytics'
      },
      {
        field: 'Skill Set',
        value:
          'AI/ML, data analytics, strategic planning, team leadership, product development'
      },
      {
        field: 'Professional Priorities',
        value:
          'Driving innovation, optimizing marketing strategies through AI, fostering team growth'
      },
      {
        field: 'Professional Style',
        value: 'Analytical, forward-thinking, collaborative'
      },
      {
        field: 'Professional Interests',
        value:
          'AI in marketing, data-driven decision making, emerging technologies'
      },
      {
        field: 'Interests Outside of Work',
        value: 'Hiking, photography, attending tech conferences'
      }
    ],
    postingActivity: {
      summary:
        'Daniel posts regularly, sharing insights on AI applications in marketing, data analytics trends, and leadership in tech.',
      topics: [
        {
          title: 'AI in Marketing',
          summary:
            'Explores how AI is revolutionizing marketing strategies and customer engagement'
        },
        {
          title: 'Data Analytics Trends',
          summary:
            'Discusses latest developments in data analytics and their impact on business decisions'
        },
        {
          title: 'Tech Leadership',
          summary:
            'Shares thoughts on effective leadership in fast-paced tech environments'
        },
        {
          title: 'Industry News',
          summary:
            'Comments on significant developments in the tech and AI sectors'
        },
        {
          title: 'Team Culture',
          summary:
            'Highlights the importance of fostering a positive and innovative team culture'
        }
      ]
    },
    commonGround: [
      {
        emoji: '🤖',
        title: 'AI Enthusiasts',
        summary:
          'Both have a deep interest in AI applications, particularly in marketing and business strategy.'
      },
      {
        emoji: '🎓',
        title: 'MBA Background',
        summary:
          'Shared educational experience with MBAs from top business schools.'
      },
      {
        emoji: '📊',
        title: 'Data-Driven Approach',
        summary:
          'Both prioritize using data analytics to inform decision-making and strategy.'
      },
      {
        emoji: '💼',
        title: 'Leadership in Tech',
        summary:
          'Experience in leading teams and driving innovation in technology companies.'
      },
      {
        emoji: '🌉',
        title: 'San Francisco Connection',
        summary:
          'Both based in the San Francisco Bay Area, likely familiar with the local tech scene.'
      }
    ]
  },
  iceBreakers: [
    {
      headline: 'AI-Driven Marketing Insights',
      explanation:
        "Daniel's recent posts about AI applications in marketing align perfectly with Chris's expertise at Antelope. Chris can reference a specific post where Daniel discussed the impact of generative AI on content creation, and share how Antelope is implementing similar strategies to enhance marketing efforts.",
      subjects: [
        'Revolutionizing Marketing with AI: Your Thoughts?',
        "Can AI Predict Customer Behavior? Let's Discuss",
        "Your AI Marketing Insights Resonated - Here's Why"
      ],
      intros: [
        "Your recent post on AI-driven content creation caught my attention - I'd love to share how we're applying similar concepts at Antelope.",
        'I was intrigued by your thoughts on predictive analytics in marketing - have you considered its application in [specific area]?',
        "Your insights on AI in marketing align closely with a project we're working on at Antelope - I'd value your perspective."
      ],
      connections: [
        "Hi Daniel, I'm Chris from Antelope. Your recent post on AI in marketing resonated with me, especially your points on predictive analytics. I'd love to connect and share some of our experiences implementing AI in our marketing strategies.",
        "Daniel, your insights on AI-driven content creation are spot-on. At Antelope, we're working on similar initiatives. I'd be keen to connect and exchange ideas on how we can push the boundaries of AI in marketing further.",
        "Hello Daniel, I've been following your thoughts on AI in marketing with great interest. As the VP of Technology at Antelope, I'm always looking to connect with fellow innovators. Would love to discuss how we're leveraging AI to transform marketing strategies."
      ]
    },
    {
      headline: 'Optimizing Data Strategies',
      explanation:
        "Chris can leverage Daniel's recent posts about data analytics trends to initiate a conversation. For instance, if Daniel shared insights about real-time analytics, Chris could discuss how Antelope is implementing similar strategies and seek Daniel's opinion on potential improvements.",
      subjects: [
        'Your Data Analytics Insights: A Game-Changer',
        "Real-time Analytics: What's Your Take?",
        'Enhancing Our Data Strategy - Your Expertise Needed'
      ],
      intros: [
        'Your recent article on real-time analytics got me thinking about how we can improve our strategies at Antelope.',
        "I've been following your data analytics insights, and I'm curious about your thoughts on [specific trend].",
        "Your expertise in data-driven decision making is impressive - I'd love to get your perspective on a challenge we're facing."
      ],
      connections: [
        "Hi Daniel, Chris from Antelope here. Your recent post on real-time analytics was enlightening. We're implementing similar strategies, and I'd love to connect and discuss how you've overcome some of the challenges we're facing.",
        "Daniel, your insights on data-driven decision making are invaluable. As we're scaling our data analytics at Antelope, I'd appreciate the opportunity to connect and perhaps get your thoughts on some of our approaches.",
        "Hello Daniel, I've been an avid reader of your posts on data analytics trends. As the VP of Technology at Antelope, I'm always looking to refine our data strategies. Would love to connect and exchange ideas on the future of data in tech."
      ]
    },
    {
      headline: 'Innovating Team Cultures',
      explanation:
        "Daniel has shared thoughts on fostering innovative team cultures in tech. Chris can reference a specific post where Daniel discussed strategies for encouraging creativity in tech teams, and share how Antelope is working on similar initiatives, seeking Daniel's input on best practices.",
      subjects: [
        'Building Innovative Tech Teams: Your Approach?',
        'Fostering Creativity: Lessons from Antelope',
        'Your Team Culture Insights: A Discussion Starter'
      ],
      intros: [
        "Your post on fostering creativity in tech teams resonated with me - I'd love to share how we're tackling this at Antelope.",
        'I was inspired by your approach to team culture - have you found any unexpected challenges in implementing your strategies?',
        "Your insights on tech leadership are refreshing - I'm curious about your thoughts on [specific leadership challenge]."
      ],
      connections: [
        "Hi Daniel, Chris from Antelope here. Your recent post on fostering innovation in tech teams caught my eye. We're working on similar initiatives, and I'd love to connect and exchange ideas on creating a truly innovative team culture.",
        "Daniel, your thoughts on tech leadership are inspiring. As we're growing our team at Antelope, I'd value the opportunity to connect and perhaps get your insights on maintaining innovation as we scale.",
        "Hello Daniel, I've been following your posts on tech leadership with great interest. As the VP of Technology at Antelope, I'm always looking for new ways to inspire and lead our team. Would love to connect and share experiences."
      ]
    },
    {
      headline: 'Next-Gen Tech Applications',
      explanation:
        "Both Chris and Daniel have shown interest in emerging technologies. Chris can reference a specific post where Daniel discussed a cutting-edge technology (e.g., quantum computing in marketing), and share Antelope's perspective or ongoing projects in that area, inviting a deeper discussion.",
      subjects: [
        'Quantum Computing in Marketing: Your Thoughts?',
        "Exploring [Specific Tech]: Antelope's Approach",
        "Your Emerging Tech Insights: Let's Dive Deeper"
      ],
      intros: [
        "Your post on quantum computing applications in marketing was fascinating - I'd love to share our perspective at Antelope.",
        "I've been following your insights on emerging technologies - have you considered their potential impact on [specific industry]?",
        "Your expertise in cutting-edge tech is evident - I'm curious about your thoughts on [specific emerging technology]."
      ],
      connections: [
        "Hi Daniel, Chris from Antelope here. Your recent exploration of quantum computing in marketing was intriguing. We're looking into similar advanced technologies, and I'd love to connect and discuss the potential implications for our industry.",
        "Daniel, your insights into emerging technologies are always thought-provoking. At Antelope, we're exploring some of these areas too. I'd be keen to connect and exchange ideas on how these technologies might shape the future of marketing and tech.",
        "Hello Daniel, I've been fascinated by your posts on emerging technologies. As the VP of Technology at Antelope, I'm always looking to stay ahead of the curve. Would love to connect and discuss how we can leverage these innovations in our respective fields."
      ]
    },
    {
      headline: 'SF Tech Ecosystem',
      explanation:
        'Both Chris and Daniel are based in the San Francisco Bay Area. Chris can reference a local tech event or trend that Daniel has posted about, and suggest meeting up to discuss the local tech ecosystem and its impact on their respective roles and companies.',
      subjects: [
        'SF Tech Scene: Your Perspective Needed',
        "Local Innovation: Antelope's Take",
        'Your Bay Area Insights: Coffee and Chat?'
      ],
      intros: [
        "Your recent post about the [specific SF tech event] got me thinking about our local tech ecosystem - I'd love to discuss further.",
        "As fellow Bay Area tech leaders, I'm curious about your thoughts on [specific local tech trend].",
        "I noticed we're both based in SF - would you be open to grabbing coffee and chatting about the local tech scene?"
      ],
      connections: [
        "Hi Daniel, Chris from Antelope here. I noticed we're both based in the Bay Area and share a passion for the local tech scene. Your recent post about [specific local event/trend] was spot-on. I'd love to connect and perhaps meet up to discuss how we can leverage our local ecosystem for innovation.",
        "Daniel, as fellow SF tech leaders, I think we could have some fascinating discussions about our local innovation landscape. I'd be keen to connect and maybe grab coffee sometime to chat about how the Bay Area tech scene is influencing our work at Antelope and beyond.",
        "Hello Daniel, I've been following your insights on the SF tech scene with great interest. As the VP of Technology at Antelope, I'm always looking to collaborate with local innovators. Would love to connect and exchange thoughts on how we can contribute to and benefit from our unique tech ecosystem."
      ]
    }
  ]
}

export default function IceBreaker({ data }: { data: typeof example }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % (data.iceBreakers.length + 5))
  }

  const prevSlide = () => {
    setCurrentSlide(
      prev =>
        (prev - 1 + data.iceBreakers.length + 5) % (data.iceBreakers.length + 5)
    )
  }

  const renderTable = (data: any) => (
    <Table>
      <TableBody>
        {data.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.field}</TableCell>
            <TableCell>{item.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const renderSlideContent = (index: number) => {
    if (index === 0) {
      return (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white text-center">Intro</h3>
          <p className="text-white">{data.recipientInfo.intro}</p>
        </div>
      )
    } else if (index === 1) {
      return (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white text-center">
            Brief Overview
          </h3>
          {renderTable(data.recipientInfo.briefOverview)}
        </div>
      )
    } else if (index === 2) {
      return (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white text-center">
            Professional Notes
          </h3>
          {renderTable(data.recipientInfo.professionalNotes)}
        </div>
      )
    } else if (index === 3) {
      return (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white text-center">
            Posting Activity
          </h3>
          <p className="text-white">
            {data.recipientInfo.postingActivity.summary}
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Topic</TableHead>
                <TableHead>Summary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recipientInfo.postingActivity.topics.map((topic, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{topic.title}</TableCell>
                  <TableCell>{topic.summary}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    } else if (index === 4) {
      return (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white text-center">
            Common Ground
          </h3>
          <ul className="list-none space-y-2">
            {data.recipientInfo.commonGround.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2 text-2xl">{item.emoji}</span>
                <div>
                  <h4 className="font-bold text-white">{item.title}</h4>
                  <p className="text-white">{item.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    } else {
      const iceBreaker = data.iceBreakers[index - 5]
      return (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white text-center">
            {iceBreaker.headline}
          </h3>
          <div>
            <h4 className="font-semibold mb-2 text-[#E85A4F]">Explanation:</h4>
            <p className="text-white">{iceBreaker.explanation}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-[#E85A4F]">
              Email Subject Lines:
            </h4>
            <ul className="list-disc pl-5 text-white">
              {iceBreaker.subjects.map((subject, i) => (
                <li key={i}>{subject}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-[#E85A4F]">
              Email Intro Sentences:
            </h4>
            <ul className="list-disc pl-5 text-white">
              {iceBreaker.intros.map((intro, i) => (
                <li key={i}>{intro}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-[#E85A4F]">
              LinkedIn Connection Messages:
            </h4>
            <ul className="list-disc pl-5 text-white">
              {iceBreaker.connections.map((connection, i) => (
                <li key={i}>{connection}</li>
              ))}
            </ul>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        Ice Breaker
      </h2>
      <div className="relative px-12">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {[...Array(data.iceBreakers.length + 5)].map((_, index) => (
              <Card
                key={index}
                className="w-full flex-shrink-0 bg-[#243B4A] border-[#4A7C7C]"
              >
                <CardContent className="p-6 overflow-y-auto max-h-[70vh]">
                  {renderSlideContent(index)}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#4A7C7C] text-white border-2 border-white hover:bg-[#3A6B6B] hover:text-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#4A7C7C] text-white border-2 border-white hover:bg-[#3A6B6B] hover:text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>
      <div className="flex justify-center mt-4 flex-wrap">
        {[...Array(data.iceBreakers.length + 5)].map((_, index) => (
          <Button
            key={index}
            variant={currentSlide === index ? 'default' : 'outline'}
            size="sm"
            className={`mx-1 mb-2 ${
              currentSlide === index
                ? 'bg-[#E85A4F] text-white hover:bg-[#D74940] hover:text-white'
                : 'bg-[#4A7C7C] text-white border-[#4A7C7C] hover:bg-[#3A6B6B] hover:text-white'
            }`}
            onClick={() => setCurrentSlide(index)}
          >
            {index + 1}
            <span className="sr-only">Go to slide {index + 1}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
