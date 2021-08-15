import { defineConfig } from 'rollup'
import html, { makeHtmlAttributes } from '@rollup/plugin-html'
import copy from 'rollup-plugin-copy'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

export default defineConfig([
  {
    input: 'src/js/index.js',
    treeshake: true,
    output: {
      dir: 'dist',
      format: 'esm',
      minifyInternalExports: true,
      compact: true,
    },
    plugins: [
      scss({
        insert: true,
        output: 'dist/index.css',
      }),
      html({
        title: 'Portfolio Website - Kenny Becerra',
        template: ({ attributes, files, meta, publicPath, title }) => {
          const scripts = (files.js || [])
            .map(({ fileName }) => {
              const attrs = makeHtmlAttributes(attributes.script)
              return `<script src="${publicPath}${fileName}"${attrs}></script>`
            })
            .join('\n')
          const links = (files.css || [])
            .map(({ fileName }) => {
              const attrs = makeHtmlAttributes(attributes.link)
              return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`
            })
            .join('\n')
          const metas = meta
            .map((input) => {
              const attrs = makeHtmlAttributes(input)
              return `<meta${attrs}>`
            })
            .join('\n')

          const htmlContent = fs.readFileSync(
            path.join(__dirname, 'src/index.html'),
            'utf-8'
          )

          const $ = cheerio.load(htmlContent)

          meta && $('head').prepend(`${metas}`)
          links && $('head').append(`${links}`)
          scripts && $('body').append(`${scripts}`)
          title && $('head title').text(title)

          return $.root().html()
        },
      }),
      copy({
        targets: [
          { src: 'src/assets/documents/*', dest: 'dist/assets/documents' },
          { src: 'src/assets/fonts/*', dest: 'dist/assets/fonts' },
          { src: 'src/assets/images/*', dest: 'dist/assets/images' },
          { src: 'src/assets/svg/*', dest: 'dist/assets/svg' },
          { src: 'src/assets/videos/*', dest: 'dist/assets/videos' },
        ],
      }),
    ],
  },
])
