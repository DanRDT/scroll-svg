import { OptionalOptions, Options } from "../types"

// returns true if valid SVGPathElement
export function validSvgPath(svgPath: SVGPathElement): Boolean {
  // check if svgPath is a path
  if (svgPath === null) {
    console.error(`SVG Path not found ~ Check id or class name`)
    return false
  } else if (svgPath.tagName !== "path") {
    console.error(`${svgPath.outerHTML} is not a path`)
    return false
  } else if (svgPath.getTotalLength() === 0) {
    console.error(`${svgPath.outerHTML} has no length`)
    return false
  }
  return true
}

export function validateOptions(options: Options, userOptions: OptionalOptions): number {
  let errors = 0
  try {
    // check keys
    Object.keys(options).map((key) => {
      switch (key) {
        case "invert":
        case "draw_origin":
        case "offset":
        case "speed":
        case "undraw":
          break
        default:
          console.error(`Invalid option ~ '${key}'`)
          errors++
      }
    })

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
      (typeof options.draw_origin !== "number" || Number.isNaN(options.draw_origin))
    ) {
      console.error(
        `Invalid draw_origin option. Must be 'center', 'top', or 'bottom' or a number. Is currently ~ ${options.draw_origin}`
      )
      errors++
    }

    if (typeof options.draw_origin === "number" && options.draw_origin < 0) {
      console.error(
        `Invalid draw_origin option. Must be a number greater than or equal to 0. Is currently ~ ${options.draw_origin}`
      )
      errors++
    } else if (typeof options.draw_origin === "number" && options.draw_origin > 1) {
      console.error(
        `Invalid draw_origin option. Must be a number less than or equal to 1. Is currently ~ ${options.draw_origin}`
      )
      errors++
    }

    // Check offset
    if (typeof options.offset !== "number" || Number.isNaN(options.offset)) {
      console.error(`Invalid offset option. Must be a number. Is currently ~ ${options.offset}`)
      errors++
    }

    // Check speed
    if (typeof options.speed !== "number" || options.speed <= 0 || Number.isNaN(options.speed)) {
      console.error(`Invalid speed option. Must be a number greater than 0. Is currently ~ ${options.speed}`)
      errors++
    }

    // Check undraw
    if (typeof options.undraw !== "boolean") {
      console.error(`Invalid undraw option. Must be a boolean. Is currently ~ ${options.undraw}`)
      errors++
    }

    if (errors > 0) {
      console.error(`Found ${errors} errors in animation options ~ ${JSON.stringify(userOptions)}`)
    }
  } catch (error) {
    console.error(`Error validating options ~ ${error}`)
    errors++
  }
  return errors
}
