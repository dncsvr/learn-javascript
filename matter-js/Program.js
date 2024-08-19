const { createApp, ref, reactive, onMounted, onUpdated } = require("vue");
const DemoWorld = require("./DemoWorld.js");

const world = DemoWorld.new("matter-js");
const app = createApp({
  setup() {
    const data = reactive([]);
    const prefix = ref("#");
    const multiplier = ref(1);
    const shown = ref(true);

    function setMultiplier(newMultiplier) {
      multiplier.value = newMultiplier;

      for(let i=0; i<data.length; i++) {
        data[i] = data[i]*multiplier.value;
      }
    }

    function add() {
      console.log(multiplier);
      data.push(data.length*multiplier.value);
    }

    function remove() {
      data.pop();
    }

    function toggle() {
      shown.value = !shown.value;
    }

    onMounted(() => world.sync());
    onUpdated(() => world.sync());

    return {
      data,
      multiplier,
      prefix,
      shown,
      setMultiplier,
      add,
      remove,
      toggle
    };
  },
});

app.mount("#vue-js");
world.enableMouse();
world.run();
