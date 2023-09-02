// Example Javascript Code

import scrollSvg from '../dist/index.mjs'

const svgPath1 = document.querySelector('#scroll-line-1')
const svgPath2 = document.querySelector('#scroll-line-2')
const svgPath3 = document.querySelector('#scroll-line-3')
const svgPath4 = document.querySelector('#scroll-line-4')

const svg1 = scrollSvg(svgPath1)
const svg2 = scrollSvg(svgPath2, { draw_origin: 'bottom' })
const svg3 = scrollSvg(svgPath3, { offset: 150 })
const svg4 = scrollSvg(svgPath4, { undraw: true })
