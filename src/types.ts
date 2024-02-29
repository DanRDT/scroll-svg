export type OptionalOptions = {
  /**
   * The `invert` option inverts which direction the svg draws from. Sometimes an svg draws backwards by default and the `invert` option is required to correct it.
   *
   * Valid Values: `true` or `false`.
   *
   * Default Value: `false`.
   */
  invert?: boolean
  /**
   * The `draw_origin` option controls at which point on the screen the svg gets drawn, with `0` being the **top** of the screen and `1` being the **bottom**. By default it draws from the `center` of the screen or at `0.5`. The option takes the values `top` which is `0.25`, `center` which is `0.5`, `bottom` which is `0.75`, or any decimal between `0` and `1`.
   *
   * Valid Values: `top`, `center`, `bottom`, or any decimal from `0` to `1`
   *
   * Default Value: `center`
   */
  draw_origin?: 'top' | 'center' | 'bottom' | number
  /**
   * The `offset` option allow you to offset the svg drawing from the `draw_origin` by a set amount of **pixels**. This is useful if you want to draw the svg before it reaches the `draw_origin` or after it passes it. It takes any number as a value. If the value is negative, the svg will be drawn the `offset` amount of pixels behind the `draw_origin` and if the value is positive, the svg will be ahead the `draw_origin` by the `offset` amount. So if you want to draw the svg 100 pixels before the `draw_origin`, you would use `-100` as the value.
   *
   * Valid Values: any `number`, positive or negative
   *
   * Default Value: `0`
   */
  offset?: number
  /**
   * The `speed` option allows you to control the speed at which the svg is drawn. It takes any number above **zero** as a value. The higher the number, the faster the svg will be drawn. The default value is `1` which is the normal speed. If you want to draw the svg half as fast, you would use `0.5` as the value. It is useful if you want to draw multiple SVGs at different speeds or if you want to draw the svg slower or faster than normal.
   *
   * Valid Values: any `number` above 0
   *
   * Default Value: `1`
   */
  speed?: number
  /**
   * The `undraw` option allows you to control whether the svg will be drawn or undrawn on scroll. If the value is `true`, the svg will be undrawn on scroll. If the value is `false`, the svg will be drawn on scroll. The default value is `false` which means the svg will be drawn on scroll. It is useful if you want to draw the svg on scroll but undraw it when the user scrolls back up. (Use the `.changeOptions()` for that)
   *
   * Valid Values: `true` or `false`
   *
   * Default Value: `false`
   */
  undraw?: boolean
}

export type Options = Required<OptionalOptions>

export interface ScrollSvgClass {
  /**
   * The SVG Path being animated
   */
  svgPath: SVGPathElement
  /**
   * The current options
   */
  options: Options
  /**
   * Used in the animationFrame function
   */
  animationFrame: number
  /**
   * Used for performance when deciding wether or not to recalculated the SVG Path
   */
  prevBoundingRectTop: number
  /**
   * Whether the SVG is currently being animated
   */
  isActive: boolean
  /**
   * Whether the SVG Path is currently observed by the IntersectionObserver. Has a 50px buffer.
   */
  isObservable: boolean
  /**
   * An instance of an IntersectionObserver. Used for performance.
   */
  // observer: IntersectionObserver

  /**
   * To continue the svg path animation after it was stopped, use the .animate() method on the scrollSvg object.
   */
  animate(): void
  /**
   * To stop the svg path animation, use the .stopAnimating() method on the scrollSvg object.
   */
  stopAnimating(): void
  /**
   * To redraw the svg, use the `.redraw()` method on the scrollSvg object. This is useful if want the svg to be redrawn before next scroll event.
   */
  redraw(): void
  /**
   * To change the options after initialization, use the `.changeOptions()` method on the scrollSvg object. This can be useful if you want to change the options after the user has scrolled to a certain point. For example, if you want to change the `undraw` option to `true` after the user has scrolled past the svg and have the svg follow the user as they scroll back up.
   *
   * The `.changeOptions()` method also returns `true` if the options were changed successfully and `false` if they were not. Also, the svg won't be redrawn until the next scroll event. So if you you want the svg to be updated with the new options immediately, you can use the `.redraw()` method.
   * @param userOptions
   */
  changeOptions(userOptions: OptionalOptions): boolean
  /**
   * To change the svg path after initialization, use the `.changeSvgPath()` method on the scrollSvg object. This can be useful if you want to change the svg path being drawn after the user has scrolled to a certain point.
   *
   * The `.changeSvgPath()` method also returns `true` if the svg path was changed successfully and `false` if it was not. Also, the svg won't be redrawn until the next scroll event. So if you you want the svg to be updated with the new options immediately, you can use the `.redraw()` method.
   * @param userOptions
   */
  changeSvgPath(newSvgPath: SVGPathElement): boolean
  /**
   * Get the current options
   */
  getOptions(): Options
  /**
   * This returns the svg path element that was passed to `scrollSVG`.
   */
  getSvgPath(): SVGPathElement
  /**
   * To get the percentage of the svg path that has been drawn, use the `.getPercentage()` method on the scrollSvg object. This returns a number between `0` and `100`. The percentage doesn't take into account the `offset` option, so if the svg is drawn 50% of the way and the `offset` is 100 pixels, the percentage will still be 50%. Also note that the if undraw is `true`, the percentage will still reflect the percentage of the svg path that has been drawn, not the percentage of the svg that has been scrolled past.
   */
  getPercentageDrawn(): number
  /**
   * This makes the svg path disappear. It will be draw again when the user scrolls, so use `stopAnimating()` if you don't want it to be drawn again.
   */
  clear(): void
  /**
   * This draws the svg path completely. It will be drawn back to the scroll position when the user scrolls, so use `stopAnimating()` if you don't want it to be drawn back to the scroll position.
   */
  fill(): void
  /**
   * Use the `.remove()` method to delete any listeners for the svg path. This is useful if you want to stop animating the svg path when the component unmounts.
   */
  remove(): void
}
