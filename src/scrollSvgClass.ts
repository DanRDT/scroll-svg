import { Options } from "./types"
import calcScrollLine from "./utils/calcScrollLine"
import setupSvgPath from "./utils/minor/setupSvgPath"

export class scrollSvgClass {
  private svgPath: SVGPathElement
  private options: Options
  listener: (event: Event) => void

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
}

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
