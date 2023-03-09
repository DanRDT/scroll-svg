import { Options } from "../types"

// returns true if invalid SVGPathElement
export function checkSvgPath(svgPath: SVGPathElement): Boolean {
  // check if svgPath is a path
  if (svgPath === null) {
    console.error(`SVG Path not found ~ Check id or class name`)
    return true
  } else if (svgPath.tagName !== "path") {
    console.error(`${svgPath.outerHTML} is not a path`)
    return true
  } else if (svgPath.getTotalLength() === 0) {
    console.error(`${svgPath.outerHTML} has no length`)
    return true
  }
  return false
}

export function validateOptions(options: Options): number {
  let errors = 0

  // Check invert
  if (typeof options.invert !== "boolean") {
    console.error(`Invalid invert option. Must be a boolean. Is currently ~ ${options.invert}`)
    errors++
  }

  // Check draw_origin
  if (
    options.draw_origin !== "top" &&
    options.draw_origin !== "center" &&
    options.draw_origin !== "bottom" &&
    typeof options.draw_origin !== "number"
  ) {
    console.error(
      `Invalid draw_origin option. Must be 'center', 'top', or 'bottom' or a number. Is currently ~ ${options.draw_origin}`
    )
    errors++
  }
  if (typeof options.draw_origin === "number" && options.draw_origin < 0) {
    console.error(
      `Invalid draw_origin option. Must be a number greater than 0. Is currently ~ ${options.draw_origin}`
    )
    errors++
  } else if (typeof options.draw_origin === "number" && options.draw_origin > 1) {
    console.error(
      `Invalid draw_origin option. Must be a number less than 1. Is currently ~ ${options.draw_origin}`
    )
    errors++
  }

  // Check offset
  if (typeof options.offset_value !== "number") {
    console.error(`Invalid offset option. Must be a number. Is currently ~ ${options.offset_value}`)
    errors++
  }
  if (typeof options.offset_type !== "string") {
    console.error(`Invalid offset_type option. Must be a string. Is currently ~ ${options.offset_type}`)
    errors++
  }
  if (options.offset_type !== "none" && options.offset_type !== "percent" && options.offset_type !== "pixel") {
    console.error(
      `Invalid offset_type option. Must be 'none', 'percent', or 'pixels'. Is currently ~ ${options.offset_type}`
    )
    errors++
  }

  // Check speed
  if (typeof options.speed !== "number" || options.speed <= 0) {
    console.error(`Invalid speed option. Must be a number greater than 0. Is currently ~ ${options.speed}`)
    errors++
  }

  return errors
}
