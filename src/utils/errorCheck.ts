import { Options } from "../types"

// true if invalid SVGPathElement
export function checkSvgPath(svgPath: SVGPathElement): Boolean {
  // check if svgPath is a path
  if (svgPath === null) {
    console.error("svgPath not found ~ check id or class")
    return true
  } else if (svgPath.tagName !== "path") {
    console.error("svgPath is not a path")
    return true
  } else if (svgPath.getTotalLength() === 0) {
    console.error("svgPath has no length")
    return true
  }
  return false
}

export function validateOptions(options: Options): number {
  let errors = 0
  if (typeof options.speed !== "number" || options.speed <= 0) {
    console.error(
      `Invalid speed option. Must be a number greater than 0. Is currently - ${options.speed}`
    )
    errors++
  }
  if (typeof options.offset !== "number") {
    console.error(`Invalid offset option. Must be a number. Is currently - ${options.offset}`)
    errors++
  }
  if (typeof options.invert !== "boolean") {
    console.error(`Invalid invert option. Must be a boolean. Is currently - ${options.invert}`)
    errors++
  }
  if (typeof options.scroll_origin !== "string") {
    console.error(
      `Invalid scroll_origin option. Must be a string. Is currently - ${options.scroll_origin}`
    )
    errors++
  }
  if (
    options.scroll_origin !== "top" &&
    options.scroll_origin !== "center" &&
    options.scroll_origin !== "bottom"
  ) {
    console.error(
      `Invalid scroll_origin option. Must be 'center', 'top', or 'bottom. Is currently - ${options.scroll_origin}`
    )
    errors++
  }

  return errors
}
