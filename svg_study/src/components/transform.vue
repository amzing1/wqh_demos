<template>
  <div class="transform">
    <svg
      width="100%"
      height="100%"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="100"
        y="100"
        width="100"
        height="50"
        fill="red"
        stroke-width="2"
        stroke="black"
        :transform=translate
      />
      <rect
        x="100"
        y="400"
        width="100"
        height="50"
        fill="green"
        stroke-width="2"
        stroke="black"
        :transform=rotate
        transform-origin="150 425"
      />
      <rect
        x="500"
        y="400"
        width="100"
        height="50"
        fill="blue"
        stroke-width="2"
        stroke="black"
        :transform=scale
        transform-origin="550 425"
      />
    </svg>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
export default {
  name: "transform",
  setup() {
    const position = ({ x: 100, y: 100 });
    const target = { x: 600, y: 100 };
    let translate = ref('');
    let rotate = ref('');
    let scale = ref('');
    let deg = 0;
    let sk = 1;
    let isToRight = true;
    let isToSmall = true;

    function onTransform() {
        onTranslate();
        onRotate();
        onScale();
        requestAnimationFrame(onTransform);
    }

    function onTranslate() {
      isToRight = position.x >= target.x || position.x < 100 ? !isToRight : isToRight;
      position.x = isToRight ? position.x + 2 : position.x - 2
      translate.value = `translate(${position.x}, ${position.y})`;
    }

    function onRotate() {
        deg+=3;
        rotate.value = `rotate(${deg})`
    }

    function onScale() {
        isToSmall = sk > 2 || sk <= 0 ? !isToSmall : isToSmall;
        sk = isToSmall ? sk - 0.01 : sk + 0.01;
        scale.value = `scale(${sk})`;
    }

    onTransform();

    return {
      translate,
      rotate,
      scale,
    };
  },
};
</script>
<style scoped>
.transform {
  width: 100%;
  height: 100%;
}
</style>