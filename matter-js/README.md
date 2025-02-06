# Matter.js

Here you'll find some Matter.js examples along with instructions on how to set
it up within a Vue project.

## Project Setup

This project uses a simple `index.html` file and separate `.js` files for each
JavaScript class, along with a `Program.js` file to give a .NET-like feel.
With Vite, JavaScript files are executed in a modular way and bundled
automatically.

> [!NOTE]
>
> A full Vue project would use `.vue` files, but here we kept things simple to
> focus on Matter.js.

As always, we used `vite` to serve static files locally. Check out
[`package.json`](./package.json) for the details.

## Canvas for Matter World

Matter.js uses a `<canvas>` element to render its content. It has the option to
create the canvas element itself, but we used an existing element to control its
`z-index` and other styles if necessary.

## The Demo World

The [`DemoWorld`](./DemoWorld.js) class is responsible for creating the Matter
world and holds the instances of the `Engine`, `Render`, and `Runner` classes
that come from Matter.js. It creates a frame using the [`Frame`](./Frame.js)
class, which puts four static edges around the canvas to keep the moving bodies
within the visible area.

For the sake of further investigation, we created the [`Balloon`](./Balloon.js)
class, which represents a composite object with two sub-bodies and a constraint
that binds the two bodies together. This composite body also registers a
`beforeUpdate` event to apply a continuous force calculated using its y-position
to create the effect of a balloon pulling its lower body upwards.

## Binding Vue.js to Matter.js

Matter.js bodies are graphical objects drawn onto a canvas. If you want to have
a DOM element behave like a physical body, this is not a feature that Matter.js
provides.

To create this connection, we created a `<div class="container">` element, which
is aligned directly on top of the canvas we created earlier. This container div
belongs to the Vue app.

We also created [`DomBody`](./DomBody.js), which is responsible for syncing DOM
elements from the Vue world to physical bodies in the Matter world. To achieve
this, it searches all elements with the `matter` class and adds a corresponding
invisible body, which we call the backing body, to the Matter world.

> [!NOTE]
>
> Bodies in Matter.js use the center as the position, while DOM elements use the
> top-left as the position. To see how we made the correct transformation, check
> out the `syncBody2Dom()` function in [`DomBody`](./DomBody.js). Also, the
> `transformOrigin` style should be set to `center center` to get the rotation
> right; otherwise, CSS rotation is applied using the top-left position of the
> DOM element, whereas Matter.js uses the center to calculate rotation.

> [!NOTE]
>
> The margin of a DOM element should be set to zero since it has no effect in
> the DOM but causes a miscalculation of the element's position.

### Syncing Matter to DOM

On every `beforeUpdate` event of Matter.js, [`DomBody`](./DomBody.js) uses the
backing body's position and angle to set the corresponding DOM element's style.
This way, whenever the backing body's position and angle are updated, they are
synced with the DOM element's position and angle.

### Syncing DOM to Matter

To create new backing bodies for newly created DOM elements, we register with
the `onUpdated` event of the Vue lifecycle. This way, whenever something changes
in the DOM world, it is synced with the Matter world.

This sync operation involves:

- Removing the backing bodies of removed DOM elements,
- Adding new backing bodies for added DOM elements, and
- Scaling existing backing bodies to fit the new size of their DOM elements.

> [!NOTE]
>
> [`DomBody`](./DomBody.js) also uses the `transitionend` event of the DOM
> element in case there is a size change due to a CSS transition. If you don't
> do this, the `update` event of Vue only provides the size of the DOM element
> at the moment of the `update` event, which might change due to a CSS
> transition, causing the backing body's size to be out of sync with its DOM
> element.

### Forwarding Events

Now that we have a `<div>` in front of the `<canvas>`, it is impossible for the
canvas to capture mouse events from the user. To achieve this, we forwarded the
`mouseup`, `mousedown`, and `mousemove` events from the div to the canvas
manually using the `dispatchEvent` method of the canvas element. This way, it is
possible to allow the user to drag and drop DOM elements as if they were
physical bodies while still being able to register a click event or apply CSS
`:hover` styles as if they were regular DOM elements.

> [!NOTE]
>
> We used the `user-select: none` option to disable selecting texts while
> dragging the objects.
