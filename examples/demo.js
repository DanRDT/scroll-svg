import drawOnScroll from "../dist/index.mjs"

const svg1 = document.querySelector("#scroll-line-1")
const svg2 = document.querySelector("#scroll-line-2")
const svg3 = document.querySelector("#scroll-line-3")
// const svg4 = document.querySelector("#scroll-line-4")

const drawSvg1 = drawOnScroll(svg1, { invert: false })
drawOnScroll(svg2)
drawOnScroll(svg3)
