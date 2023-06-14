import changeTransition from "./changeTransition"

export default function setupSvgPath(svgPath: SVGPathElement): void {
  const svgPathLength = svgPath.getTotalLength()
  svgPath.style.strokeDasharray = svgPathLength + " " + svgPathLength
  svgPath.style.strokeDashoffset = svgPathLength + ""

  changeTransition(svgPath)
}
