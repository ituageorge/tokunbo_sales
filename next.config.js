// @ts-nocheck

 
/** @type {import('next').NextConfig} */
// const path = require('path')


const nextConfig = {
    reactStrictMode: true,
    swcMinify: true, // Ensure SWC is enabled
   
    images: {
        domains: ['res.cloudinary.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                // port: '',
                // pathname: `/${process.env.CLOUDINARY_NAME}/image/upload/**`,
              },
            {
                protocol:'https',
                hostname: '*.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: "tokunbo-ordering-sales.s3.amazonaws.com"
            }
        ]
    }
}

module.exports = nextConfig
