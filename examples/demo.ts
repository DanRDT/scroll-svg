import drawOnScroll from "../src/index"

const svg1 = document.querySelector("#scroll-line-1") as SVGPathElement
const svg2 = document.querySelector("#scroll-line-2") as SVGPathElement
const svg3 = document.querySelector("#scroll-line-3") as SVGPathElement
const svg4 = document.querySelector("#scroll-line-4") as SVGPathElement

const drawSvg1 = drawOnScroll(svg1, { invert: true })
drawOnScroll(svg2)
drawOnScroll(svg3)
drawOnScroll(svg4)
