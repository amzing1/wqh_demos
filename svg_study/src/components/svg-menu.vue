<template>
  <div class="svg-menu">
    <div class="menu-head menu-item">目录</div>
    <div
      class="menu-item"
      v-for="(item, index) in dynamicComponents"
      :key="index"
      :innerText="item"
      @click="onClick"
    ></div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    let dynamicComponents = computed(() => {
      return store.state.dyComponents;
    });

    function onClick(e) {
      store.commit("changeCurrentComp", e.target.innerText);
      console.log(store.state.currentComponent);
    }

    return {
      dynamicComponents,
      onClick,
    };
  },
};
</script>

<style>
.menu-item {
  height: 50px;
  line-height: 50px;
  padding-left: 60px;
}
.menu-item:hover {
  color: #3eaf7c;
}
.menu-head {
  padding-left: 20px;
  font-weight: 700;
}
</style>