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
  reverse: false,
}

export class scrollSvgClass {
  private svgPath: SVGPathElement
  private options: Options
  private listener: (event: Event) => void

  constructor(svgPath: SVGPathElement, userOptions: OptionalOptions = defaultOptions) {
    this.svgPath = svgPath
    // validate svgPath
    if (checkSvgPath(svgPath)) console.log("svgPath is not valid")

    // setup options
    const options: Options = { ...defaultOptions, ...userOptions }
    Object.freeze(options)
    const optionsErrors = validateOptions(options)
    if (optionsErrors > 0) {
      this.options = defaultOptions
      console.error(`Found ${optionsErrors} errors in animation options for ${svgPath.outerHTML}`)
    } else this.options = options

    // initialize svgPath
    setupSvgPath(svgPath)
    calcScrollLine(svgPath, options)

    this.listener = functionWrapper(this.svgPath, this.options)

    window.addEventListener("scroll", this.listener)
  }

  addListener() {
    window.addEventListener("scroll", this.listener)
  }
  removeListener() {
    window.removeEventListener("scroll", this.listener)
  }
}

function functionWrapper(svgPath: SVGPathElement, options: Options) {
  return function inner(event: Event) {
    calcScrollLine(svgPath, options)
  }
}

function calcScrollLine(svgPath: SVGPathElement, options: Options) {
  const percentToDraw = calcPercentToDraw(svgPath, options)
  let pixelOffset = percentToPixelOffset(percentToDraw, svgPath)

  if (options.invert) {
    pixelOffset = -pixelOffset
  }
  svgPath.style.strokeDashoffset = pixelOffset + ""
}
