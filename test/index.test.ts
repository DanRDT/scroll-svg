import { describe, expect, it } from 'vitest'
import { JSDOM } from 'jsdom'
import { validSvgPath } from '../src/setup/inputValidation'
import scrollSvg, { scrollSvgNullable } from '../src'
import { getDrawOrigin } from '../src/utils/getDrawOrigin'
import { percentToPixelOffset } from '../src/utils/calcAndDrawSvgPath'
import { scrollSvgClass, scrollSvgEmptyClass } from '../src/scrollSvgClass'
import { setupSvgPath } from '../src/setup/setupSvgPath'

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

/** Only for testing **/
export function resetSampleSvgPathForTesting(svgPath: SVGPathElement) {
  svgPath.getTotalLength = () => 690
}
export function getSampleSvgPathForTesting() {
  resetSampleSvgPathForTesting(sampleSvgPath)
  return sampleSvgPath
}
/**********************/

describe('Initial Tests', () => {
  it('checks vitest', () => expect(1).toBe(1))

  // SVG Validation
  const svgPath = getSampleSvgPathForTesting()
  it('checks svgPath', () => {
    expect(svgPath.tagName).toBe('path')

    expect(validSvgPath(svgPath)).toBe(true)
  })

  it('validates setupSvgPath', () => {
    expect(svgPath.style.strokeDasharray).toBe('')
    expect(svgPath.style.strokeDashoffset).toBe('')

    expect(setupSvgPath(svgPath)).toBe(undefined)

    expect(svgPath.style.strokeDasharray).toBe('690 690')
    expect(svgPath.style.strokeDashoffset).toBe('690')
  })

  it('validates svg path validation (validSvgPath function)', () => {
    expect(validSvgPath(null as unknown as SVGPathElement)).toBe(false)
    expect(validSvgPath(undefined as unknown as SVGPathElement)).toBe(false)

    const myElement = document.createElement('article')
    const body = document.querySelector('body')!
    body.appendChild(myElement)
    const article = document.querySelector('article')!
    expect(validSvgPath(article as any)).toBe(false)
    body.removeChild(article)

    svgPath.getTotalLength = () => undefined as unknown as number
    expect(validSvgPath(svgPath)).toBe(false)
    resetSampleSvgPathForTesting(svgPath)

    svgPath.getTotalLength = () => 0
    expect(validSvgPath(svgPath)).toBe(false)
    resetSampleSvgPathForTesting(svgPath)

    svgPath.getTotalLength = () => '' as unknown as number
    expect(validSvgPath(svgPath)).toBe(false)
    resetSampleSvgPathForTesting(svgPath)
  })

  it('validates scrollSvg', () => {
    expect(scrollSvg(svgPath)).toBeInstanceOf(scrollSvgClass)
    expect(scrollSvgNullable(svgPath)).toBeInstanceOf(scrollSvgClass)

    expect(scrollSvg(null as any)).toBeInstanceOf(scrollSvgEmptyClass)
    expect(scrollSvgNullable(null as any)).toBe(null)

    expect(scrollSvg(svgPath, { invalidKey: 'true' } as any)).toBeInstanceOf(scrollSvgEmptyClass)
    expect(scrollSvgNullable(svgPath, { invalidKey: 'true' } as any)).toBe(null)
  })
})
