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

  const balloons = [];
  for(let i=0; i<10; i++) {
    for(let j=0; j<10; j++) {
      balloons.push(Balloon.new(engine, 200+i*10, 200+j*10, Math.random() * 20 + 10));
    }
  }

  const edges = [
    Bodies.rectangle(0, 0, 1600, 10, { isStatic: true }),
    Bodies.rectangle(0, 0, 10, 1200, { isStatic: true }),
    Bodies.rectangle(0, 1190, 1600, 1200, { isStatic: true }),
    Bodies.rectangle(1595, 0, 1600, 1200, { isStatic: true })
  ];

  Composite.add(engine.world, [...balloons, ...edges]);

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
