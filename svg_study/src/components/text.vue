<template>
  <div class="text">
    <svg
      width="100%"
      height="100%"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text x="100" y="100" font-size="30" fill="red">hello world</text>
      <text x="500" y="100" font-size="30" fill="red">
        <tspan fill="green">hello</tspan>
        world
      </text>

      <path id="my_path" d="M128.45000000000002 549.28 C 210.45000000000002 812.28 642.45 425.28 768.45 692.28" fill="transparent" />
      <text>
        <textPath
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="#my_path"
        >
          This text follows a curve.
        </textPath>
      </text>
    </svg>
  </div>
</template>

<script>
export default {
  name: "text",
};
</script>