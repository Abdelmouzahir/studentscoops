/** @type {import('next').NextConfig} */

const nextConfig = {
  // Other configurations can be added here
  images: {
      domains: ['images.pexels.com', 'cdn.example.com', 'i.pinimg.com', 'splash.com', 'pintrest.com','firebasestorage.googleapis.com' , "upload.wikimedia.org"],
  },
};

export default nextConfig;

// Note: Modifying the list of allowed image domains enables the use of images from those sources.
// Be cautious when allowing domains to ensure security and performance are not compromised.
