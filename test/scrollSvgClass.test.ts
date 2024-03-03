import { describe, expect, it } from 'vitest'
import { getSampleSvgPathForTesting } from './index.test'
import scrollSvg from '../src'
import { defaultOptions } from '../src/defaultVariables'

describe('Check scrollSvgClass', () => {
  const svgPath = getSampleSvgPathForTesting()
  const svgClass = scrollSvg(svgPath)

  it('validates variables', () => {
    expect(svgClass.svgPath.tagName).toBe('path')
    expect(svgClass.options).toMatchObject(defaultOptions)

    expect(svgClass.animationFrame).toBe(1)
    expect(svgClass.prevBoundingRectTop).toBe(0)

    expect(svgClass.isActive).toBe(true)
    expect(svgClass.isObservable).toBe(true)
  })
})
