import { describe, expect, it } from 'vitest'
import { JSDOM } from 'jsdom'

describe('Vitest Test', () => {
  it('Should always pass', () => {
    expect(1).toBe(1)
  })
})

const dom = new JSDOM(`<!DOCTYPE html>`)
const document = dom.window.document

// Don't Use outside of testing
export function getSampleSvgPathForTesting() {
  const exampleSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  exampleSvgPath.setAttribute('d', 'M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80')
  exampleSvgPath.setAttribute('stroke', 'black')
  exampleSvgPath.setAttribute('stroke-width', '2')
  exampleSvgPath.setAttribute('fill', 'none')
  return exampleSvgPath
}
