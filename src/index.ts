type Options = {
  invert: boolean
  offset: number
  speed: number
  scroll_origin: "top" | "center" | "bottom"
}

const defaultOptions: Options = {
  invert: false,
  offset: 0,
  speed: 1,
  scroll_origin: "center",
}

export default function scrollSvg(svgPath: SVGPathElement, options: Options = defaultOptions): void {
  // check if svgPath is a path
  if (svgPath === null) {
    return console.error("svgPath not found ~ check id or class")
  } else if (svgPath.tagName !== "path") {
    return console.error("svgPath is not a path")
  } else if (svgPath.getTotalLength() === 0) {
    return console.error("svgPath has no length")
  }

  options = { ...defaultOptions, ...options }

  // setup svgPath
  const svgPathLength = svgPath.getTotalLength()
  const svgStyle = svgPath.style
  svgStyle.strokeDasharray = svgPathLength + " " + svgPathLength
  svgStyle.strokeDashoffset = 0 + ""
  calcScrollLine()

  // setup scroll listener
  window.addEventListener("scroll", calcScrollLine)

  function calcScrollLine() {
    const percentToDraw = calcPercentToDraw(svgPath)
    let pixelOffset = percentToPixelOffset(percentToDraw, svgPath)

    if (options.invert) {
      pixelOffset = -pixelOffset
    }
    console.log(pixelOffset)

    svgStyle.strokeDashoffset = pixelOffset + ""
  }
}

// gets the percent as a decimal that the svg should be drawn and converts it to a pixel offset
function percentToPixelOffset(percent: number, svgPath: SVGPathElement): number {
  // flips the percent from something like 0.3 to 0.7 and vise versa
  const adjustedPercent = 1 - percent
  const svgPathLength = svgPath.getTotalLength()
  return adjustedPercent * svgPathLength
}

function calcPercentToDraw(svgPath: SVGPathElement): number {
  const height = window.innerHeight

  const svgTop = svgPath.getBoundingClientRect().top
  const svgHeight = svgPath.getBoundingClientRect().height

  let offsetPercentage = (-svgTop + height / 2) / svgHeight

  // Max out SVG
  if (offsetPercentage > 1) {
    offsetPercentage = 1
  } else if (offsetPercentage < 0) {
    offsetPercentage = 0
  }

  return offsetPercentage
}
