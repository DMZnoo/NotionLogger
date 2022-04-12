/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_NOTION_TOKEN: process.env.NOTION_TOKEN,
    NEXT_NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID
  },
}




module.exports = nextConfig
