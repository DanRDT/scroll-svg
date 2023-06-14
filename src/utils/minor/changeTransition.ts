export default function changeTransition(svgPath: SVGPathElement): void {
  const svgPathLength = svgPath.getTotalLength()
  svgPath.style.strokeDasharray = svgPathLength + " " + svgPathLength
  svgPath.style.strokeDashoffset = svgPathLength + ""

  if (svgPath.style.transition === "") {
    console.log("empty")
    svgPath.style.transition = " "
  }

  svgPath.style.transition = `${svgPath.style.transition}, stroke-dashoffset 25ms ease-in-out`
  // svgPath.style.transition = `all 50ms ease, stroke-dashoffset 25ms ease-in-out`

  const regex = new RegExp("stroke-dashoffset")
  if (regex.test(svgPath.style.transition)) {
    console.log("true")
  }
  console.log(svgPath.style.transition)
}
