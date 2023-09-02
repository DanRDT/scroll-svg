// Example Typescript Code

import scrollSvg from '../src/index'

const svgPath1 = document.querySelector('#scroll-line-1') as SVGPathElement
const svgPath2 = document.querySelector('#scroll-line-2') as SVGPathElement
const svgPath3 = document.querySelector('#scroll-line-3') as SVGPathElement
const svgPath4 = document.querySelector('#scroll-line-4') as SVGPathElement

const svg1 = scrollSvg(svgPath1)
const svg2 = scrollSvg(svgPath2, { draw_origin: 'bottom' })
const svg3 = scrollSvg(svgPath3, { offset: 100 })
const svg4 = scrollSvg(svgPath4, { undraw: true })
