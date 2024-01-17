const theme = require('./src/utils/themeLoader');
const withPlugins = require('next-compose-plugins');
const { remarkCodeHike } = require('@code-hike/mdx');
const jsonImporter = require('node-sass-json-importer');

const withNextra = require('nextra')({
  theme: '@speakeasy-sdks/nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  mdxOptions: {
    remarkPlugins: [
      [
        remarkCodeHike,
        { lineNumbers: true, showCopyButton: true, theme: theme.codeTheme },
      ],
    ],
  },
});

module.exports = withPlugins([], {
  sassOptions: {
    importer: jsonImporter(),
  },
  ...withNextra(),
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/curl/client_sdks/',
        permanent: true,
      },
      {
        source: '/typescript',
        destination: '/typescript/client_sdks/',
        permanent: true,
      },
      {
        source: '/unity',
        destination: '/unity/client_sdks/',
        permanent: true,
      },
      {
        source: '/curl',
        destination: '/curl/client_sdks/',
        permanent: true,
      },
    ]
  },
});
