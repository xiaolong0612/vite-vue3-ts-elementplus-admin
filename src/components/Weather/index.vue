<template>
  <div class="weather">
    <div id="he-plugin-standard" ></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, withDefaults, defineProps } from "vue"
const props = withDefaults(defineProps<{
  width?: number,
  height?: number
}>(), {
  width: 310,
  height: 490
})
onMounted(() => {
  weather()
});
const weather = () => {
  const s = document.createElement("script");
  s.type = "text/javascript";
  s.src =
  "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0";
  document.body.appendChild(s);
}

window.WIDGET = {
  "CONFIG": {
    "layout": "2",
    "width": props.width,
    "height": props.height,
    "background": "1",
    "borderRadius": "5",
    "dataColor": "FFFFFF",
    "key": "f7c625e310a2415785c604fead0192e9"
  }
}
</script>

<style lang="scss">
.weather {
  >div {
    margin: 0 auto!important;
  }
}
</style>