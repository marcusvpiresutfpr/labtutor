/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
  },
  env: {
    DATABASE_URL: "mongodb+srv://marcusconnections:EQO073C5F3c2ykR6@tapoer.whuyfqb.mongodb.net/labtutor?retryWrites=true&w=majority",
    GOOGLE_CLIENT_ID: "401189466065-p3gl5qv1521c6s78noj1fsv8ne4huqnd.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    NEXTAUTH_SECRET: "0e710e7bb3bf3c8be91c53565a051fff",
    NEXTAUTH_URL: "http://localhost:3000",
  },
};

module.exports = nextConfig;
