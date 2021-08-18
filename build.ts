import fs from 'fs';
import fsP from 'fs/promises';
import path from 'path';
// const sassPlugin = require('esbuild-plugin-sass');
import { sassPlugin } from 'esbuild-sass-plugin';
// const Kennyplugin = require('./customPlugin.js');
import htmlPlugin from '@chialab/esbuild-plugin-html';
import { Plugin, Loader, BuildOptions, OnLoadResult } from 'esbuild';
const esbuild = require('esbuild');

const imgLoaders: Record<string, Loader> = {
  '.png': 'file',
  '.jpg': 'file',
  '.gif': 'file',
  '.ico': 'file',
  '.svg': 'file',
};

const videoLoaders: Record<string, Loader> = {
  '.mp4': 'file',
  '.ogv': 'file',
  '.webm': 'file',
  '.webp': 'file',
};

const documentLoaders: Record<string, Loader> = {
  '.pdf': 'file',
};

const fontLoaders: Record<string, Loader> = {
  '.ttf': 'file',
};

const allLoaders = { ...imgLoaders, ...videoLoaders, ...documentLoaders, ...fontLoaders };

const fileManager: () => Plugin = () => {
  return {
    name: 'esbuild-plugin-copy-file',
    setup(build) {
      build.onStart(() => {
        console.log('File manager has started');
      });
      build.onResolve({ filter: /.(pdf|ttf|png|jpg|ico|gif|svg|mp4|ogv|webp|webm)$/ }, (args) => {
        console.log('file manager got something');
        console.log(args);
        const name = path.basename(args.path);
        const extname = path.extname(args.path);

        let directory: string = 'other';

        switch (extname) {
          case '.pdf':
            directory = 'documents';
            break;
          case '.png':
          case '.jpg':
          case '.gif':
          case '.ico':
            directory = 'images';
            break;
          case '.svg':
            directory = 'svg';
            break;
          case '.mp4':
          case '.ogv':
          case '.webp':
          case '.webm':
            directory = 'videos';
            break;
          case '.ttf':
            directory = 'fonts';
            break;
        }

        const finalpath = path.join(__dirname, `dist/assets/${directory}/${name}`);

        return {
          path: finalpath,
          namespace: 'copy-file',
          pluginName: 'esbuild-plugin-copy-file',
          pluginData: {
            src: path.resolve(args.resolveDir, args.path),
            dest: finalpath,
          },
        };
      });

      build.onLoad({ filter: /.(pdf|ttf|png|jpg|ico|gif|svg|mp4|ogv|webp|webm)$/, namespace: 'copy-file' }, (args) => {
        console.log('this is loader');
        console.log(args);
        const { src, dest } = args?.pluginData as { src: string; dest: string };
        try {
          if (!fs.existsSync(dest)) {
            fs.mkdirSync(path.dirname(dest), { recursive: true });
          }

          fs.copyFileSync(src, dest, fs.constants.COPYFILE_FICLONE);
        } catch (err) {
          console.log('ERROR ***** ');
          console.log(err);
          const result: OnLoadResult = {
            errors: [
              {
                pluginName: 'esbuild-plugin-copy-file',
                text: 'Could not save file, file already exist or is being used',
                location: {
                  file: src,
                  namespace: 'copy-file',
                  line: 0,
                  column: 0,
                  length: 0,
                  lineText: 'nothing',
                  suggestion: 'nothing',
                },
              },
            ],
          };

          return result;
        }

        return {
          contents: '// file was uploaded',
          loader: 'file',
        };
      });
      build.onEnd(() => {
        console.log('file manager has ended');
      });
    },
  };
};

esbuild.build({
  entryPoints: ['./src/js/index.js'],
  bundle: true,
  minify: false,
  sourcemap: false,
  target: ['es2018'],
  outdir: 'dist',
  loader: allLoaders,
  plugins: [
    // fileManager(),
    sassPlugin({
      type: 'css',
    }),
    htmlPlugin({
      scriptsTarget: 'es6',
      modulesTarget: 'es2020',
    }),
  ],
} as BuildOptions);
