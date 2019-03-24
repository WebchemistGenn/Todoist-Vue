<template>
  <default-layout>
    <div id="management">
      <p class="title">관리함</p>
      <div class="has-content" v-if="activeList.length > 0">
        <ul class="list">
          <List :list="activeList" />
        </ul>
      </div>
      <CreateTodo v-if="isWrite" v-on:onWrite="handleWrite" />
      <AddTodo v-else v-on:onWrite="handleWrite" />
      <div class="not-content" v-if="activeList.length === 0 || isWrite">
        <ManagementImgSvg class="svg-image" width="220px" height="200px" />
        <p>모두 지우세요.</p>
        <p>모든 것이 제자리에 정리되어 있습니다.</p>
        <button class="add">작업 추가</button>
      </div>
    </div>
  </default-layout>
</template>

<script lang="ts">
// tslint:disable no-console
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import AddTodo from "@/components/common/AddTodo.vue";
import CreateTodo from "@/components/common/CreateTodo.vue";
import List from "@/components/common/List.vue";
import DefaultLayout from "@/layouts/Default.vue";
import ManagementImgSvg from "@/assets/management-image.svg";

@Component({
  components: {
    DefaultLayout,
    ManagementImgSvg,
    CreateTodo,
    AddTodo,
    List,
  },
})
export default class Home extends Vue {
  private isWrite = false;

  // private today: any = moment().format("YYYY-MM-DD");
  // private date: any = moment(1551786253400).format("YYYY년 MM월 DD일");
  // private diff: any = moment(moment().diff(1551786253400)).format("DD");

  get list(): Todo[] {
    return this.$store.state.list;
  }

  get activeList(): Todo[] {
    return this.$store.state.list.filter((item: Todo) => !item.isCompleted );
  }

  private handleWrite(isWrite: boolean) {
    this.isWrite = isWrite;
  }
}
</script>

<style lang="scss" scoped>
div#management {
  text-align: left;
  padding: 24px 10px 0 30px;

  p.title {
    height: 42px;
    line-height: 42px;
    font-size: 20px;
    margin: 0;
  }

  div.has-content {
    ul.list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  div.not-content {
    text-align: center;

    svg.svg-image {
      display: block;
      margin: 0 auto;
    }
  }

  button.add {
    height: 31px;
    line-height: 31px;
    padding: 0 15px;
    border: none;
    border-radius: 3px;
    background-color: #db4c3f;
    color: #fff;
    outline: none;
    cursor: pointer;
  }

}
</style>
