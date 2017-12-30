const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const prod = process.argv.indexOf('-p') !== -1

module.exports = {
  entry: [
    'webpack/hot/poll?1000',
    './electron/main',
  ],
  watch: !prod,
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [
    nodeExternals({
                    whitelist: [ 'webpack/hot/poll?1000' ],
                  }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.electron.json',
        },
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': (prod ? '"production"' : '"development"') }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_electron.js',
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  devtool: prod ? undefined : 'source-map',
}
