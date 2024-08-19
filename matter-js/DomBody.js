const { Composite, Bodies, Events } = require("matter-js");

/**
 * @param {HTMLElement} element
 */
function DomBody(element) {
  const translateOffsetX = parseInt(element.style.left) + element.offsetWidth / 2;
  const translateOffsetY = parseInt(element.style.top) + element.offsetHeight;

  const body = Bodies.rectangle(
    translateOffsetX,
    translateOffsetY,
    element.offsetWidth,
    element.offsetHeight,
    { mass: 0, inertia: 0, render: { visible: false }
  });

  function sync() {
    const x = body.position.x;
    const y = body.position.y;
    const angle = body.angle;

    element.style.transformOrigin = 'center';
    element.style.transform = `translate(${x - translateOffsetX}px, ${y - translateOffsetY}px) rotate(${angle}rad)`;
  }

  /**
   * @param {import("matter-js").Engine} engine
   */
  function add(engine) {
    Composite.add(engine.world, body);
    Events.on(engine, 'afterUpdate', sync);
  }

  function elementRemoved() {
    return element.parentNode === null;
  }

  /**
   * @param {import("matter-js").Engine} engine
   */
  function remove(engine) {

    Composite.remove(engine.world, body);
    Events.off(engine, 'afterUpdate', sync);
  }

  return {
    add,
    elementRemoved,
    remove
  };
}

const bodies = [];

/**
 * @param {Engine} engine
 */
function sync(engine) {
  const elements = Array.from(document.getElementsByClassName("matter"));
  for(const element of elements) {
    element.classList.remove("matter");

    const body = DomBody(element);
    body.add(engine);
    bodies.push(body);
  }

  for(let i=0; i<bodies.length; i++) {
    const body = bodies[i];

    if(!body.elementRemoved()) { continue; }

    body.remove(engine);
    bodies.splice(i, 1);
    i--;
  }
}

module.exports = {
  new: DomBody,
  sync
};
