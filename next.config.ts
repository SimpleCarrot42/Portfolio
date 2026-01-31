/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/1',
        destination: '/projects/godrive',
        permanent: true,
      },
    ]
  },
}

export default nextConfig