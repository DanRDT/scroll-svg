const path = require('path')

module.exports = {
  entry: './dist/index.mjs',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    globalObject: 'this',
    library: {
      name: '$_scrollSvg',
      type: 'umd',
    },
  },
}
