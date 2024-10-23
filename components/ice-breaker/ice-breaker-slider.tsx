import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// const iceBreakers = [
// {
// emoji: '🚀',
// title: "AI's Role in Personal Growth",
// explanation: "Jordan's reflections on personal growth align with Daniel's work using AI to optimize performance and insights. Mention how Antelope's analytics help organizations measure the effectiveness of personal development programs. You can reference Jordan's post on how 'interruptions are where growth happens' as a segue.",
// subjects: [
// "Where Data Meets Personal Growth: Let's Chat",
// "Do AI and Self-Discovery Go Hand in Hand?",
// "Loved your post on growth—here's a related idea"
// ],
// intros: [
// "I came across your post on how interruptions drive growth—it really resonated.",
// "Our work in data-driven insights might align with the personal development journeys you coach.",
// "Seeing your post about 'being enough' got me thinking about how AI can help track progress."
// ],
// connections: [
// "Hi Jordan, I really enjoyed your recent post on personal growth. It aligns with some of the work we do at Antelope. Would love to connect and discuss.",
// "Hi Jordan, your journey from law to coaching is inspiring. I'd enjoy exchanging insights on how AI and personal development can intersect.",
// "Jordan, I've followed your work on mentorship and purpose for a while—excited to connect and explore synergies."
// ]
// },
// {
// emoji: '🎓',
// title: "University of Western Ontario Alumni Connection",
// explanation: "Both attended the same university, providing an opportunity to reminisce. Reference how alumni often cross paths unexpectedly in consulting and leadership spaces.",
// subjects: [
// "Western U Alumni Exploring New Frontiers",
// "Alumni Network Meets Innovation—A Catch-up?",
// "From Western to Coaching and Analytics—Small World!"
// ],
// intros: [
// "Always great to see fellow Western alums doing amazing things!",
// "Your transition from law to coaching reminds me of the entrepreneurial shifts happening in our alumni network.",
// "We might have crossed paths in some Western events—would love to connect and share experiences."
// ],
// connections: [
// "Jordan, as a fellow Western alum, I'd love to connect and explore mutual interests.",
// "I noticed we both went to Western—excited to connect and discuss some common experiences.",
// "Hi Jordan, I believe our time at Western overlapped—looking forward to exchanging insights."
// ]
// },
// {
// emoji: '⚖️',
// title: "Shared Philosophy on Work-Life Balance",
// explanation: "Jordan emphasizes burnout prevention and mindfulness, aligning with Daniel's belief in leveraging data for sustainable success. A meaningful conversation can stem from how both tackle these issues from different angles.",
// subjects: [
// "Burnout and Balance: A Shared Mission",
// "Mindfulness and Metrics—A New Kind of Synergy?",
// "AI and Coaching—Aligning on Work-Life Balance"
// ],
// intros: [
// "Your focus on burnout really resonates—I believe data can help organizations build better work environments.",
// "I noticed your post on being mindful of 'busy-ness'—we explore similar themes through data analytics.",
// "We've both seen how burnout impacts professionals—let's discuss ways to address it effectively."
// ],
// connections: [
// "Jordan, your recent post on mindful work struck a chord with me—keen to connect and explore this further.",
// "I love your reflections on meaningful work—it aligns with our approach at Antelope.",
// "Hi Jordan, would love to discuss your thoughts on burnout and how AI could play a role in preventing it."
// ]
// },
// {
// emoji: '🤝',
// title: "Mentorship as a Leadership Tool",
// explanation: "Jordan's posts often focus on mentorship, which aligns with Daniel's experience advising large organizations. Mention a specific post on mentorship and explore how both of your work intersects.",
// subjects: [
// "Mentorship and Metrics: Unlocking Leadership",
// "How Do You Define Mentorship?",
// "Your Mentorship Reflections Resonated—Let's Connect"
// ],
// intros: [
// "Your recent post on mentorship made me think about how companies can measure its impact.",
// "I appreciated your thoughts on dynamic mentorship—there's a lot we can explore together.",
// "It's exciting to see how your coaching emphasizes mentorship—it's a shared interest."
// ],
// connections: [
// "Jordan, your insights on mentorship resonate deeply—would love to discuss synergies.",
// "I've followed your mentorship posts with interest—it aligns closely with our work at Antelope.",
// "Would love to explore how mentorship impacts leadership, both from coaching and data perspectives."
// ]
// }
// ]

