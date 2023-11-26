import { Options } from '../types'
import { getDrawOrigin } from './getDrawOrigin'
// import { percentToPixelOffset } from './minor/percentToPixelOffset'

// Gets Calculations and Draws the SVG Path
export function calcAndDrawScrollLine(svgPath: SVGPathElement, options: Options) {
  const percentToDraw = calcPercentToDraw(svgPath, options)
  let pixelOffset = percentToPixelOffset(percentToDraw, svgPath, options)

  if (options.invert) {
    pixelOffset = -pixelOffset
  }
  svgPath.style.strokeDashoffset = pixelOffset + ''
}

// uses svg bounding box to calculate the percent of the svg path that should be drawn
export function calcPercentToDraw(svgPath: SVGPathElement, options: Options): number {
  const height = window.innerHeight

  const svgTop = svgPath.getBoundingClientRect().top - options.offset
  const svgHeight = svgPath.getBoundingClientRect().height

  // screenOffset is the distance from the top of the screen to where the svg should be drawn
  let screenOffset = height * getDrawOrigin(options)

  // percent is represented as a decimal
  let percentToDraw = ((-svgTop + screenOffset) / svgHeight) * options.speed

  // Max out SVG
  if (percentToDraw > 1) {
    percentToDraw = 1
  } else if (percentToDraw < 0) {
    percentToDraw = 0
  }

  return percentToDraw
}

// gets the percent as a decimal that the svg should be drawn and converts it to a pixel offset
export function percentToPixelOffset(percent: number, svgPath: SVGPathElement, options: Options): number {
  //
  // flips the percent from something like 0.3 to 0.7 and vise versa
  const adjustedPercent = 1 - percent

  const svgPathLength = svgPath.getTotalLength()

  if (options.undraw) {
    return -(percent * svgPathLength)
  } else {
    return adjustedPercent * svgPathLength
  }
}
