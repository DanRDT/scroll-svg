import { OptionalOptions, Options } from "./types"
import calcScrollLine from "./utils/calcScrollLine"
import { validateOptions } from "./utils/inputValidation"
import setupSvgPath from "./utils/minor/setupSvgPath"

export class scrollSvgClass {
  private svgPath: SVGPathElement
  private options: Options
  private listener: (event: Event) => void

  constructor(svgPath: SVGPathElement, options: Options) {
    this.svgPath = svgPath
    this.options = options

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

  changeOptions(userOptions: OptionalOptions) {
    const options = { ...this.options, ...userOptions }

    if (validateOptions(options, userOptions) > 0) return
    this.options = options

    // reset listener
    this.removeListener()
    this.listener = functionWrapper(this.svgPath, this.options)
    this.addListener()

    calcScrollLine(this.svgPath, options)
  }
}

// a wrapper function used to be able to pass arguments to the event listener
function functionWrapper(svgPath: SVGPathElement, options: Options) {
  return function inner(event: Event) {
    calcScrollLine(svgPath, options)
  }
}

// an empty replica class of scrollSvgClass to return when the input is invalid
export class scrollSvgClassEmpty {
  constructor() {}
  addListener() {}
  removeListener() {}
}
