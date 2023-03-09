import { Options, OptionalOptions } from "./types"
import calcPercentToDraw from "./utils/calcPercentToDraw"
import { validateOptions, checkSvgPath } from "./utils/inputValidation"
import percentToPixelOffset from "./utils/minor/percentToPixelOffset"
import setupSvgPath from "./utils/minor/setupSvgPath"

const defaultOptions: Options = {
  invert: false,
  draw_origin: "center",
  offset: 0,
  speed: 1,
}

export default function scrollSvg(svgPath: SVGPathElement, userOptions: OptionalOptions = defaultOptions): void {
  // validate svgPath
  if (checkSvgPath(svgPath)) return

  // setup options
  const options: Options = { ...defaultOptions, ...userOptions }
  Object.freeze(options)
  const optionsErrors = validateOptions(options)
  if (optionsErrors > 0)
    return console.error(`Found ${optionsErrors} errors in animation options for ${svgPath.outerHTML}`)

  // initialize svgPath
  setupSvgPath(svgPath)
  calcScrollLine()

  // setup scroll listener
  window.addEventListener("scroll", calcScrollLine)

  function calcScrollLine() {
    const percentToDraw = calcPercentToDraw(svgPath, options)
    let pixelOffset = percentToPixelOffset(percentToDraw, svgPath)

    if (options.invert) {
      pixelOffset = -pixelOffset
    }

    svgPath.style.strokeDashoffset = pixelOffset + ""
  }
}
