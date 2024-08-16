const { Engine, Render, Runner, Composite, Mouse, MouseConstraint } = require("matter-js");
const Balloon = require("./Balloon.js");
const Frame = require("./Frame.js");

function DemoWorld() {
  const width = 1000;
  const height = 1000;

  const engine = Engine.create({
    gravity: { x: 0, y: 1 }
  });
  const render = Render.create({
    canvas: document.getElementById("matter-js"),
    engine: engine,
    options: {
      wireframes: false,
      background: "transparent",
      width: width,
      height: height
    }
  });
  const runner = Runner.create();

  const frame = Frame.new(1000, 1000, 10);
  frame.add(engine);

  for(let i=0; i<10; i++) {
    for(let j=0; j<10; j++) {
      const balloon = Balloon.new(width/2-150+i*30, height/2-150+j*30);
      balloon.add(engine);
    }
  }

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
