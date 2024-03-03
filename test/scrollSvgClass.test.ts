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

  it('validates methods', () => {
    expect(svgClass.changeOptions({})).toBe(true)
    expect(svgClass.changeOptions({ invalidKey: '' } as any)).toBe(false)
    expect(svgClass.changeOptions({ speed: 2 })).toBe(true)
    expect(svgClass.changeOptions({ draw_origin: 'top' })).toBe(true)
    expect(svgClass.changeOptions({ invert: true })).toBe(true)
    expect(svgClass.changeOptions({ offset: 50 })).toBe(true)
    expect(svgClass.changeOptions({ undraw: true })).toBe(true)
    expect(svgClass.options).toMatchObject({ draw_origin: 'top', invert: true, offset: 50, speed: 2, undraw: true })
    expect(svgClass.changeOptions(defaultOptions)).toBe(true)

    expect(svgClass.changeSvgPath(null as any)).toBe(false)
    expect(svgClass.changeSvgPath(getSampleSvgPathForTesting('#svg-path-2'))).toBe(true)
    expect(svgClass.svgPath.getAttribute('d')).toBe('M178.458 0.5V142H339V292.5H4.5V462H178.458V636.5')
    expect(svgClass.changeSvgPath(getSampleSvgPathForTesting('#svg-path'))).toBe(true)
    expect(svgClass.svgPath.getAttribute('d')).toBe('M 4 4 V 694.5')

    svgClass.stopAnimating()
    expect(svgClass.isActive).toBe(false)
    expect(svgClass.animationFrame).toBe(0)
    svgClass.animate()
    expect(svgClass.isActive).toBe(true)

    expect(svgClass.getOptions()).toMatchObject(defaultOptions)
    expect(svgClass.getSvgPath().tagName).toBe('path')
    // expect(svgClass.getPercentageDrawn()).toBe(100)

    svgClass.fill()
    expect(svgClass.svgPath.style.strokeDashoffset).toBe('0')
    // svgClass.clear()
    // svgClass.redraw()

    svgClass.remove()
    expect(svgClass.isActive).toBe(false)
    expect(svgClass.animationFrame).toBe(0)
  })
})
