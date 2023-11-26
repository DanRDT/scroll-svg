import { describe, expect, it } from 'vitest'
import { JSDOM } from 'jsdom'
import { validSvgPath } from '../src/utils/inputValidation'
import scrollSvg, { defaultOptions, scrollSvgNullable } from '../src'
import getDrawOrigin from '../src/utils/minor/getDrawOrigin'
import percentToPixelOffset from '../src/utils/minor/percentToPixelOffset'

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
    expect(getDrawOrigin(defaultOptions)).toBe(0.5)
    expect(getDrawOrigin({ ...defaultOptions, draw_origin: 'top' })).toBe(0.25)
    expect(getDrawOrigin({ ...defaultOptions, draw_origin: 'center' })).toBe(0.5)
    expect(getDrawOrigin({ ...defaultOptions, draw_origin: 'bottom' })).toBe(0.75)
    expect(getDrawOrigin({ ...defaultOptions, draw_origin: 1 })).toBe(1)
    expect(getDrawOrigin({ ...defaultOptions, draw_origin: 0 })).toBe(0)
    expect(getDrawOrigin({ ...defaultOptions, draw_origin: 0.47923 })).toBe(0.47923)
  })

  it('validates percentToPixelOffset', () => {
    expect(percentToPixelOffset(1, svgPath, defaultOptions)).toBe(0)
    expect(percentToPixelOffset(0, svgPath, defaultOptions)).toBe(690)
    expect(percentToPixelOffset(0.5, svgPath, defaultOptions)).toBe(345)
    expect(percentToPixelOffset(0.35, svgPath, defaultOptions)).toBe(448.5)
    expect(percentToPixelOffset(0.88, svgPath, defaultOptions)).toBe(82.8)
    expect(percentToPixelOffset(0.75, svgPath, defaultOptions)).toBe(172.5)

    expect(percentToPixelOffset(1, svgPath, { ...defaultOptions, undraw: true })).toBe(-690)
    expect(percentToPixelOffset(0, svgPath, { ...defaultOptions, undraw: true })).toBe(-0)
    expect(percentToPixelOffset(0.75, svgPath, { ...defaultOptions, undraw: true })).toBe(-517.5)
    expect(percentToPixelOffset(0.5, svgPath, { ...defaultOptions, undraw: true })).toBe(-345)
  })
})
