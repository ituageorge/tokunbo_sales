// @ts-nocheck

 
/** @type {import('next').NextConfig} */
// const path = require('path')


const nextConfig = {
    env: {
        MONGO_URL:'mongodb+srv://george_12:george_12@georgemedia.8qi2i.mongodb.net/tokunbo_sales',
    },
    // babel: {
    //     presets: ['next/babel'],
    //   },
    // experimental: {
    //   trace: false,
    // },
    // modules: {
    //   css: {
    //     loader: 'postcss-loader',
    //     options: {
    //       plugins: () => [require('tailwindcss')],
    //     },
    //   },
    // },
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
            // {
            //     protocol: 'https',
            //     hostname: "tokunbo-ordering-sales.s3.amazonaws.com"
            // }
        ]
    }
}

module.exports = nextConfig
