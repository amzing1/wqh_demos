<template>
  <div class="base">
    <svg
      width="100%"
      height="100%"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="10%"
        y="10%"
        rx="10"
        ry="10"
        width="60"
        height="60"
        stroke="black"
        fill="transparent"
        stroke-width="5"
      />

      <circle
        cx="30%"
        cy="10%"
        r="60"
        stroke="red"
        fill="transparent"
        stroke-width="5"
      />
      <ellipse
        cx="50%"
        cy="10%"
        rx="80"
        ry="40"
        stroke="red"
        fill="transparent"
        stroke-width="5"
      />

      <line
        x1="70%"
        x2="80%"
        y1="10%"
        y2="20%"
        stroke="orange"
        fill="transparent"
        stroke-width="5"
      />
      <polyline
        points="360 410 365 420 370 415 375 430 380 425 385 440 390 435 395 450 400 445"
        stroke="orange"
        fill="transparent"
        stroke-width="5"
      />

      <polygon
        points="250 360 255 380 270 380 260 390 265 405 250 395 235 405 240 390 230 380 245 380"
        stroke="green"
        fill="transparent"
        stroke-width="5"
      />

      <path
        d="M20,230 Q40,205 50,230 T90,230"
        fill="none"
        stroke="blue"
        stroke-width="5"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "base",
};
</script>

<style>
.base {
  width: 100%;
  height: 100%;
}
</style>