const exampleIceBreakers = [
  {
    emoji: '🤖',
    title: 'AI in Marketing Strategies',
    explanation:
      "Chris's extensive experience in AI and technology at Antelope aligns well with Daniel's focus on using analytics and AI to improve marketing strategies. A conversation about how generative AI can refine marketing efforts and content creation would provide valuable insights for both leaders.",
    subjects: [
      "Let's Discuss AI's Impact on Marketing Strategies",
      'Generative AI: Transforming Your Marketing Approach',
      'The Future of Marketing with AI—A Collaboration?'
    ],
    intros: [
      "I've been deeply immersed in transforming marketing through AI, and your insights on data-driven strategies really resonate with me.",
      "I noticed your recent projects around AI-driven content—I'd love to share some thoughts on how we at Antelope are leveraging similar technologies.",
      "Your experience with analytics in marketing intrigues me—let's explore the potential of AI together!"
    ],
    connections: [
      "Hi Daniel, as the VP of Technology at Antelope, I've been exploring new AI strategies in marketing. I'd love to connect and discuss our approaches.",
      'Hi Daniel, your work at Antelope using data for better marketing strategies aligns with my passion for AI in tech. Excited to connect!',
      'Daniel, I resonate with your approach to using analytics—keen to share insights from my role at Antelope and see where we intersect.'
    ]
  },
  {
    emoji: '🌍',
    title: 'Shared Insights on AI and Digital Media',
    explanation:
      'Both Chris and Daniel operate in the AI, technology, and digital media landscape. They can share strategies, insights, and trends observed in their respective roles. A collaboration could lead to innovative approaches to social media analytics.',
    subjects: [
      'Exploring Innovations in AI and Digital Media',
      "AI and Social Media Analytics—Let's Connect",
      'Synergizing Our Insights on Digital Strategies'
    ],
    intros: [
      "Your insights on social media analytics caught my attention, and I'd love to share some of my experiences at Antelope.",
      "I've been following your work with AI in marketing—let's connect and discuss how we can collaboratively innovate in this space.",
      "Your focus on analytics and AI aligns perfectly with my goals at Antelope—let's explore how our paths can intersect."
    ],
    connections: [
      "Hi Daniel, I admire your work with AI and social media analytics. I'd love to connect and discuss strategies we can share.",
      "Hi Daniel, I've seen the great impact of your AI applications in marketing, and I am eager to share insights from my role at Antelope.",
      "Daniel, your perspective on AI innovations is inspiring! Let's connect and discuss our experiences in the tech landscape."
    ]
  },
  {
    emoji: '🎯',
    title: 'Leading AI Innovations at Antelope',
    explanation:
      "With both Chris and Daniel leading initiatives at Antelope, they can exchange insights on the latest developments in AI technologies and how they're being applied to enhance business strategies.",
    subjects: [
      'Aligning Our Visions for AI Innovation',
      'Collaborating on AI Initiatives at Antelope',
      'Revolutionizing Business with AI—A Discussion'
    ],
    intros: [
      "As a fellow leader at Antelope, I'm eager to learn more about your vision for AI advancements and how we can collaborate.",
      "Your leadership in AI at Antelope is inspiring—I'd love to connect and share insights on how we can push boundaries together.",
      "I value your expertise in applying AI to marketing strategies, and I'm excited about the potential for our teams to collaborate!"
    ],
    connections: [
      "Hi Daniel, I'm passionate about driving AI innovations at Antelope and would love to connect with you for shared strategies.",
      "Hi Daniel, as part of the Antelope team, I'm eager to discuss AI innovations and how we can further advance our initiatives.",
      "Daniel, your role in shaping AI strategies aligns well with my interests—let's connect and explore joint opportunities."
    ]
  }
]

export default function IceBreakerSlider({
  iceBreakers
}: {
  iceBreakers: typeof exampleIceBreakers
}) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % iceBreakers.length)
  }

  const prevSlide = () => {
    setCurrentSlide(
      prev => (prev - 1 + iceBreakers.length) % iceBreakers.length
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        Ice Breaker Ideas
      </h2>
      <div className="relative px-12">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {iceBreakers.map((breaker, index) => (
              <Card
                key={index}
                className="w-full flex-shrink-0 bg-[#243B4A] border-[#4A7C7C]"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center mb-6">
                    <div className="text-4xl mb-2">{breaker.emoji}</div>
                    <h3 className="text-2xl font-bold text-white text-center">
                      {breaker.title}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-[#E85A4F]">
                        Explanation:
                      </h4>
                      <p className="text-white">{breaker.explanation}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-[#E85A4F]">
                        Email Subject Lines:
                      </h4>
                      <ul className="list-disc pl-5 text-white">
                        {breaker.subjects.map((subject, i) => (
                          <li key={i}>{subject}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-[#E85A4F]">
                        Email Intro Sentences:
                      </h4>
                      <ul className="list-disc pl-5 text-white">
                        {breaker.intros.map((intro, i) => (
                          <li key={i}>{intro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-[#E85A4F]">
                        LinkedIn Connection Messages:
                      </h4>
                      <ul className="list-disc pl-5 text-white">
                        {breaker.connections.map((connection, i) => (
                          <li key={i}>{connection}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
          <span className="sr-only">Previous ice breaker</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#4A7C7C] text-white border-2 border-white hover:bg-[#3A6B6B] hover:text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next ice breaker</span>
        </Button>
      </div>
      <div className="flex justify-center mt-4">
        {iceBreakers.map((_, index) => (
          <Button
            key={index}
            variant={currentSlide === index ? 'default' : 'outline'}
            size="sm"
            className={`mx-1 ${
              currentSlide === index
                ? 'bg-[#E85A4F] text-white hover:bg-[#D74940] hover:text-white'
                : 'bg-[#4A7C7C] text-white border-[#4A7C7C] hover:bg-[#3A6B6B] hover:text-white'
            }`}
            onClick={() => setCurrentSlide(index)}
          >
            {index + 1}
            <span className="sr-only">Go to ice breaker {index + 1}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
