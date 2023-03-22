import { defaultOptions } from "."
import { OptionalOptions, Options } from "./types"
import calcPercentToDraw from "./utils/calcPercentToDraw"
import calcAndDrawScrollLine from "./utils/calcAndDrawScrollLine"
import { validateOptions } from "./utils/inputValidation"
import setupSvgPath from "./utils/minor/setupSvgPath"

export class scrollSvgClass {
  private svgPath: SVGPathElement
  private options: Options
  private animationFrame: number = 0
  private isActive: boolean = true
  // private listener: (event: Event) => void

  constructor(svgPath: SVGPathElement, options: Options) {
    this.svgPath = svgPath
    this.options = options

    // initialize svgPath
    setupSvgPath(svgPath)
    calcAndDrawScrollLine(svgPath, options)

    animationFrame(this)

    // this.listener = functionWrapper(this.svgPath, this.options)

    // const animate = () => functionWrapper(this.svgPath, this.options)

    // this.animationFrame = requestAnimationFrame(animate)

    // window.addEventListener("scroll", this.listener)
  }

  animate() {
    if (this.isActive) return
    this.isActive = true
    animationFrame(this)
  }
  stopAnimating() {
    this.isActive = false
  }

  changeOptions(userOptions: OptionalOptions) {
    const options = { ...this.options, ...userOptions }

    if (validateOptions(options, userOptions) > 0) return
    this.options = options
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
    calcAndDrawScrollLine(svgPath, options)
  }
}

const animationFrame = (scrollSvgObj: any) => {
  calcAndDrawScrollLine(scrollSvgObj.svgPath, scrollSvgObj.options)

  if (scrollSvgObj.isActive) {
    scrollSvgObj.animationFrame = requestAnimationFrame(function () {
      animationFrame(scrollSvgObj)
    })
  } else {
    cancelAnimationFrame(scrollSvgObj.animationFrame)
    scrollSvgObj.animationFrame = 0
  }
}

// an empty replica class of scrollSvgClass to return when the input is invalid
export class scrollSvgClassEmpty {
  constructor() {}
  animate() {}
  stopAnimating() {}
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
