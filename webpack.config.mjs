import path from 'path'

const __dirname = import.meta.dirname

export default {
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
