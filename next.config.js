const path = require('path');

const withMDX = require('@next/mdx')({
  options : {
    remarkPlugins : [require('remark-math')],
    rehypePlugins : [require('rehype-katex')],
  }
});
const withTM = require('next-transpile-modules');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled : process.env.ANALYZE == 'true',
});

module.exports = withTM(withBundleAnalyzer(withMDX({
  pageExtensions : [ 'jsx', 'js', 'mdx' ],
  transpileModules :
      ['bs-platform', 'bs-css', 'bs-refmt', 'bsc-stdlib-polyfill'],
  webpack(config, options) {
    config.node = {fs : 'empty', child_process : 'empty'};
    config.resolve.alias['@reason'] = path.join(__dirname, 'lib', 'es6', 'src');
    config.resolve.alias['@docs'] = path.join(__dirname, 'docs');
    config.resolve.extensions.push('.bs.js');
    return config
  },
  env : {},
  publicRuntimeConfig : {}
})))
