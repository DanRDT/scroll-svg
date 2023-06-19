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

Check out the interactive [demo](https://pulber.dev/scroll-svg/).

---

---

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

To draw the svg path, import `scrollSvg` and pass the svg path element to `scrollSvg`.

```javascript
import scrollSvg from 'scroll-svg'

const svgPath = document.querySelector('#scroll-line')
const svg = scrollSvg(svgPath)
```

### Typescript

To use with Typescript, change it from the implicit `Element|null` to `SVGPathElement` type before passing it to `scrollSvg`.

```typescript
const svgPath = document.querySelector('#scroll-line') as SVGPathElement
//                                                     ^^^^^^^^^^^^^^^^^
```

### Stop the animation

To stop the svg path animation, use the .stopAnimating() method on the svg object.

```javascript
svg.stopAnimating()
```

### Reactivate the animation

To continue the svg path animation after it was stopped, use the .animate() method on the svg object.

```javascript
svg.animate()
```

## Recommendations

Based on the svg you are using, you may need to add some css like this to make it draw smoother.

```css
#scroll-line {
  transition: stroke-dashoffset 20ms ease-in-out;
}
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

## Changing options after initialization

To change the options after initialization, use the `.changeOptions()` method on the svg object. This can be useful if you want to change the options after the user has scrolled to a certain point. For example, if you want to change the `undraw` option to `true` after the user has scrolled past the svg and have the svg follow the user as they scroll back up.

```javascript
svg.changeOptions({ undraw: true })
```

The `.changeOptions()` method also returns `true` if the options were changed successfully and `false` if they were not. Also, the svg won't be redrawn until the next scroll event. So if you you want the svg to be updated with the new options immediately, you can use the `.redraw()` method.

---

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

---

<br/>

# Other Methods

## Redraw the svg

To redraw the svg, use the `.redraw()` method on the svg object. This is useful if want the svg to be redrawn before next scroll event.

```javascript
svg.redraw()
```

## Get the percentage of the svg path that has been drawn

To get the percentage of the svg path that has been drawn, use the `.getPercentage()` method on the svg object. This returns a number between `0` and `100`. The percentage doesn't take into account the `offset` option, so if the svg is drawn 50% of the way and the `offset` is 100 pixels, the percentage will still be 50%. Also note that the if undraw is `true`, the percentage will still reflect the percentage of the svg path that has been drawn, not the percentage of the svg that has been scrolled past.

```javascript
const percentage = svg.getPercentageDrawn()
```

## Get the current options

```javascript
const currentOptions = svg.getOptions()
```

## Get the svg path

This returns the svg path element that was passed to `scrollSvg`.

```javascript
const currentSvgPath = svg.getSvgPath()
```

## Clear the svg path

This makes the svg path disappear. It will be draw again when the user scrolls, so use `stopAnimating()` if you don't want it to be drawn again.

```javascript
svg.clear()
```

## Draw the svg path completely

This draws the svg path completely. It will be drawn back to the scroll position when the user scrolls, so use `stopAnimating()` if you don't want it to be drawn back to the scroll position.

```javascript
svg.fill()
```

## Delete any listeners for the svg path

Use the `.remove()` method to delete any listeners for the svg path. This is useful if you want to stop animating the svg path when the component unmounts.

```javascript
svg.remove()
```

<br/>

---

<br/>

---

<br/>

# Other

## Nullable Scroll Svg

`scrollSvgNullable()` can be used if you want to detect if something went wrong in the setup with the options or svg path. It either returns `ScrollSvgClass` used to control how and when the svg is drawn or it returns `null` if the input is invalid.

```javascript
import { scrollSvgNullable } from 'scroll-svg'

const svgPath = document.querySelector('#scroll-line')
const svg = scrollSvgNullable(svgPath)

if (!svg) {
  // do something
}
```

<br/>

### `scrollSvg()` vs `scrollSvgNullable()`

`scrollSvg()` returns either `ScrollSvgClass` or `scrollSvgEmptyClass` if the input is invalid.

`scrollSvgNullable()` returns either `ScrollSvgClass` or `null` if the input is invalid.

The `ScrollSvgClass` is used to control how and when the svg is drawn

The `scrollSvgEmptyClass` is identical to the `scrollSvgClass`, so it wont throw errors when `scrollSvgClass` methods are called.
All functions performed on `scrollSvgEmptyClass` are performed on a dummy SVG path.

<br/>

## Using ScrollSvg with React

To use ScrollSvg with React, you can use the `useEffect` hook to start animating when the component mounts and stop when the component unmounts. Everything else is the same as the examples above.

```javascript
useEffect(() => {
  const svgPath = document.querySelector('#scroll-line')
  const svg = scrollSvg(svgPath)

  return () => svg.remove()
}, [])
```
