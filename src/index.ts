export default function scrollSvg(svgPath: SVGPathElement): void {
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

  // svgPath.style.strokeDashoffset = svgPathLength + 1 + ""
  dashOffset.strokeDashoffset = 0 + ""

  const calcScrollLine = () => {
    const percentToDraw = calcPercentToDraw(svgPath)
    const pixelOffset = percentToPixelOffset(percentToDraw, svgPath)
    dashOffset.strokeDashoffset = pixelOffset + ""

    // let currentScrollPosition = document.documentElement.scrollTop
    // let totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    // const aboveHeight = calcHeightAbove(svgPath)
    // const belowHeight = calcHeightBelow(svgPath)
    // console.log(
    //   `Top: ${Math.round(svgPath.getBoundingClientRect().top)} Bottom: ${Math.round(
    //     svgPath.getBoundingClientRect().bottom
    //   )}`
    // )
    // find how far down the path you are using
    // let adjustedTotalHeight = totalHeight - belowHeight
    // let scrollPercentage = currentScrollPosition / adjustedTotalHeight
    // // wait for section2 to appear
    // let scrollPercentOffset = aboveHeight / 2 / adjustedTotalHeight
    // //calculate amount to draw
    // let offsetPercentage = scrollPercentage - scrollPercentOffset
    // if (offsetPercentage > 1) {
    //   offsetPercentage = 1 // Max out SVG
    // }
    // let drawLength = svgPathLength * offsetPercentage
    // // draw in reverse
    // svgPath.style.strokeDashoffset = svgPathLength - drawLength + ""
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
  const svgPathLength = svgPath.getTotalLength()
  return percent * svgPathLength
}

function calcPercentToDraw(svgPath: SVGPathElement): number {
  //TODO calculate the percentage of the svg to draw

  let offsetPercentage = 0.9

  // Max out SVG
  if (offsetPercentage > 1) {
    offsetPercentage = 1
  } else if (offsetPercentage < 0) {
    offsetPercentage = 0
  }

  // flip the percentage
  offsetPercentage = 1 - offsetPercentage
  return offsetPercentage
}
