import { scrollSvgClass, scrollSvgClassEmpty } from "./scrollSvgClass"
import { Options, OptionalOptions } from "./types"
import { validateOptions, validSvgPath } from "./utils/inputValidation"

const defaultOptions: Options = {
  invert: false,
  draw_origin: "center",
  offset: 0,
  speed: 1,
  reverse: false, //TODO: implement reverse
}

export default function scrollSvg(svgPath: SVGPathElement, userOptions: OptionalOptions = defaultOptions) {
  // validate svgPath
  // if invalid returns true, the function returns an empty replica class of scrollSvgClass
  if (!validSvgPath(svgPath)) return new scrollSvgClassEmpty()

  // setup options
  const options: Options = { ...defaultOptions, ...userOptions }
  Object.freeze(options)

  // validate options
  if (validateOptions(options, userOptions) > 0) {
    return new scrollSvgClassEmpty()
  }

  return new scrollSvgClass(svgPath, options)
}
