import { scrollSvgClass, scrollSvgEmptyClass } from './scrollSvgClass'
import { Options, OptionalOptions } from './types'
import { validateOptions, validSvgPath } from './utils/inputValidation'

export const defaultOptions: Options = {
  invert: false,
  draw_origin: 'center',
  offset: 0,
  speed: 1,
  undraw: false,
}

/**
 * Returns either `ScrollSvgClass` used to control how and when the svg is drawn
 * or returns the `scrollSvgEmptyClass` if the input is invalid.
 * The `scrollSvgEmptyClass` is identical to the `scrollSvgClass`, so it wont throw errors when `scrollSvgClass` methods are called.
 * All functions performed on `scrollSvgEmptyClass` are performed on a dummy SVG path.
 *
 * @param {SVGPathElement} svgPath The SVG Path which you wish to animate on scroll
 * @param {OptionalOptions} userOptions Options to customize how and when the SVG is drawn
 */
export default function scrollSvg(svgPath: SVGPathElement, userOptions: OptionalOptions = defaultOptions) {
  // validate svgPath
  // if invalid returns true, the function returns an empty replica class of scrollSvgClass
  if (!validSvgPath(svgPath)) return new scrollSvgEmptyClass()

  // setup options
  const options: Options = { ...defaultOptions, ...userOptions }
  Object.freeze(options)

  // validate options
  if (validateOptions(options, userOptions) > 0) return new scrollSvgEmptyClass()

  return new scrollSvgClass(svgPath, options)
}

/**
 * Returns either `ScrollSvgClass` used to control how and when the svg is drawn
 * or returns `null` if the input is invalid.
 *
 * @param {SVGPathElement} svgPath The SVG Path which you wish to animate on scroll
 * @param {OptionalOptions} userOptions Options to customize how and when the SVG is drawn
 */
export function scrollSvgNullable(svgPath: SVGPathElement, userOptions: OptionalOptions = defaultOptions) {
  // validate svgPath
  // if invalid returns true, the function then returns null
  if (!validSvgPath(svgPath)) return null

  // setup options
  const options: Options = { ...defaultOptions, ...userOptions }
  Object.freeze(options)

  // validate options
  if (validateOptions(options, userOptions) > 0) return null

  return new scrollSvgClass(svgPath, options)
}
