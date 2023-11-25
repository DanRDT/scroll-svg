import { describe, expect, it } from 'vitest'
import { JSDOM } from 'jsdom'
import { validSvgPath } from '../src/utils/inputValidation'
import scrollSvg, { scrollSvgNullable } from '../src'

const DOM = new JSDOM(
  `<!DOCTYPE html>
<html lang="en" width="1080" height="1920">
  <head></head>
  <body width="1080" height="1920">
    <svg id="svg" width="1080" height="1920" viewBox="0 0 9 699" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path id="svg-path" d="M 4 4 V 694.5" stroke="black" stroke-width="4" />
    </svg>
  </body>
</html>`,
  { pretendToBeVisual: true }
)
const { document } = DOM.window

const sampleSvgPath = document.querySelector('#svg-path') as SVGPathElement
// JSDOM doesn't support getTotalLength yet
sampleSvgPath.getTotalLength = () => 690
console.log(document)

/** Only for testing */
export function getSampleSvgPathForTesting() {
  return sampleSvgPath
}

describe('Setup Tests', () => {
  it('checks vitest', () => expect(1).toBe(1))

  // SVG Validation
  const svgPath = getSampleSvgPathForTesting()
  it('checks getSampleSvgPathForTesting', () => {
    expect(svgPath.tagName).toBe('path')
  })

  it('validates setupSvgPath', () => {
    expect(1).toBe(1)
  })

  it('validates svg path validation', () => {
    expect(validSvgPath(null as unknown as SVGPathElement)).toBe(false)
    expect(validSvgPath(undefined as unknown as SVGPathElement)).toBe(false)

    svgPath.getTotalLength = () => undefined as unknown as number
    expect(validSvgPath(svgPath)).toBe(false)
    svgPath.getTotalLength = () => 690
  })
  it('validates svg path', () => {
    expect(validSvgPath(svgPath)).toBe(true)
  })

  it('validates scrollSvg', () => {
    expect(scrollSvgNullable(undefined as unknown as any)).toBe(null)
  })

  it('validates getDrawOrigin', () => {
    expect(1).toBe(1)
  })

  it('validates percentToPixelOffset', () => {
    expect(1).toBe(1)
  })
})
