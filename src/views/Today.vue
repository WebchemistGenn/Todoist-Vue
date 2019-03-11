<template>
  <default-layout>
    <div id="today">
      <p class="title">오늘</p>
      <AddTodo />
    </div>
  </default-layout>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import DefaultLayout from "@/layouts/Default.vue";
import AddTodo from "@/components/common/AddTodo.vue";
@Component({
  components: {
    DefaultLayout,
    AddTodo,
  },
})
export default class Today extends Vue {}
</script>

<style lang="scss" scoped>
div#today {
  text-align: left;
  padding: 24px 10px 0 30px;

  p.title {
    height: 42px;
    line-height: 42px;
    font-size: 20px;
    margin: 0;
  }
}
</style>
