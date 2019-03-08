<template>
  <default-layout>
    <div id="week">
      <h1>Week</h1>
    </div>
  </default-layout>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import DefaultLayout from "@/layouts/Default.vue";
@Component({
  components: {
    DefaultLayout,
  },
})
export default class Week extends Vue {}
</script>

<style lang="scss" scoped>
div#week {
  text-align: left;
}
</style>
