# scroll-svg

A library to make animating SVGs on scroll easier.

This library is in the alpha stage of development.

---

## Setup

First add an id to the path of the svg you wish to draw on scroll

```html
<svg viewBox="0 0 9 699" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path id="scroll-line" d="M4.95758 ...... 694.5V4" />
  <!--  ^ add id to path element, not the svg -->
</svg>
```

## Install the package

Use the package manager of your choice to download.

```
npm i scroll-svg
-
pnpm add scroll-svg
-
yarn add scroll-svg
```

## Animate the SVG

To draw the svg path, import `scrollSVG` and pass the svg path element to `scrollSVG`.

```javascript
import scrollSVG from "scroll-svg"

const svg = document.querySelector("#scroll-line")
scrollSVG(svg)
```

### Typescript

To use with Typescript, change it from the implicit `Element|null` to `SVGPathElement` type before passing it to `scrollSVG`.

```typescript
const svg = document.querySelector("#scroll-line") as SVGPathElement
//                                                 ^^^^^^^^^^^^^^^^^
```

---

## Options

These are the default options. Currently only `invert` and `draw_origin` are supported.

```javascript
const options = {
  invert: false,
  draw_origin: "center",
  offset_type: "none", //planned
  offset_value: 0, //planned
  speed: 1, //planned
}
```

## Using the options

```javascript
scrollSVG(svg, options)
```

It is not required to use all of the options. You can pass just the options you need and leave the others out.

```javascript
scrollSVG(svg, { invert: true, draw_origin: "center" })
```

---

### Invert Option

The `invert` option inverts which direction the svg draws from. Sometimes an svg draws backwards by default and the `invert` option is required to correct it.
<br/>
<br/>
Valid Values: `true` or `false`
<br/>
Default Value: `false`

---

### Draw Origin Option

The `draw_origin` option controls at which point on the screen the svg gets drawn, with `0` being the **top** of the screen and `1` being the **bottom**. By default it draws from the `center` of the screen or at `0.5`. The option takes the values `top` which is `0.25`, `center` which is `0.5`, `bottom` which is `0.75`, or any decimal between `0` and `1`.
<br/>
<br/>
Valid Values: `top`, `center`, `bottom`, or any decimal from `0` to `1`
<br/>
Default Value: `center`
