export default function scrollSvg(svgPath: SVGPathElement): void {
  // const sectionOne = document.querySelector("#section-1")
  // const sectionTwo = document.querySelector("#section-2")
  // const sectionThree = document.querySelector("#section-3")
  // const sectionFour = document.querySelector("#section-4")

  // const svgPathLength = svgPath.getTotalLength() + ""

  // svgPath.style.strokeDasharray = `${svgPathLength} ${svgPathLength}`
  // svgPath.style.strokeDashoffset = svgPathLength

  // const scrollLinePath: SVGPathElement | null = document.querySelector("#scroll-line-2")
  const scrollLinePathLength = svgPath.getTotalLength() //

  svgPath.style.strokeDasharray = scrollLinePathLength + " " + scrollLinePathLength
  svgPath.style.strokeDashoffset = scrollLinePathLength + ""

  const calcScrollLine = () => {
    // if (sectionOne === null || sectionTwo === null || sectionThree === null || sectionFour === null) {
    //   console.error("section not found")
    //   return
    // }

    let currentScrollPosition = document.documentElement.scrollTop + document.body.scrollTop
    let totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight

    // let sectionOneHeight = sectionOne.clientHeight
    // let sectionThreeHeight = sectionThree.clientHeight
    // let sectionFourHeight = sectionFour.clientHeight

    // const aboveHeight = sectionOneHeight
    const aboveHeight = calcHeightAbove(svgPath)
    // const belowHeight = sectionThreeHeight + sectionFourHeight
    const belowHeight = calcHeightBelow(svgPath)

    let adjustedTotalHeight = totalHeight - belowHeight
    let scrollPercentage = currentScrollPosition / adjustedTotalHeight

    // wait for section2 to appear
    let scrollPercentOffset = aboveHeight / 2.3 / adjustedTotalHeight

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

function calcHeightAbove(SVGPathElement: SVGPathElement): number {
  // TODO: calculate height above
  return 0
}

function calcHeightBelow(SVGPathElement: SVGPathElement): number {
  // TODO: calculate height below
  return 0
}
