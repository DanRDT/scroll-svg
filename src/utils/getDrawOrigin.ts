import type { OptionsComplete } from '../types'

// return draw origin as a decimal between 0 and 1
// value validation for draw_origin is done in validateOptions function
export function getDrawOrigin(options: OptionsComplete): number {
  let drawOrigin: number
  if (options.draw_origin === 'top') {
    drawOrigin = 0.25
  } else if (options.draw_origin === 'center') {
    drawOrigin = 0.5
  } else if (options.draw_origin === 'bottom') {
    drawOrigin = 0.75
  } else {
    drawOrigin = options.draw_origin
  }

  return drawOrigin
}
