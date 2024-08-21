const { createApp, ref, reactive, onMounted, onUpdated } = require("vue");
const DemoWorld = require("./DemoWorld.js");

const app = createApp({
  setup() {
    const world = DemoWorld.new("matter-js");
    const data = reactive([]);
    const prefix = ref("#");
    const multiplier = ref(1);
    const shown = ref(true);
    const forwardEvents = {
      mousedown: world.forwardMouseEvent,
      mouseup: world.forwardMouseEvent,
      mousemove: world.forwardMouseEvent
    }

    function setMultiplier(newMultiplier) {
      multiplier.value = newMultiplier;

      for(let i=0; i<data.length; i++) {
        data[i] = data[i]*multiplier.value;
      }
    }

    function add() {
      data.push(data.length*multiplier.value);
    }

    function remove() {
      data.pop();
    }

    function toggle() {
      shown.value = !shown.value;
    }

    function clickDatum(index) {
      console.log(`${prefix.value}${index+1} clicked`);
    }

    onMounted(() => {
      world.enableMouse();
      world.run();
    });
    onUpdated(() => world.sync());

    return {
      data,
      multiplier,
      prefix,
      shown,
      forwardEvents,
      setMultiplier,
      add,
      remove,
      toggle,
      clickDatum
    };
  },
});

app.mount("#vue-js");
