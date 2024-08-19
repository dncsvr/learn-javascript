# matter.js

Here you'll find some matter.js examples along with how to set it up within a
vue project.

## Notes

- We use `browserify` to have a node-like experience for vanilla javascript
  pages. Check out [](./package.json) to see how to build a js file.
- Create a `<canvas id="..." />` and use `canvas` option during `Render.create`
  to have a better control. Otherwise matter.js creates canvas element by
  itself.
- bind dom to a body in matter js by applying css transformations on each update
  of matter js
- use `pointer-events: none` to pass overlaying div events to the canvas behind
- manually sync dom and matter js when using vue via `onMounted` and
  `onUpdated`.
