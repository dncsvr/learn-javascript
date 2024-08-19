const { createApp, ref, reactive, onMounted, onUpdated } = require("vue");
const DemoWorld = require("./DemoWorld.js");

const world = DemoWorld.new("matter-js");
const app = createApp({
  setup() {
    const vues = reactive([]);
    const prefix = ref("vue");
    const shown = ref(true);

    function add() {
      vues.push(`#${vues.length}`)
    }

    function remove() {
      vues.pop();
    }

    function toggle() {
      shown.value = !shown.value;
    }

    onMounted(() => world.sync());
    onUpdated(() => world.sync());

    return {
      vues,
      prefix,
      shown,
      add,
      remove,
      toggle
    };
  },
});

app.mount("#vue-js");
world.enableMouse();
world.run();
