import drawOnScroll from "../dist/index.mjs"

const svg1 = document.querySelector("#scroll-line-1")
const svg2 = document.querySelector("#scroll-line-2")
const svg3 = document.querySelector("#scroll-line-3")
const svg4 = document.querySelector("#scroll-line-4")

drawOnScroll(svg1, { invert: true, draw_origin: 0.3 })
drawOnScroll(svg2)
drawOnScroll(svg3)
drawOnScroll(svg4)
