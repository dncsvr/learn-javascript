const { Composite, Engine, Mouse, MouseConstraint, Render, Runner } = require("matter-js");
const Balloon = require("./Balloon.js");
const DomBody = require("./DomBody.js");
const Frame = require("./Frame.js");

function DemoWorld(id) {
  const canvas = document.getElementById(id)
  const width = canvas.width;
  const height = canvas.height;

  const engine = Engine.create({
    gravity: { x: 0, y: 1 }
  });
  const render = Render.create({
    canvas: canvas,
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

  for(let i=0; i<15; i++) {
    for(let j=0; j<15; j++) {
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

  /**
   * @param {MouseEvent} e
   */
  function forwardMouseEvent(e) {
    canvas.dispatchEvent(new MouseEvent(e.type, e));
  }

  function run() {
    sync();
    Render.run(render);
    Runner.run(runner, engine);
  }

  function sync() {
    DomBody.sync(engine);
  }

  return {
    enableMouse,
    forwardMouseEvent,
    run,
    sync
  };
}

module.exports = {
  new: DemoWorld
};
