/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "internaut.nyc3.cdn.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      }, {
        hostname: "internaut.nyc3.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      }, {
        hostname: "uploadthing.com",
        port: "",
        pathname: "/**"
      }, {
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        port: "",
        pathname: "/**"
      }, {
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/**"
      }, {
        hostname: "utfs.io",
        port: "",
        pathname: "/**"
       }, {
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**"
       }, {
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**"
       }, {
        hostname: "tailwindui.com",
        port: "",
        pathname: "/**"
       }, {
        hostname: "x7ml6h4rfiqphqpl.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**"
       }
    ]
  },
  reactStrictMode: false,
}

module.exports = nextConfig