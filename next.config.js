/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**'
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/linkedinanalyzer',
        destination: 'https://vercel-ai-chatbot-five.vercel.app/',
        permanent: true
      }
    ]
  }
}
