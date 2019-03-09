<template>
  <default-layout>
    <div id="management">
      <p class="title">관리함</p>
      <div class="has-content" v-if="activeList.length > 0">
        <ul class="list">
          <Item :list="activeList" />
        </ul>
      </div>
      <AddTodo />
      <div class="not-content" v-if="activeList.length === 0">
        <ManagementImgSvg class="svg-image" width="220px" height="200px" />
        <p>모두 지우세요</p>
        <p>모든 것이 제자리에 정리되어 있습니다.</p>
        <button>작업 추가</button>
      </div>
    </div>
  </default-layout>
</template>

<script lang="ts">
// tslint:disable no-console
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import AddTodo from "@/components/common/AddTodo.vue";
import Item from "@/components/common/Item.vue";
import DefaultLayout from "@/layouts/Default.vue";
import ManagementImgSvg from "@/assets/management-image.svg";

@Component({
  components: {
    DefaultLayout,
    ManagementImgSvg,
    AddTodo,
    Item,
  },
})
export default class Home extends Vue {
  private active: string = "ALL";
  private form: Todo = {
    id: 0,
    isCompleted: false,
    content: "",
    createdAt: null,
    completedAt: null,
  };

  get list(): Todo[] {
    return this.$store.state.list;
  }

  get activeList(): Todo[] {
    return this.$store.state.list.filter((item: Todo) => !item.isCompleted );
  }

  private handleSubmit(event: HTMLFormElement) {
    // 최대큰 수를 찾습니다.
    const id = this.list.reduce((curr, acc) => {
      return Math.max(curr, acc.id);
    }, 0);

    this.form.id = id + 1;
    this.form.content = this.form.content;
    this.form.createdAt = new Date().getTime();
    this.list.unshift({ ...this.form });
    localStorage.setItem("todolist", JSON.stringify(this.list));
    this.form.content = "";
  }

  // private handleCheck(index: number) {
  //   this.list = this.list.map((item, i) => {
  //     if (index === i && item.completedAt === null) {
  //       item.isCompleted = true;
  //       item.completedAt = new Date().getTime();
  //     } else if (index === i && item.completedAt !== null) {
  //       item.isCompleted = false;
  //       item.completedAt = null;
  //     }
  //     return item;
  //   });
  //   localStorage.setItem("todolist", JSON.stringify(this.list));
  // }

  // private handleRemove(index: number) {
  //   this.list = this.list.filter((item, i) => index !== i);
  //   localStorage.setItem("todolist", JSON.stringify(this.list));
  // }

  // private handleClear() {
  //   this.list = [];
  //   localStorage.setItem("todolist", JSON.stringify(this.list));
  // }
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

}
</style>
