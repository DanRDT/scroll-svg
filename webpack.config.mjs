import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
