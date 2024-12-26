import { OptionsComplete } from './types'

export const defaultOptions: OptionsComplete = {
  invert: false,
  draw_origin: 'center',
  offset: 0,
  speed: 1,
  undraw: false,
} as const

Object.freeze(defaultOptions)
