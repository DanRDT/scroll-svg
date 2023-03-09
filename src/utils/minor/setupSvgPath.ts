export default function setupSvgPath(svgPath: SVGPathElement): void {
  // setup svgPath
  const svgPathLength = svgPath.getTotalLength()
  svgPath.style.strokeDasharray = svgPathLength + " " + svgPathLength
  svgPath.style.strokeDashoffset = 0 + ""
}
