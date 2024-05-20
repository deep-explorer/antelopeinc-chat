/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'http',
        hostname: 'testing.nextpost.io',
        port: '',
        pathname: '**'
      }
    ]
  }
}
