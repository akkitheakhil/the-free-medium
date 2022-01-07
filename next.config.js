module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.dicebear.com', 'lh3.googleusercontent.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}
