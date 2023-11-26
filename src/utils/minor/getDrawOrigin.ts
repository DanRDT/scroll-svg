import { Options } from '../../types'

// return draw origin as a decimal between 0 and 1
// *validation for draw_origin is done in validateOptions
export default function getDrawOrigin(options: Options): number {
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
