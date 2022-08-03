<template>
  <div class="gradient">
    <svg
      width="100%"
      height="100%"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="Gradient1">
          <stop offset="0%" stop-color="red" />
          <stop offset="50%" stop-color="green" stop-opacity="0" />
          <stop offset="100%" stop-color="blue" />
        </linearGradient>
        <linearGradient id="Gradient2" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="red" />
          <stop offset="50%" stop-color="green" stop-opacity="0" />
          <stop offset="100%" stop-color="blue" />
        </linearGradient>
        <radialGradient id="Radial1">
            <stop offset="0%" stop-color="red" />
            <stop offset="50%" stop-color="green" />
            <stop offset="100%" stop-color="blue" />
        </radialGradient>
        <radialGradient id="Radial2" cx="0.25" cy="0.25" r="1">
            <stop offset="0%" stop-color="red" />
            <stop offset="50%" stop-color="green" />
            <stop offset="100%" stop-color="blue" />
        </radialGradient>
        <radialGradient id="Radial3" cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
            <stop offset="0%" stop-color="red" />
            <stop offset="50%" stop-color="green" />
            <stop offset="100%" stop-color="blue" />
        </radialGradient>
      </defs>

      <rect x="100" y="100" width="100" height="100" fill="url(#Gradient1)" />
      <rect x="500" y="100" width="100" height="100" fill="url(#Gradient2)" />
      <rect x="100" y="400" width="100" height="100" fill="url(#Radial1)" />
      <rect x="500" y="400" width="100" height="100" fill="url(#Radial2)" />
      <rect x="800" y="400" width="100" height="100" fill="url(#Radial3)" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "gradient",
};
</script>

<style scoped>
.gradient {
  width: 100%;
  height: 100%;
}
</style>