<template>
  <default-layout>
    <div id="week">
      <p class="title">다음 7일</p>
      <AddTodo />
      <List />
    </div>
  </default-layout>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import DefaultLayout from "@/layouts/Default.vue";
import AddTodo from "@/components/common/AddTodo.vue";
import List from "@/components/common/List.vue";

@Component({
  components: {
    DefaultLayout,
    AddTodo,
    List,
  },
})
export default class Week extends Vue {}
</script>

<style lang="scss" scoped>
div#week {
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
