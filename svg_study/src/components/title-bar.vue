<template>
  <div class="title-bar">
    <h4>svg</h4>
    <span class="action">aa</span>
    <span class="action">bb</span>
    <span class="action">cc</span>
    <span class="action">dd</span>
  </div>
</template>

<script>
export default {
  name: "title-bar",
  setup() {},
};
</script>

<style>
h4 {
  font-size: 30px;
  flex: 1;
  margin: 0;
  padding: 0 20px;
}
.action {
  font-size: 16px;
  padding: 0 20px;
}
</style>