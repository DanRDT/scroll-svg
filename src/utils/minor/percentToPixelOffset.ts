import { Options } from "../../types"

// gets the percent as a decimal that the svg should be drawn and converts it to a pixel offset
export default function percentToPixelOffset(percent: number, svgPath: SVGPathElement): number {
  // flips the percent from something like 0.3 to 0.7 and vise versa
  const adjustedPercent = 1 - percent
  const svgPathLength = svgPath.getTotalLength()
  return adjustedPercent * svgPathLength
}
