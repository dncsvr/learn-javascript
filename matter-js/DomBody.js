const { Bodies, Body, Composite, Events } = require("matter-js");

/**
 * @param {HTMLElement} element
 */
function DomBody(element) {
  element.style.margin = "0";
  element.style.transformOrigin = 'center center';

  let width = element.offsetWidth;
  let height = element.offsetHeight;

  const body = Bodies.rectangle(
    parseInt(element.style.left) + offsetX(),
    parseInt(element.style.top) + offsetY(),
    width,
    height,
    { render: { visible: false } }
  );

  function offsetX() { return element.offsetWidth / 2; }
  function offsetY() { return element.offsetHeight / 2; }

  function syncBody2Dom() {
    const x = body.position.x;
    const y = body.position.y;
    const angle = body.angle;

    element.style.left = `${x - offsetX()}px`;
    element.style.top = `${y - offsetY()}px`;
    element.style.transform = `rotate(${angle}rad)`;
  }

  function syncDom2Body() {
    const angle = body.angle;
    Body.setAngle(body, 0);
    Body.scale(body, element.offsetWidth / width, element.offsetHeight / height);
    Body.setAngle(body, angle);

    width = element.offsetWidth;
    height = element.offsetHeight;
  }

  function elementRemoved() {
    return element.parentNode === null;
  }

  /**
   * @param {import("matter-js").Engine} engine
   */
  function add(engine) {
    Composite.add(engine.world, body);
    Events.on(engine, 'afterUpdate', syncBody2Dom);
    element.addEventListener("transitionend", syncDom2Body);
  }

  /**
   * @param {import("matter-js").Engine} engine
   */
  function remove(engine) {
    Composite.remove(engine.world, body);
    Events.off(engine, 'afterUpdate', syncBody2Dom);
    element.removeEventListener("transitionend", syncDom2Body);
  }

  return {
    syncDom2Body,
    elementRemoved,
    add,
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

  for(const body of bodies) {
    body.syncDom2Body();
  }
}

module.exports = {
  new: DomBody,
  sync
};
