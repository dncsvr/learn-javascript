const { Engine, Events, Render, Runner, Body, Bodies, Composite, Composites, Constraint, Mouse, MouseConstraint } = require("matter-js");

window.onload = function() {
  const engine = Engine.create({
      gravity: { x: 0, y: 1 }
  });

  const render = Render.create({
      canvas: document.getElementById("matter-js"),
      engine: engine,
      options: {
        wireframes: false,
        background: "transparent"
      }
  });

  const balloons = [];
  for(let i=0; i<10; i++) {
    for(let j=0; j<10; j++) {
      balloons.push(Composites.balloon(engine, 200+i*10, 200+j*10, Math.random() * 20 + 10));
    }
  }

  const edges = [
      Bodies.rectangle(0, 0, 1600, 10, { isStatic: true }),
      Bodies.rectangle(0, 0, 10, 1200, { isStatic: true }),
      Bodies.rectangle(0, 1190, 1600, 1200, { isStatic: true }),
      Bodies.rectangle(1595, 0, 1600, 1200, { isStatic: true })
  ];

  Composite.add(engine.world, [...balloons, ...edges]);

  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      angularStiffness: 0,
      render: { visible: false }
    }
  });

  Composite.add(engine.world, mouseConstraint);

  render.mouse = mouse;
  Render.run(render);

  const runner = Runner.create();
  Runner.run(runner, engine);
}

Composites.balloon = (engine, x, y, size = 20) => {
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
