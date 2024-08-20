# matter.js

Here you'll find some matter.js examples along with how to set it up within a
vue project.

## Notes

- We use `browserify` to have a node-like experience for vanilla javascript
  pages. Check out [](./package.json) to see how to build a js file.
- Create a `<canvas id="..." />` and use `canvas` option during `Render.create`
  to have a better control. Otherwise matter.js creates canvas element by
  itself.
- bind dom to a body and update dom element's position and rotation on each
  update of matter js so that dom element gets its physics from hidden backing
  body
  - use `pointer-events: none` to pass overlaying div events to the canvas
    behind to enable interaction with the body :thinking:
  - keep an array of body references to find removed element's corresponding
    bodies from matter world
  - create bodies from dom during `onMounted`
- manually sync dom and matter js when using vue during `onUpdated`.
  - use offset height and width to get dom element size
    - set margin to 0 to calculate body dimensions correctly
    - matter uses center for position, dom uses top left, to fix this create
      offset x and y using width and height / 2
  - scale backing body to match dom element size on every update
  - set angle to 0 before scaling to keep body size sync with dom element size
    and set angle back to original to keep it moving as it was
