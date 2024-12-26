import { Options, OptionsComplete, ScrollSvgInterface } from './types'
import { calcPercentToDraw, calcAndDrawScrollLine } from './utils/calcAndDrawSvgPath'
import { validSvgPath, validateOptions } from './setup/inputValidation'
import { setupSvgPath } from './setup/setupSvgPath'
import { defaultOptions } from './defaultVariables'

/**
 * The ScrollSvgClass used to control how and when the svg is drawn
 */
export class ScrollSvgClass implements ScrollSvgInterface {
  svgPath: SVGPathElement
  options: OptionsComplete
  animationFrame: number = 0
  prevBoundingRectTop: number
  isActive: boolean = true
  isObservable: boolean = true
  // observer: IntersectionObserver

  constructor(svgPath: SVGPathElement, options: OptionsComplete) {
    // initialize class variables
    this.svgPath = svgPath
    this.options = options
    this.prevBoundingRectTop = svgPath.getBoundingClientRect().top

    // initialize svgPath
    setupSvgPath(svgPath)
    calcAndDrawScrollLine(svgPath, options)

    // Disabled until IntersectionObserver API Bug fixed
    // this.observer = new IntersectionObserver(
    //   items => {
    //     items.map(item => {
    //       if (item.isIntersecting) {
    //         this.isObservable = true
    runAnimationFrame(this)
    //       } else {
    //         this.isObservable = false
    //       }
    //     })
    //   },
    //   {
    //     rootMargin: '50px 0px',
    //   }
    // )
    // this.observer.observe(this.svgPath)
  }

  animate() {
    if (this.isActive) return
    this.isActive = true
    runAnimationFrame(this)
  }
  stopAnimating() {
    this.isActive = false
    this.animationFrame = 0
  }

  redraw() {
    calcAndDrawScrollLine(this.svgPath, this.options)
  }
  changeOptions(userOptions: Options) {
    const options = { ...this.options, ...userOptions }

    if (validateOptions(options, userOptions) > 0) return false
    this.options = options
    return true
  }
  changeSvgPath(newSvgPath: SVGPathElement) {
    if (validSvgPath(newSvgPath)) {
      this.svgPath = newSvgPath
      this.prevBoundingRectTop = newSvgPath.getBoundingClientRect().top
      setupSvgPath(newSvgPath)

      return true
    } else return false
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
    this.svgPath.style.strokeDashoffset = '0'
  }
  remove() {
    this.stopAnimating()
    // this.observer.disconnect()
    // this.isObservable = false
  }
}

/**
 * Draw svg each animation frame if it is active.
 * @param scrollSvgObj instance of ScrollSvgClass
 */
const runAnimationFrame = (scrollSvgObj: ScrollSvgClass) => {
  // check if user has scrolled if so, recalculate and redraw the scroll line
  if (scrollSvgObj.prevBoundingRectTop !== scrollSvgObj.svgPath.getBoundingClientRect().top) {
    calcAndDrawScrollLine(scrollSvgObj.svgPath, scrollSvgObj.options)
    scrollSvgObj.prevBoundingRectTop = scrollSvgObj.svgPath.getBoundingClientRect().top
  }
  // check if user still wishes to continue animating and if its visible
  if (scrollSvgObj.isActive && scrollSvgObj.isObservable) {
    scrollSvgObj.animationFrame = requestAnimationFrame(function () {
      runAnimationFrame(scrollSvgObj)
    })
  } else {
    cancelAnimationFrame(scrollSvgObj.animationFrame)
  }
}

/**
 * An empty replica class of scrollSvgClass that is returned when the initial input (the SVG path or options) is invalid
 */
export class ScrollSvgEmptyClass implements ScrollSvgInterface {
  svgPath: SVGPathElement
  options: OptionsComplete = defaultOptions
  animationFrame: number = 0
  prevBoundingRectTop: number = 0
  isActive: boolean = true
  isObservable: boolean = true
  // observer: IntersectionObserver

  constructor() {
    console.error('Scroll Svg Class Empty ~ Seems to be an error with your input.')
    this.svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    // this.observer = new IntersectionObserver(function () {})
  }
  animate() {}
  stopAnimating() {}
  redraw() {}
  changeOptions(userOptions: Options) {
    return false
  }
  changeSvgPath(newSvgPath: SVGPathElement) {
    return false
  }
  getOptions() {
    return defaultOptions
  }
  getSvgPath() {
    console.error('Invalid input to scrollSvg. Returning an empty SVGPathElement.')
    return this.svgPath
  }
  getPercentageDrawn() {
    return 0
  }
  clear() {}
  fill() {}
  remove() {}
}
