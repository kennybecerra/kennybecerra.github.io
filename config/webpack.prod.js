const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: './js/[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  mode: 'production',
  //devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist',
    overlay: true,
  },
  resolve: {
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: './assets/images/[name].[contenthash].[ext]',
            },
          },
          //, {
          //   loader: "image-webpack-loader",
          //   options: {
          //     disable: true,
          //     mozjpeg: {
          //       progressive: true,
          //       quality: 65
          //     },
          //     // optipng.enabled: false will disable optipng
          //     optipng: {
          //       enabled: false,
          //     },
          //     pngquant: {
          //       quality: [0.65, 0.90],
          //       speed: 4
          //     },
          //     gifsicle: {
          //       interlaced: false,
          //     },
          //     // the webp option will enable WEBP
          //     webp: {
          //       quality: 75
          //     }
          //   }
          // }
        ],
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              //limit: 10,
              esModule: false,
              name: './assets/SVG/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|mov|ogv|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              //limit: 10,
              esModule: false,
              name: './assets/videos/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            attrs: [
              'img:src',
              'source:src',
              'use:href',
              'use:xlink:href',
              'image:href',
              'image:xlink:href',
              'video:poster',
            ],
          },
        },
      },
      {
        test: /\.(pdf|doc|docx)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              //limit: 10,
              esModule: false,
              name: './assets/documents/[name].[ext]',
            },
          },
        ],
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              //limit: 10,
              esModule: false,
              name: './assets/fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: './css/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],
};
