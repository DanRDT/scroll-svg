import { defaultOptions } from "."
import { OptionalOptions, Options } from "./types"
import calcPercentToDraw from "./utils/calcPercentToDraw"
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

  getOptions() {
    return this.options
  }
  getSvgPath() {
    return this.svgPath
  }
  getPercentageDrawn() {
    if (this.options.undraw) return 100 * (1 - calcPercentToDraw(this.svgPath, this.options))
    return 100 * calcPercentToDraw(this.svgPath, this.options)
  }

  clear() {
    this.svgPath.style.strokeDashoffset = `${this.svgPath.getTotalLength()}`
  }
  fill() {
    this.svgPath.style.strokeDashoffset = "0"
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
  changeOptions() {}
  getOptions() {
    return defaultOptions
  }
  getSvgPath() {
    console.error("Invalid input to scrollSvg. Returning an empty SVGPathElement.")
    return document.createElementNS("http://www.w3.org/2000/svg", "path")
  }
  getPercentageDrawn() {
    return 0
  }
  clear() {}
  fill() {}
}
