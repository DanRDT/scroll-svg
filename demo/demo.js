import scrollSvg from "../dist/index.mjs"

const svg1 = document.querySelector("#scroll-line-1")
const svg2 = document.querySelector("#scroll-line-2")
const svg3 = document.querySelector("#scroll-line-3")
const svg4 = document.querySelector("#scroll-line-4")

scrollSvg(svg1, { invert: true })
scrollSvg(svg2)
scrollSvg(svg3)
// scrollSvg(svg4, { invert: true })
