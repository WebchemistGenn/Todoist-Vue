<template>
  <default-layout>
    <div id="today">
      <h1>Today</h1>
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
export default class Today extends Vue {}
</script>

<style lang="scss" scoped>
div#today {
  text-align: left;
  padding: 24px 10px 0 30px;
}
</style>
