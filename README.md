# scroll-svg

A library to make animating SVGs on scroll easier.

This library is in the alpha stage of development.

---

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

const svgPath = document.querySelector("#scroll-line")
const svg = scrollSVG(svgPath)
```

### Typescript

To use with Typescript, change it from the implicit `Element|null` to `SVGPathElement` type before passing it to `scrollSVG`.

```typescript
const svgPath = document.querySelector("#scroll-line") as SVGPathElement
//                                                     ^^^^^^^^^^^^^^^^^
```

### Stop the animation or remove the scroll event listener

To stop the svg path, use the .removeListener() method on the svg object.

```javascript
svg.removeListener()
```

### Reactivate the animation

To continue the svg path, use the .addListener() method on the svg object.

```javascript
svg.addListener()
```

---

---

## Options

These are the default options.

```javascript
const options = {
  invert: false,
  draw_origin: "center",
  offset: 0,
  speed: 1,
}
```

## Using the options

Pass the options as the second argument to `scrollSVG`.

```javascript
const svg = scrollSVG(svg, options)
```

It is not required to use all of the options. You can pass just the options you need and leave the others out like in the example below.

```javascript
const svg = scrollSVG(svg, { invert: true, draw_origin: "center" })
```

---

### Invert

The `invert` option inverts which direction the svg draws from. Sometimes an svg draws backwards by default and the `invert` option is required to correct it.
<br/>
<br/>
Valid Values: `true` or `false`
<br/>
Default Value: `false`

---

### Draw Origin

The `draw_origin` option controls at which point on the screen the svg gets drawn, with `0` being the **top** of the screen and `1` being the **bottom**. By default it draws from the `center` of the screen or at `0.5`. The option takes the values `top` which is `0.25`, `center` which is `0.5`, `bottom` which is `0.75`, or any decimal between `0` and `1`.
<br/>
<br/>
Valid Values: `top`, `center`, `bottom`, or any decimal from `0` to `1`
<br/>
Default Value: `center`

---

### Offset

The `offset` option allow you to offset the svg drawing from the `draw_origin` by a set amount of **pixels**. This is useful if you want to draw the svg before it reaches the `draw_origin` or after it passes it. It takes any number as a value. If the value is negative, the svg will be drawn the `offset` amount of pixels behind the `draw_origin` and if the value is positive, the svg will be ahead the `draw_origin` by the `offset` amount. So if you want to draw the svg 100 pixels before the `draw_origin`, you would use `-100` as the value.
<br/>
<br/>
Valid Values: any `number`, positive or negative
<br/>
Default Value: `0`

---

### Speed

The `speed` option allows you to control the speed at which the svg is drawn. It takes any number above **zero** as a value. The higher the number, the faster the svg will be drawn. The default value is `1` which is the normal speed. If you want to draw the svg half as fast, you would use `0.5` as the value. It is useful if you want to draw multiple svgs at different speeds or if you want to draw the svg slower or faster than normal.
<br/>
<br/>
Valid Values: any `number` above 0
<br/>
Default Value: `1`

---

---

## Using ScrollSvg with React

To use ScrollSvg with React, you can use the `useEffect` hook to add the scroll event listener and remove it when the component unmounts. Everything else is the same as the examples above.

```javascript
const svgPath = document.querySelector("#scroll-line")

useEffect(() => {
  const svg = scrollSVG(svgPath)
  return () => svg.removeListener()
}, [])
```