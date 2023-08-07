/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    ...nextConfig,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.ci.dcd.shared.geniussports.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

// const nodeExternals = require('webpack-node-externals');

// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = {
//   ...nextConfig,
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.externals = [nodeExternals()];
//     }

//     return config;
//   },
// };
