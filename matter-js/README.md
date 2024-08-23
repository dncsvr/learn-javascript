# Matter.js

Here you'll find some Matter.js examples along with how to set it up within a
vue project.

## Project Setup

This project uses a simple `index.html` file and separate `.js` files per
javascript class along with a `Program.js` file to give a dotnet-like feel.
Thanks to `browserify` library, javascript files are bundled into
`.output/index.js` and included in `index.html`.

> ![NOTE]
>
> A full vue project would use `.vue` files, but here we kept things simple to
> have the focus rather on Matter.js.

And as always, we used `npx http-server` to serve static files locally. Checkout
[](./package.json) to see the details.

## Canvas for Matter World

Matter.js uses a `<canvas>` element to render its content. It has the option to
create the canvas element by itself, but we used an existing element to be able
to control its `z-index` and other styles if necessary.

## The Demo World

[`DemoWorld`](./DemoWorld.js) class is responsible for creating the matter world
and holds the instances of `Engine`, `Render` and `Runner` classes that come
from Matter.js. It creates a frame using [`Frame`](./Frame.js) class that puts 4
static edges around the canvas to keep the moving bodies within the visible
area.

For the sake of further investigation we created a [`Balloon`](./Balloon.js)
which is a composite object with two sub bodies and a constraint that binds the
two body together. This composite body also registers a `beforeUpdate` event to
have a continuous force calculated using its y position to have the effect of a
ballon pulling its lower body upwards.

## Binding Vue.js to Matter.js

Matter.js bodies are graphical objects drawn onto a canvas. If you want to have
a DOM element to behave like a physical body, this is not a feature that
Matter.js brings.

To create this connection, we created a `<div class="container">` element which
is aligned right on top of the canvas we've created before. This container div
belongs to the vue app.

We also created [`DomBody`](./DomBody.js) which is responsible for syncing DOM
elements from vue world to physical bodies in matter world. To achieve this, it
searches all elements with `matter` class and adds a corresponding invisible
body, which we call backing body, to the matter world.

> [!NOTE]
>
> Bodies in Matter.js uses center as the position, while DOM elements uses
> top-left as the position. To see how we've made the correct transformation
> check out `syncBody2Dom()` function in [`DomBody`](./DomBody.js). Also,
> `transformOrigin` style should be set to `center center` to have the rotation
> right, otherwise css rotation is applied using top-left position of the DOM
> element whereas Matter.js uses center to calculate rotation.

> [!NOTE]
>
> Margin of DOM element should be set to zero, since it has no effect in DOM but
> causes miscalculation of the position of the element.

### Syncing Matter to DOM

On every `beforeUpdate` event of Matter.js, [`DomBody`](./DomBody.js) uses
backing body's position and angle to be set to corresponding DOM element's
style. This way, whenever backing body's position and angle are updated they are
synced to DOM element's position and angle.

### Syncing DOM to Matter

To create new backing bodies for newly created DOM elements, we register to
`onUpdated` event of vue life cycle. This way whenever something is changed in
DOM world, it is synced with the matter world.

This sync operation is basically;

- removing backing bodies of removed DOM elements,
- adding new backing bodies of added DOM elements,
- and scales existing backing bodies to fit the new size of their DOM elements

> [!NOTE]
>
> [`DomBody`](./DomBody.js) also uses `transitionend` event of DOM element, in
> case there is a size change using a css transition. If you don't do this,
> `update` event of vue only provides the size of the DOM element at the moment
> of `update` event, which might change due to a css transition causing backing
> body's size to be out of sync with its DOM element.

### Forwarding Events

Now that we have a `<div>` in front of the `<canvas>`, it is impossible for the
canvas to capture mouse events from user. To achieve this, we forwarded
`mouseup`, `mousedown` and `mousemove` events from the div to the canvas
manually using the `dispatchEvent` method of canvas element. This way it is
possible to provide user with the option drag and drop DOM elements as if they
are physical bodies, while having the option to register a click event or apply
css `:hover` styles just like they are regular DOM elements.

> [!NOTE]
>
> We used `user-select: none` option, to disable selecting texts while dragging
> the objects.
