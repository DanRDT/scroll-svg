import { describe, expect, it } from 'vitest'
import { validateOptions } from '../src/setup/inputValidation'
import { defaultOptions } from '../src/defaultVariables'

describe('Options Tests', () => {
  it('validates default options', () => {
    expect(defaultOptions).toStrictEqual({
      invert: false,
      draw_origin: 'center',
      offset: 0,
      speed: 1,
      undraw: false,
    })
    expect(validateOptions(defaultOptions, {})).toBe(0)
  })

  it('validates options checker', () => {
    expect(validateOptions({ ...defaultOptions, option: 'true' } as any, {})).toBe(1)
    // invert
    expect(validateOptions({ ...defaultOptions, invert: 'true' } as any, {})).toBe(1)
    expect(validateOptions({ ...defaultOptions, invert: true }, {})).toBe(0)
    // draw origin
    expect(validateOptions({ ...defaultOptions, draw_origin: 'middle' } as any, {})).toBe(1)
    expect(validateOptions({ ...defaultOptions, draw_origin: NaN }, {})).toBe(1)
    expect(validateOptions({ ...defaultOptions, draw_origin: -0.5 }, {})).toBe(1)
    expect(validateOptions({ ...defaultOptions, draw_origin: 1.5 }, {})).toBe(1)
    expect(validateOptions({ ...defaultOptions, draw_origin: 0.3 }, {})).toBe(0)
    expect(validateOptions({ ...defaultOptions, draw_origin: 'top' }, {})).toBe(0)
    // offset
    expect(validateOptions({ ...defaultOptions, offset: '100' } as any, {})).toBe(1)
    expect(validateOptions({ ...defaultOptions, offset: NaN }, {})).toBe(1)
    expect(validateOptions({ ...defaultOptions, offset: 100 }, {})).toBe(0)
    // speed
    expect(validateOptions({ ...defaultOptions, speed: '100' } as any, {})).toBe(1)
    expect(validateOptions({ ...defaultOptions, speed: NaN }, {})).toBe(1)
    expect(validateOptions({ ...defaultOptions, speed: -1 }, {})).toBe(1)
    expect(validateOptions({ ...defaultOptions, speed: 2 }, {})).toBe(0)
    // undraw
    expect(validateOptions({ ...defaultOptions, undraw: 'true' } as any, {})).toBe(1)
    expect(validateOptions({ ...defaultOptions, undraw: true }, {})).toBe(0)
  })
})
