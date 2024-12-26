import { describe, expect, it } from 'vitest'
import { getDrawOrigin } from '../src/utils/getDrawOrigin'
import { percentToPixelOffset } from '../src/utils/calcAndDrawSvgPath'
import { getSampleSvgPathForTesting } from './index.test'
import { defaultOptions } from '../src/defaultVariables'

describe('Setup Tests', () => {
  const svgPath = getSampleSvgPathForTesting()

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
