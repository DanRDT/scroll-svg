import { scrollSvgClass } from "../dist/index.mjs"

const svg1 = document.querySelector("#scroll-line-1")
const svg2 = document.querySelector("#scroll-line-2")
const svg3 = document.querySelector("#scroll-line-3")
const svg4 = document.querySelector("#scroll-line-4")

// scrollSVG(svg1, { invert: true, draw_origin: 0.5, speed: 1.05, reverse: true })
// scrollSVG(svg2, { draw_origin: 0.5 })
// scrollSVG(svg3)

const svg10 = new scrollSvgClass(svg1, { invert: true })
const svg20 = new scrollSvgClass(svg2)
const svg30 = new scrollSvgClass(svg3)
const svg40 = new scrollSvgClass(svg4)

svg10.removeListener()
svg10.addListener()
