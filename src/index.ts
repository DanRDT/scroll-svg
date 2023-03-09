import { Options, DefaultOptions } from "./types"
import calcPercentToDraw from "./utils/calcPercentToDraw"
import { validateOptions, checkSvgPath } from "./utils/errorCheck"
import percentToPixelOffset from "./utils/percentToPixelOffset"

const defaultOptions: DefaultOptions = {
  invert: false,
  offset: 0,
  speed: 1,
  scroll_origin: "center",
}

export default function scrollSvg(svgPath: SVGPathElement, userOptions: Options = defaultOptions): void {
  // validate svgPath
  if (checkSvgPath(svgPath)) return console.error(`Invalid svgPath for ${svgPath.outerHTML}`)

  // setup options
  const options = { ...defaultOptions, ...userOptions }
  Object.freeze(options)
  const optionsErrors = validateOptions(options)
  if (optionsErrors > 0)
    return console.error(`Found ${optionsErrors} errors in animation options for ${svgPath.outerHTML}`)

  // setup svgPath
  const svgPathLength = svgPath.getTotalLength()
  const svgStyle = svgPath.style
  svgStyle.strokeDasharray = svgPathLength + " " + svgPathLength
  svgStyle.strokeDashoffset = 0 + ""
  calcScrollLine()

  // setup scroll listener
  window.addEventListener("scroll", calcScrollLine)

  function calcScrollLine() {
    const percentToDraw = calcPercentToDraw(svgPath, options)
    let pixelOffset = percentToPixelOffset(percentToDraw, svgPath)

    if (options.invert) {
      pixelOffset = -pixelOffset
    }

    svgStyle.strokeDashoffset = pixelOffset + ""
  }
}
