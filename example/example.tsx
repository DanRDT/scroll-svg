// Example React Code

import { useEffect, useState } from 'react'
import scrollSvg from 'scroll-svg'

const ScrollDemo = () => {
  useEffect(() => {
    const svgPath = document.querySelector('#scroll-line') as SVGPathElement
    //                                only for typescript  ^^^^^^^^^^^^^^^^^
    const scrolledSvg = scrollSvg(svgPath)
    return () => {
      scrolledSvg.stopAnimating()
    }
  }, [])

  return (
    <section className='svg-section'>
      <svg viewBox='0 0 476 927' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          id='scroll-line'
          d='M238.458 4C238.458 4 240 28.1667 245 52.5C250 76.8333 276.758 123.7 369.958 160.5C407.458 175.307 455.501 200.5 464.501 258C468.444 283.193 462 334 424 366C390.211 394.454 302.972 416.847 238.458 436C142.458 464.5 121 471.14 65.5 516C46 531.762 18.5001 559 6.99998 605C-1.63757 639.55 11.4091 672 29 693.5C65 737.5 107.235 746.5 147.5 762.5C187.765 778.5 199 786.5 199 786.5C237.5 811 238.458 860.5 238.458 860.5V916.5'
          stroke='url(#paint0_linear_2_3)'
          strokeWidth='8'
          strokeLinecap='round'
        />
        <defs>
          <linearGradient
            id='paint0_linear_2_3'
            x1='199.027'
            y1='-6.29894e-06'
            x2='285.693'
            y2='1203'
            gradientUnits='userSpaceOnUse'>
            <stop stopColor='#F87D37' />
            <stop offset='1' stopColor='#FBAA23' />
          </linearGradient>
        </defs>
      </svg>
    </section>
  )
}
