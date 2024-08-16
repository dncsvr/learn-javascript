const DemoWorld = require("./DemoWorld.js");

window.onload = () => {
  const world = DemoWorld.new();
  world.enableMouse();
  world.run();
};
