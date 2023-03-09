import { Options } from "../types"
import getDrawOrigin from "./minor/getDrawOrigin"

// uses svg bounding box to calculate the percent of the svg path that should be drawn
export default function calcPercentToDraw(svgPath: SVGPathElement, options: Options): number {
  const height = window.innerHeight

  const svgTop = svgPath.getBoundingClientRect().top
  const svgHeight = svgPath.getBoundingClientRect().height

  // screenOffset is the distance from the top of the screen to where the svg should be drawn
  let screenOffset = height * getDrawOrigin(options)

  // percent is represented as a decimal
  let percentToDraw = (-svgTop + screenOffset) / svgHeight

  // Max out SVG
  if (percentToDraw > 1) {
    percentToDraw = 1
  } else if (percentToDraw < 0) {
    percentToDraw = 0
  }

  return percentToDraw
}
