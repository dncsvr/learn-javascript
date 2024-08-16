const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = require("matter-js");
const Balloon = require("./Balloon.js");

function DemoWorld() {
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
  const runner = Runner.create();

  for(let i=0; i<10; i++) {
    for(let j=0; j<10; j++) {
      const balloon = Balloon.new(200+i*30, 200+j*30);

      balloon.add(engine);
    }
  }

  const edges = [
    Bodies.rectangle(400, -5, 800, 10, { isStatic: true }),
    Bodies.rectangle(-5, 300, 10, 600, { isStatic: true }),
    Bodies.rectangle(400, 605, 800, 10, { isStatic: true }),
    Bodies.rectangle(805, 300, 10, 600, { isStatic: true })
  ];

  Composite.add(engine.world, edges);

  function enableMouse() {
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
  }

  function run() {
    Render.run(render);
    Runner.run(runner, engine);
  }

  return {
    enableMouse,
    run
  };
}

module.exports = {
  new: DemoWorld
};
