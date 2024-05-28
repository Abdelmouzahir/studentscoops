/** @type {import('next').NextConfig} */

const nextConfig = {
    //... other configurations
    images: {
      domains: ['images.pexels.com', 'splash.com', 'pintrest.com','i.pinimg.com'],
    },
  };
  // This is remove the security provided by the next js and will be able to use any pictures there in internet
  export default nextConfig;
