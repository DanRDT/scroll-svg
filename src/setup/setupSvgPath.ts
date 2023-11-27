export function setupSvgPath(svgPath: SVGPathElement): void {
  const svgPathLength = svgPath.getTotalLength()
  svgPath.style.strokeDasharray = svgPathLength + ' ' + svgPathLength
  svgPath.style.strokeDashoffset = svgPathLength + ''
}
