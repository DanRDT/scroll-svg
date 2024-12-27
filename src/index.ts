import { ScrollSvgClass, ScrollSvgEmptyClass } from './scrollSvgClass'
import type { Options, OptionsComplete, ScrollSvgInterface } from './types'
import { validateOptions, validSvgPath } from './setup/inputValidation'
import { defaultOptions } from './defaultVariables'

/**
 * Returns either `ScrollSvgClass` used to control how and when the svg is drawn
 * or returns the `ScrollSvgEmptyClass` if the input is invalid.
 * The `ScrollSvgEmptyClass` is identical to the `ScrollSvgClass`, so it wont throw errors when `ScrollSvgClass` methods are called.
 * All functions performed on `ScrollSvgEmptyClass` are performed on a dummy SVG path.
 *
 * @param {SVGPathElement} svgPath The SVG Path which you wish to animate on scroll
 * @param {Options} userOptions Options to customize how and when the SVG is drawn
 */
export default function scrollSvg(svgPath: SVGPathElement, userOptions: Options = defaultOptions) {
  // validate svgPath
  // if invalid returns true, the function returns an empty replica class of scrollSvgClass
  if (!validSvgPath(svgPath)) return new ScrollSvgEmptyClass()

  // setup options
  const options: OptionsComplete = { ...defaultOptions, ...userOptions }

  // validate options
  if (validateOptions(options, userOptions) > 0) return new ScrollSvgEmptyClass()

  return new ScrollSvgClass(svgPath, options)
}

/**
 * Returns either `ScrollSvgClass` used to control how and when the svg is drawn
 * or returns `null` if the input is invalid.
 *
 * @param {SVGPathElement} svgPath The SVG Path which you wish to animate on scroll
 * @param {Options} userOptions Options to customize how and when the SVG is drawn
 */
export function scrollSvgNullable(svgPath: SVGPathElement, userOptions: Options = defaultOptions) {
  // validate svgPath
  // if invalid returns true, the function then returns null
  if (!validSvgPath(svgPath)) return null

  // setup options
  const options: OptionsComplete = { ...defaultOptions, ...userOptions }

  // validate options
  if (validateOptions(options, userOptions) > 0) return null

  return new ScrollSvgClass(svgPath, options)
}

export type { Options, OptionsComplete, ScrollSvgInterface }
