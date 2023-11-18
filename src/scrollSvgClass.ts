import { defaultOptions } from './index'
import { OptionalOptions, Options, ScrollSvgClass } from './types'
import calcPercentToDraw from './utils/calcPercentToDraw'
import calcAndDrawScrollLine from './utils/calcAndDrawScrollLine'
import { validateOptions } from './utils/inputValidation'
import setupSvgPath from './utils/minor/setupSvgPath'

/**
 * The ScrollSvgClass used to control how and when the svg is drawn
 */
export class scrollSvgClass implements ScrollSvgClass {
  svgPath: SVGPathElement
  options: Options
  animationFrame: number = 0
  prevBoundingRectTop: number
  isActive: boolean = true
  isObservable: boolean = true
  // observer: IntersectionObserver

  constructor(svgPath: SVGPathElement, options: Options) {
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
    animationFrameFunc(this)
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
    animationFrameFunc(this)
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
    this.svgPath.style.strokeDashoffset = '0'
  }
  remove() {
    this.stopAnimating()
    // this.observer.disconnect()
    // this.isObservable = false
  }
}

const animationFrameFunc = (scrollSvgObj: scrollSvgClass) => {
  // check if user has scrolled if so, recalculate and redraw the scroll line
  if (scrollSvgObj.prevBoundingRectTop !== scrollSvgObj.svgPath.getBoundingClientRect().top) {
    calcAndDrawScrollLine(scrollSvgObj.svgPath, scrollSvgObj.options)
    scrollSvgObj.prevBoundingRectTop = scrollSvgObj.svgPath.getBoundingClientRect().top
  }
  // check if user still wishes to continue animating and if its visible
  if (scrollSvgObj.isActive && scrollSvgObj.isObservable) {
    scrollSvgObj.animationFrame = requestAnimationFrame(function () {
      animationFrameFunc(scrollSvgObj)
    })
  } else {
    cancelAnimationFrame(scrollSvgObj.animationFrame)
  }
}

/**
 * An empty replica class of scrollSvgClass that is returned when the initial input (the SVG path or options) is invalid
 */
export class scrollSvgEmptyClass implements ScrollSvgClass {
  svgPath: SVGPathElement
  options: Options = defaultOptions
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
  changeOptions() {
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
