const { Bodies, Body, Composite, Constraint, Events } = require("matter-js");

/**
 * @param {import("matter-js").Engine} engine
 * @param {Number} x
 * @param {Number} y
 * @param {Number} size
 */
function Balloon(engine, x, y, size = 20) {
  const result = Composite.create({ label: "balloon" });

  const top = Bodies.circle(x, y, size, {
    mass: 1,
    restitution: 1,
    friction: 0.01,
    frictionAir: 0.01,
    frictionStatic: 0.01
  });

  const bottom = Bodies.circle(x, y+size+size/2, size/2, {
    mass: 10,
    restitution: 0.2,
    friction: 0.01,
    frictionAir: 0.01,
    frictionStatic: 0.01,
    render: {
      fillStyle: top.render.fillStyle
    }
  });

  const bond = Constraint.create({
      bodyA: top,
      bodyB: bottom,
      stiffness: 0.3,
      render: {
        visible: false
      }
  });

  Composite.add(result, [top, bottom, bond]);

  Events.on(engine, 'beforeUpdate', () => {
    Body.applyForce(top, top.position, { x: 0, y: -0.005 - 0.03*(top.position.y/1600) });
  });

  return result;
}

module.exports = {
    new: Balloon
};
