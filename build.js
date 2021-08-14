const esbuild = require('esbuild');
const sassPlugin = require('esbuild-plugin-sass');

const imgLoaders = {
  '.png': 'file',
  '.jpg': 'file',
  '.gif': 'file',
  '.ico': 'file',
  '.svg': 'file',
};

const videoLoaders = {
  '.mp4': 'file',
  '.ogv': 'file',
  '.webm': 'file',
  '.webp': 'file',
};

const documentLoaders = {
  '.pdf': 'file',
};

const fontLoaders = {
  '.ttf': 'file',
};

esbuild.build({
  entryPoints: ['./src/js/index.js', './src/scss/main.scss'],
  bundle: true,
  minify: true,
  sourcemap: false,
  target: ['es2018'],
  outdir: 'dist',
  loader: { ...imgLoaders, ...videoLoaders, ...documentLoaders, ...fontLoaders },
  plugins: [sassPlugin()],
});
