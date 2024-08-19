const { createApp, reactive, onMounted, onUpdated } = require("vue");
const DemoWorld = require("./DemoWorld.js");

const world = DemoWorld.new("matter-js");
const app = createApp({
  setup() {
    const vues = reactive([]);

    function add() {
      vues.push(`vue-#${vues.length}`)
    }

    function remove() {
      vues.pop();
    }

    onMounted(() => world.sync());
    onUpdated(() => world.sync());

    return {
      vues,
      add,
      remove
    };
  },
});

app.mount("#vue-js");
world.enableMouse();
world.run();
