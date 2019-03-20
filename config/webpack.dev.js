const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "./js/main.js",
    path: path.resolve(__dirname, "../dist")
  },
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "../dist",
    overlay: true
  },
  resolve: {
    modules: ["node_modules"],
    alias: {
      TweenLite: "gsap/src/minified/TweenLite.min.js",
      TweenMax: "gsap/src/minified/TweenMax.min.js",
      TimelineLite: "gsap/src/minified/TimelineLite.min.js",
      TimelineMax: "gsap/src/minified/TimelineMax.min.js",
      ScrollMagic: "scrollmagic/scrollmagic/minified/ScrollMagic.min.js",
      "animation.gsap":
        "scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js",
      "debug.addIndicators":
        "scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./assets/images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              //limit: 10,
              name: "./assets/SVG/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|mov)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              //limit: 10,
              name: "./assets/videos/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src", "source:src", "use:href"]
          }
        }
      },
      {
        test: /\.(pdf|doc|docx)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              //limit: 10,
              name: "./assets/documents/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              //limit: 10,
              name: "./assets/fonts/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
