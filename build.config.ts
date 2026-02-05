/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          
  trailingSlash: true,       // THIS IS THE KEY: Creates /projects/index.html
  images: {
    unoptimized: true,       
  },
  typescript: {
    ignoreBuildErrors: true, 
  },
}

export default nextConfig;