import { defineConfig, type Options } from 'tsup'

const baseConfig: Options = {
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'],
  globalName: 'ScrollSvg',
}

export default defineConfig([
  // Non-minified
  {
    ...baseConfig,
    dts: true,
    sourcemap: true,
    clean: true,
    minify: false,
    outExtension({ format }) {
      return {
        js:
          format === 'iife' ? '.global.js'
          : format === 'cjs' ? '.cjs'
          : '.mjs',
      }
    },
  },
  // Minified
  {
    ...baseConfig,
    minify: true,
    outExtension({ format }) {
      return {
        js:
          format === 'iife' ? '.global.min.js'
          : format === 'cjs' ? '.min.cjs'
          : '.min.mjs',
      }
    },
  },
])
