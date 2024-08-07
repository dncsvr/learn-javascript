const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = require("matter-js");

window.onload = function() {
  const engine = Engine.create({
      gravity: { x: 0, y: 0 }
  });
  const render = Render.create({
      canvas: document.getElementById("matter-js"),
      engine: engine,
      options: {
        wireframes: false,
        background: "transparent"
      }
  });

  const boxA = Bodies.rectangle(400, 200, 80, 80);
  const boxB = Bodies.rectangle(450, 50, 80, 80);
  const edges = [
      Bodies.rectangle(0, 0, 1600, 10, { isStatic: true }),
      Bodies.rectangle(0, 0, 10, 1200, { isStatic: true }),
      Bodies.rectangle(0, 1190, 1600, 1200, { isStatic: true }),
      Bodies.rectangle(1590, 0, 1600, 1200, { isStatic: true })
  ];

  Composite.add(engine.world, [boxA, boxB, ...edges]);

  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      // allow bodies on mouse to rotate
      angularStiffness: 0,
      render: { visible: false }
    }
  });

  Composite.add(engine.world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  Render.run(render);

  const runner = Runner.create();

  Runner.run(runner, engine);
}
