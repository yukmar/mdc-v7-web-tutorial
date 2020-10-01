const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = [{
  entry: {
    login: ['./assets/styles/login.scss', './assets/js/login.js'],
    home: ['./assets/styles/home.scss', './assets/js/home.js']
  },
  output: {
    filename: 'bundle-[name].js',
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle-[name].css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass'),
              webpackImporter: false,
              sassOptions: {
                includePaths: ['./node_modules'],
                fiber: require('fibers')
              },
            },
          },
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        },
      }
    ]
  },
}];