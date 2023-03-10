import { Options } from "../types"
import calcPercentToDraw from "./calcPercentToDraw"
import percentToPixelOffset from "./minor/percentToPixelOffset"

export default function calcScrollLine(svgPath: SVGPathElement, options: Options) {
  const percentToDraw = calcPercentToDraw(svgPath, options)
  let pixelOffset = percentToPixelOffset(percentToDraw, svgPath)

  if (options.invert) {
    pixelOffset = -pixelOffset
  }
  svgPath.style.strokeDashoffset = pixelOffset + ""
}
