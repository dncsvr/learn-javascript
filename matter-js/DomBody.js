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

  /**
   * @param {import("matter-js").Engine} engine
   */
  function add(engine) {
    Composite.add(engine.world, body);
    Events.on(engine, 'afterUpdate', function() {
        const x = body.position.x;
        const y = body.position.y;
        const angle = body.angle;

        element.style.transformOrigin = 'center';
        element.style.transform = `translate(${x - translateOffsetX}px, ${y - translateOffsetY}px) rotate(${angle}rad)`;
    });
  }

  return {
    add
  };
}

module.exports = {
  new: DomBody
};
