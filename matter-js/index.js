const { Engine, Render, Runner, Bodies, Composite } = require("matter-js");

window.onload = function() {
  var engine = Engine.create();
  var render = Render.create({
      canvas: document.getElementById("matter-js"),
      engine: engine,
      options: {
        wireframes: false,
        background: "transparent"
      }
  });

  var boxA = Bodies.rectangle(400, 200, 80, 80);
  var boxB = Bodies.rectangle(450, 50, 80, 80);
  var ground = Bodies.rectangle(400, 425, 810, 1, { isStatic: true });

  Composite.add(engine.world, [boxA, boxB, ground]);
  Render.run(render);

  var runner = Runner.create();

  Runner.run(runner, engine);
}
