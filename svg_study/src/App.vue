<template>
  <div id="app">
    <title-bar />
    <svg-menu />
    <div class="svg-content">
      <component :is="currentComp" />
    </div>
    <edit-bar />
  </div>
</template>

<script>
import SvgMenu from "./components/svg-menu.vue";
import Bezier from "./components/Bezier.vue";
import Base from "./components/base.vue";
import TitleBar from "./components/title-bar.vue";
import EditBar from "./components/edit-bar.vue";
import Gradient from "./components/gradient.vue"
import Text from "./components/text.vue"
import Transform from "./components/transform.vue"

import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  components: {
    "svg-menu": SvgMenu,
    bezier: Bezier,
    base: Base,
    "title-bar": TitleBar,
    "edit-bar": EditBar,
    EditBar,
    'gradient': Gradient,
    'text': Text,
    'transform': Transform
  },
  setup() {
    const store = useStore();
    let currentComp = computed(() => {
      return store.state.currentComponent;
    });

    return {
      currentComp,
    };
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 15% 1fr 15%;
  grid-template-rows: 8% 1fr;
}
.svg-menu {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  font-size: 20px;
  user-select: none;
  border-right: 1px solid rgba(200, 200, 200);
}
.svg-content {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  height: 100%;
  text-align: center;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAANUlEQVQ4jWN8//79fwY8QEBAAJ80AxNeWSLAqAGDwQDG////400HHz58oK0LRg0YcAMYGBgAyU8K5wAzuOIAAAAASUVORK5CYII=);
}
.title-bar {
  grid-column: 1 / 4;
  grid-row: 1 / 2;
  display: flex;
  border-bottom: 1px solid rgba(200, 200, 200);
  align-items: center;
}
.edit-bar {
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  border-left: 1px solid rgba(200, 200, 200);
}
</style>



