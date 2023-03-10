import { scrollSvgClass, scrollSvgClassEmpty } from "./scrollSvgClass"
import { Options, OptionalOptions } from "./types"
import { validateOptions, checkSvgPath } from "./utils/inputValidation"

const defaultOptions: Options = {
  invert: false,
  draw_origin: "center",
  offset: 0,
  speed: 1,
  reverse: false,
}

export default function scrollSvg(svgPath: SVGPathElement, userOptions: OptionalOptions = defaultOptions) {
  // validate svgPath
  // if invalid returns true, the function returns an empty replica class of scrollSvgClass
  if (checkSvgPath(svgPath)) return new scrollSvgClassEmpty()

  // setup options
  const options: Options = { ...defaultOptions, ...userOptions }
  Object.freeze(options)

  // validate options
  const optionsErrors = validateOptions(options)
  if (optionsErrors > 0) {
    console.error(`Found ${optionsErrors} errors in animation options for ${svgPath.outerHTML}`)
    return new scrollSvgClassEmpty()
  }

  return new scrollSvgClass(svgPath, options)
}
