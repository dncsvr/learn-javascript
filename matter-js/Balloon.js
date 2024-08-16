const { Bodies, Body, Composite, Constraint, Events } = require("matter-js");

/**
 * @param {Number} x
 * @param {Number} y
 * @param {Number} size
 */
function Balloon(x, y,
  size = undefined
) {
  size = size || Math.random() * 20 + 10;

  const composite = Composite.create({ label: "balloon" });

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

  Composite.add(composite, [top, bottom, bond]);

  /**
   * @param {import("matter-js").Engine} engine
   */
  function add(engine) {
    Composite.add(engine.world, composite);

    Events.on(engine, 'beforeUpdate', () => {
      Body.applyForce(top, top.position, { x: 0, y: -0.01 - 0.0000035*(top.position.y) });
    });
  }

  return {
    add
  };
}

module.exports = {
  new: Balloon
};
