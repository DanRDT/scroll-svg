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
  private prevBoundingRectTop: number
  private isActive: boolean = true
  private observer: IntersectionObserver

  constructor(svgPath: SVGPathElement, options: Options) {
    // initialize class variables
    this.svgPath = svgPath
    this.options = options
    this.prevBoundingRectTop = svgPath.getBoundingClientRect().top

    // initialize svgPath
    setupSvgPath(svgPath)
    calcAndDrawScrollLine(svgPath, options)

    //start animating
    animationFrame(this)

    this.observer = new IntersectionObserver(
      (items) => {
        items.map((item) => {
          if (item.isIntersecting) {
            this.animate()
          } else {
            this.stopAnimating()
          }
        })
      },
      {
        rootMargin: "25px 0px",
      }
    )

    this.observer.observe(this.svgPath)
  }

  animate() {
    if (this.isActive) return
    this.isActive = true
    animationFrame(this)
  }

  stopAnimating() {
    this.isActive = false
    this.animationFrame = 0
  }

  redraw() {
    calcAndDrawScrollLine(this.svgPath, this.options)
  }

  changeOptions(userOptions: OptionalOptions) {
    const options = { ...this.options, ...userOptions }

    if (validateOptions(options, userOptions) > 0) return false
    this.options = options
    return true
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

const animationFrame = (scrollSvgObj: any) => {
  // check if user has scrolled if so, recalculate and redraw the scroll line
  if (scrollSvgObj.prevBoundingRectTop !== scrollSvgObj.svgPath.getBoundingClientRect().top) {
    calcAndDrawScrollLine(scrollSvgObj.svgPath, scrollSvgObj.options)
    scrollSvgObj.prevBoundingRectTop = scrollSvgObj.svgPath.getBoundingClientRect().top
  }
  console.log(scrollSvgObj.svgPath.id)

  // check if user still wishes to continue animating
  if (scrollSvgObj.isActive) {
    scrollSvgObj.animationFrame = requestAnimationFrame(function () {
      animationFrame(scrollSvgObj)
    })
  } else {
    cancelAnimationFrame(scrollSvgObj.animationFrame)
  }
}

// an empty replica class of scrollSvgClass to return when the input is invalid
export class scrollSvgClassEmpty {
  constructor() {}
  animate() {}
  stopAnimating() {}
  redraw() {}
  changeOptions() {
    return false
  }
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
