type Options = {
  invert: boolean
}

const defaultOptions = {
  invert: false,
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

  const svgPathLength = svgPath.getTotalLength()
  svgPath.style.strokeDasharray = svgPathLength + " " + svgPathLength
  const dashOffset = svgPath.style

  dashOffset.strokeDashoffset = 0 + ""

  const calcScrollLine = () => {
    const percentToDraw = calcPercentToDraw(svgPath)
    let pixelOffset = percentToPixelOffset(percentToDraw, svgPath)

    if (options.invert) {
      pixelOffset = -pixelOffset
    }

    dashOffset.strokeDashoffset = pixelOffset + ""
  }

  window.addEventListener("scroll", calcScrollLine)
}

// function calcHeightAbove(SVGPathElement: SVGPathElement): number {
//   const heightAbove = SVGPathElement.getBoundingClientRect().top + document.documentElement.scrollTop
//   return Math.round(heightAbove)
// }

// function calcHeightBelow(SVGPathElement: SVGPathElement): number {
//   const totalHeight = document.documentElement.scrollHeight
//   const heightToBottomOfElement =
//     SVGPathElement.getBoundingClientRect().bottom + document.documentElement.scrollTop
//   const heightBelow = totalHeight - heightToBottomOfElement

//   return Math.round(heightBelow)
// }

// gets the percent as a decimal that the svg should be drawn and converts it to a pixel offset
function percentToPixelOffset(percent: number, svgPath: SVGPathElement): number {
  // flips the percent from something like 0.3 to 0.7 and vise versa
  const adjustedPercent = 1 - percent
  const svgPathLength = svgPath.getTotalLength()
  return adjustedPercent * svgPathLength
}

function calcPercentToDraw(svgPath: SVGPathElement): number {
  //TODO offset by client height

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

  console.log(offsetPercentage)

  return offsetPercentage
}
