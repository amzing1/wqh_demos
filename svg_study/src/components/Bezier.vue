<template>
  <div
    class="bezier"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
  >
    <svg
      width="100%"
      height="100%"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text x="40" y="40">you can try to drag four points to change this bezier</text>
      <path :d="pathStr" stroke="black" fill="transparent" />
      <circle :cx="start.x" :cy="start.y" r="5" fill="red" data-id="start" />
      <circle
        :cx="control1.x"
        :cy="control1.y"
        r="5"
        fill="green"
        data-id="control1"
      />
      <circle
        :cx="control2.x"
        :cy="control2.y"
        r="5"
        fill="green"
        data-id="control2"
      />
      <circle :cx="end.x" :cy="end.y" r="5" fill="red" data-id="end" />
    </svg>
  </div>
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
export default {
  name: "bezier",
  setup() {
    let start = reactive({ x: 111.6, y: 414 });
    let end = reactive({ x: 820, y: 415 });
    let control1 = reactive({ x: 248, y: 99 });
    let control2 = reactive({ x: 653, y: 103 });
    let $mouse = {
      type: "",
    };

    function calcMousePos({ clientX, clientY }) {
      return {
        x: clientX - window.innerWidth * 0.15,
        y: clientY - window.innerHeight * 0.08,
      };
    }

    function onMouseDown(e) {
      if (!e.target.dataset.id) return;
      $mouse.type = e.target.dataset.id;
    }

    function onMouseMove(e) {
      const { x, y } = calcMousePos(e);

      switch ($mouse.type) {
        case "start":
          start.x = x;
          start.y = y;
          break;
        case "control1":
          control1.x = x;
          control1.y = y;
          break;
        case "control2":
          control2.x = x;
          control2.y = y;
          break;
        case "end":
          end.x = x;
          end.y = y;
          break;
      }
    }

    function onMouseUp() {
      $mouse.type = "";
    }

    let pathStr = computed(() => {
      return `M${start.x} ${start.y} C ${control1.x} ${control1.y} ${control2.x} ${control2.y} ${end.x} ${end.y}`;
    });

    return {
      start,
      end,
      control1,
      control2,
      pathStr,
      onMouseDown,
      onMouseMove,
      onMouseUp,
    };
  },
};
</script>

<style>
.bezier {
  width: 100%;
  height: 100%;
}
</style>