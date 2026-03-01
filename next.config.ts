/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Only use 'export' when running 'npm run build'
  output: isProd ? 'export' : undefined, 
  
  // These are fine to keep, but trailingSlash is safer as undefined in dev
  trailingSlash: isProd ? true : false, 
  
  images: {
    unoptimized: true,       
  },
  typescript: {
    // Keep this true if you must, but it's safer to see errors in dev
    ignoreBuildErrors: !isProd, 
  },
}

export default nextConfig;