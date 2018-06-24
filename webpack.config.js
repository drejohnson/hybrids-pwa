const path = require('path');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackBar = require('webpackbar');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  target: 'web',
  entry: {
    app: './src/app-shell.js'
  },
  mode: isProd ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    chunkFilename: !isProd
      ? `module/[name].js`
      : `module/[name].[chunkhash:8].js`,
    filename: !isProd ? `module/[name].js` : `module/[name].[chunkhash:8].js`,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js'],
    modules: ['./src', 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        type: 'javascript/esm',
        exclude: /node_modules/
        // use: [
        //   {
        //     loader: 'babel-loader',
        //     options: {
        //       presets: [
        //         [
        //           '@babel/preset-env',
        //           {
        //             targets: {
        //               browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
        //               esmodules: true
        //             }
        //           }
        //         ]
        //       ],
        //       plugins: [require('@babel/plugin-syntax-dynamic-import')]
        //     }
        //   }
        // ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // return DataURL if image size <= 8KB
              name: 'assets/[name].[ext]',
              fallback: 'file-loader' // use file loader for size > 8KB
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd,
        removeRedundantAttributes: isProd,
        removeScriptTypeAttributes: isProd,
        removeStyleLinkTypeAttributes: isProd,
        sortAttributes: isProd,
        sortClassName: isProd,
        useShortDoctype: isProd,
        minifyCSS: isProd,
        minifyJS: isProd,
        caseSensitive: isProd
      },
      hash: isProd,
      inject: true,
      template: './public/index.html'
    }),
    new ScriptExtHtmlPlugin({
      defaultAttribute: 'defer',
      module: ['app']
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: '@webcomponents/webcomponentsjs',
          entry: 'webcomponents-loader.js',
          supplements: ['bundles']
        }
      ]
    }),
    new WebpackBar(),
    ...(isProd
      ? [
          new WorkboxPlugin.GenerateSW({
            swDest: 'sw.js',
            clientsClaim: true,
            skipWaiting: true,
            // Exclude images from the precache
            exclude: [/\.(?:png|jpg|jpeg|svg|ico|webp)$/],
            // Define runtime caching rules.
            runtimeCaching: [
              {
                urlPattern: /^(https?.*)/,
                handler: 'networkFirst',
                options: {
                  cacheName: 'cache-https',
                  expiration: {
                    maxEntries: 50
                  },
                  networkTimeoutSeconds: 3
                }
              },
              {
                urlPattern: new RegExp('https://fonts.googleapis.com/(.*)'),
                // Apply a cache-first strategy.
                handler: 'cacheFirst',
                options: {
                  cacheName: 'googleapis',
                  expiration: {
                    maxEntries: 50
                  }
                }
              },
              {
                // Match any request ends with .png, .jpg, .jpeg or .svg.
                urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

                // Apply a cache-first strategy.
                handler: 'cacheFirst',

                options: {
                  cacheName: 'images-cache',
                  // Only cache 10 images.
                  expiration: {
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
                  },
                  cacheableResponse: {
                    statuses: [0, 200]
                  }
                }
              },
              // {
              //   urlPattern: /\.(?:js|css)$/,
              //   handler: 'staleWhileRevalidate',
              //   options: {
              //     cacheName: 'static-resources'
              //   }
              // },
              {
                urlPattern: /.*(?:googleapis)\.com.*$/,
                handler: 'staleWhileRevalidate',
                options: {
                  cacheName: 'googleapis-cache'
                }
              },
              {
                urlPattern: /.*(?:gstatic)\.com.*$/,
                handler: 'staleWhileRevalidate',
                options: {
                  cacheName: 'gstatic-cache'
                }
              }
            ]
          }),
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
          })
          // new BundleAnalyzerPlugin({ openAnalyzer: false })
        ]
      : [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
          })
        ])
  ],
  optimization: {
    nodeEnv: 'production',
    concatenateModules: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: { ecma: 6 },
        cache: true,
        // parallel: true,
        sourceMap: true // set to true if you want JS source maps
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    }
  }
};

if (!isProd) {
  module.exports.serve = {
    content: [__dirname],
    logLevel: 'error',
    hot: true,
    add: (app, middleware, options) => {
      const historyOptions = {
        // ... see: https://github.com/bripkens/connect-history-api-fallback#options
      };

      app.use(convert(history(historyOptions)));
    }
  };
}
