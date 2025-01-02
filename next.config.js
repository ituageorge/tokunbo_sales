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
    },
     i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US', 'fr', 'nl-NL'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-US',
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en-US',
      },
      {
        domain: 'example.nl',
        defaultLocale: 'nl-NL',
      },
      {
        domain: 'example.fr',
        defaultLocale: 'fr',
        // an optional http field can also be used to test
        // locale domains locally with http instead of https
        http: true,
      },
    ],
  },
}

module.exports = nextConfig
