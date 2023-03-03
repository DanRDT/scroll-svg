export default function scrollSvg(svgPath: SVGPathElement): void {
  // const sectionOne = document.querySelector("#section-1")
  // const sectionTwo = document.querySelector("#section-2")
  // const sectionThree = document.querySelector("#section-3")
  // const sectionFour = document.querySelector("#section-4")

  // const svgPathLength = svgPath.getTotalLength() + ""

  // svgPath.style.strokeDasharray = `${svgPathLength} ${svgPathLength}`
  // svgPath.style.strokeDashoffset = svgPathLength

  // const scrollLinePath: SVGPathElement | null = document.querySelector("#scroll-line-2")

  if (svgPath === null) {
    console.error("svgPath not found ~ check id or class")
    return
  } else if (svgPath.tagName !== "path") {
    console.error("svgPath is not a path")
    return
  } else if (svgPath.getTotalLength() === 0) {
    console.error("svgPath has no length")
  }

  const scrollLinePathLength = svgPath.getTotalLength() //

  svgPath.style.strokeDasharray = scrollLinePathLength + " " + scrollLinePathLength
  svgPath.style.strokeDashoffset = scrollLinePathLength + ""

  const calcScrollLine = () => {
    let currentScrollPosition = document.documentElement.scrollTop
    let totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight

    const aboveHeight = calcHeightAbove(svgPath)
    const belowHeight = calcHeightBelow(svgPath)

    let adjustedTotalHeight = totalHeight - belowHeight
    let scrollPercentage = currentScrollPosition / adjustedTotalHeight

    // wait for section2 to appear
    let scrollPercentOffset = aboveHeight / 2 / adjustedTotalHeight

    //calculate amount to draw
    let offsetPercentage = scrollPercentage - scrollPercentOffset

    if (offsetPercentage > 1) {
      offsetPercentage = 1 // Max out SVG
    }

    let drawLength = scrollLinePathLength * offsetPercentage

    // draw in reverse
    svgPath.style.strokeDashoffset = scrollLinePathLength - drawLength + ""
  }

  window.addEventListener("scroll", calcScrollLine)
}

// height = element height
// width = element width
// left and right are distance from left and right of viewport
// x = left
// y = top

function calcHeightAbove(SVGPathElement: SVGPathElement): number {
  return Math.round(SVGPathElement.getBoundingClientRect().top + document.documentElement.scrollTop)
}

function calcHeightBelow(SVGPathElement: SVGPathElement): number {
  const totalHeight = document.documentElement.scrollHeight
  const heightToBottomOfElement =
    SVGPathElement.getBoundingClientRect().bottom + document.documentElement.scrollTop
  const heightBelow = totalHeight - heightToBottomOfElement

  return Math.round(heightBelow)
}
