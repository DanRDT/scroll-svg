# scroll-svg

[![npm version](https://badge.fury.io/js/scroll-svg.svg)](https://badge.fury.io/js/scroll-svg)
[![npm](https://img.shields.io/npm/dt/scroll-svg)](https://www.npmjs.com/package/scroll-svg)
![GitHub issues](https://img.shields.io/github/issues/DanRDT/scroll-svg)
![GitHub stars](https://img.shields.io/github/stars/DanRDT/scroll-svg)
![GitHub license](https://img.shields.io/github/license/DanRDT/scroll-svg)
![GitHub last commit](https://img.shields.io/github/last-commit/DanRDT/scroll-svg)
![GitHub contributors](https://img.shields.io/github/contributors/DanRDT/scroll-svg)

Scroll SVG is a library that allows you to effortlessly animate/draw SVG paths on scroll. It is lightweight and easy to use. It provides a simple API that allows you to easily control the animation of the SVG path. It can be used with any number of SVG paths on a page. It is also compatible with Typescript.

Setup is as simple as adding an id to the path element of the svg and passing the element to the `scrollSvg` function. The rest of the docs will show you how to use the library, including the `options` parameter.

Check out the interactive [demo](https://pulber.dev/scroll-svg) or the [example code](https://github.com/DanRDT/scroll-svg/tree/main/example).

Full Docs at [Github](https://github.com/DanRDT/scroll-svg)

---

---

# Table of Contents

- [Setup](#setup)

  - [HTML](#html)
  - [Install](#install)
    - [Package manager](#package-manager)
    - [CDN](#cdn)
      - [ESM](#esm)
      - [ES5](#es5)
  - [Animate the SVG](#animate-the-svg)

- [Options](#options)

  - [Using the options](#using-the-options)
  - [Invert](#invert)
  - [Draw Origin](#draw-origin)
  - [Offset](#offset)
  - [Speed](#speed)
  - [Undraw](#undraw)

- [Full Docs](https://github.com/DanRDT/scroll-svg)

<br/>

# Setup

## Html

First add an id to the path of the svg you wish to draw on scroll

```html
<svg viewBox="0 0 9 699" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path id="scroll-line" d="M4.95758 ...... 694.5V4" />
  <!--  ^ add id to path element, not the svg -->
</svg>
```

## Install

There are two options for installing and using `scroll-svg`, a package manager or a CDN.

### Package manager

Use the package manager of your choice to download.

```
npm i scroll-svg
-
pnpm add scroll-svg
-
yarn add scroll-svg
```

### CDN

To include scroll-svg via a CDN there are 2 options, ES modules/ES6 or a global variable for ES5.

#### ESM

Set the script tag to the type of `module`

```html
<script type="module"></script>
```

Then import the package from [UNPKG](unpkg.com)

```javascript
import scrollSvg from 'https://unpkg.com/scroll-svg@0.0.0'
//                                  Specify Version ^^^^^
```

For version `1.4.1` and earlier include `/dist/index.mjs` after the version number to specify the module version (The module version is default for version `1.4.2` and later). For more details visit [unpkg.com](unpkg.com).

#### ES5

To include scroll-svg as a global variable, add a script tag with a link to the package. Be sure to specify the version and include `/dist/index.js` after the version number to receive the ES5 version instead ESM version.

```html
<script
  src="https://www.unpkg.com/scroll-svg@1.4.3/dist/index.js"
  integrity="sha384-LRr93rGItc2/gUgXJu434UFUQlJQY1atK+qpkfMvd3nA6D97e3tculDDFsoGyuH8"
  crossorigin="anonymous"></script>
```

To generate an integrity hash, use [srihash.org](https://www.srihash.org/).

Then destructure the global variable `$_scrollSvg` to access the `scroll-svg` functions.

```javascript
const { default: scrollSvg, scrollSvgNullable } = $_scrollSvg
//                            ^^^Optional^^^
```

The ES5 CDN option is only available for version `1.4.3` and later.

## Animate the SVG

To draw the svg path, import `scrollSvg` and pass the svg path element to `scrollSvg`.

```javascript
import scrollSvg from 'scroll-svg'

const svgPath = document.querySelector('#scroll-line')
const svg = scrollSvg(svgPath)
```

<br/>

---

<br/>

---

<br/>

# Options

These are the default options.

```javascript
const options = {
  invert: false,
  draw_origin: 'center',
  offset: 0,
  speed: 1,
  undraw: false,
}
```

## Using the options

Pass the options as the second argument to `scrollSvg`.

```javascript
const svg = scrollSvg(svgPath, options)
```

It is not required to use all of the options. You can pass just the options you need and leave the others out like in the example below.

```javascript
const svg = scrollSvg(svgPath, { invert: true, draw_origin: 'center' })
```

## Invert

The `invert` option inverts which direction the svg draws from. Sometimes an svg draws backwards by default and the `invert` option is required to correct it.
<br/>
<br/>
Valid Values: `true` or `false`
<br/>
Default Value: `false`

---

## Draw Origin

The `draw_origin` option controls at which point on the screen the svg gets drawn, with `0` being the **top** of the screen and `1` being the **bottom**. By default it draws from the `center` of the screen or at `0.5`. The option takes the values `top` which is `0.25`, `center` which is `0.5`, `bottom` which is `0.75`, or any decimal between `0` and `1`.
<br/>
<br/>
Valid Values: `top`, `center`, `bottom`, or any decimal from `0` to `1`
<br/>
Default Value: `center`

---

## Offset

The `offset` option allow you to offset the svg drawing from the `draw_origin` by a set amount of **pixels**. This is useful if you want to draw the svg before it reaches the `draw_origin` or after it passes it. It takes any number as a value. If the value is negative, the svg will be drawn the `offset` amount of pixels behind the `draw_origin` and if the value is positive, the svg will be ahead the `draw_origin` by the `offset` amount. So if you want to draw the svg 100 pixels before the `draw_origin`, you would use `-100` as the value.
<br/>
<br/>
Valid Values: any `number`, positive or negative
<br/>
Default Value: `0`

---

## Speed

The `speed` option allows you to control the speed at which the svg is drawn. It takes any number above **zero** as a value. The higher the number, the faster the svg will be drawn. The default value is `1` which is the normal speed. If you want to draw the svg half as fast, you would use `0.5` as the value. It is useful if you want to draw multiple SVGs at different speeds or if you want to draw the svg slower or faster than normal.
<br/>
<br/>
Valid Values: any `number` above 0
<br/>
Default Value: `1`

---

## Undraw

The `undraw` option allows you to control whether the svg will be drawn or undrawn on scroll. If the value is `true`, the svg will be undrawn on scroll. If the value is `false`, the svg will be drawn on scroll. The default value is `false` which means the svg will be drawn on scroll. It is useful if you want to draw the svg on scroll but undraw it when the user scrolls back up. (Use the `.changeOptions()` for that)
<br/>
<br/>
Valid Values: `true` or `false`
<br/>
Default Value: `false`

<br/>

---

<br/>

Full Documention can be found on the [Github](https://github.com/DanRDT/scroll-svg) page.
