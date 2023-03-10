import scrollSvg from "../src/index"

const svg1 = document.querySelector("#scroll-line-1") as SVGPathElement
const svg2 = document.querySelector("#scroll-line-2") as SVGPathElement
const svg3 = document.querySelector("#scroll-line-3") as SVGPathElement
const svg4 = document.querySelector("#scroll-line-4") as SVGPathElement

// scrollSVG(svg1, { invert: true, draw_origin: 0.5, speed: 1.05, reverse: true })
// scrollSVG(svg2, { draw_origin: 0.5 })
// scrollSVG(svg3)

const svg10 = scrollSvg(svg1, { invert: true })
const svg20 = scrollSvg(svg2)
const svg30 = scrollSvg(svg3)
const svg40 = scrollSvg(svg4)

svg10.removeListener()
svg10.addListener()

// svg40.removeListener()
