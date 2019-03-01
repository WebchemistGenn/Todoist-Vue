<template>
  <div class="Home">
    <form @submit.prevent="handleSubmit">
      <input type="text" class="content" name="content" />
    </form>
    <ul class="list">
      <li class="item" :class="{ 'active': item.completedAt !== null }" v-for="(item, index) in activeList" :key="item.id">
        <div class="checkbox">
          <input type="checkbox" @change="handleCheck(index)" :checked="item.completedAt !== null" />
        </div>
        <div class="content">
          {{ item.content }}
        </div>
        <div class="remove">
          <button class="remove" @click="handleDelete(index)">삭제</button>
        </div>
      </li>
    </ul>
    <div class="buttons">
      <button class="changeAll" @click="handleChangeActive('ALL')">ALL</button>
      <button class="changeActive" @click="handleChangeActive('ACTIVE')">ACTIVE</button>
      <button class="changeCompleted" @click="handleChangeActive('COMPLETED')">COMPLETED</button>
      <button class="allRemove" @click="handleAllDelete">초기화</button>
    </div>
  </div>
</template>

<script lang="ts">
// tslint:disable no-console
import { Component, Emit, Vue } from "vue-property-decorator";

interface Todo {
  id: number;
  content: string | null;
  createdAt: number | null;
  completedAt: number | null;
}
// enum Active { All = "All", Active = "Active", Completed = "Completed" };

@Component({})
export default class Home extends Vue {
  private list: Todo[] = JSON.parse(localStorage.getItem("todolist") || "[]");
  private active: string = "ALL";
  private form: Todo = {
    id: 0,
    content: "",
    createdAt: null,
    completedAt: null,
  };

  get activeList(): Todo[] {
    switch (this.active) {
      case "ACTIVE": return this.list.filter(item => item.completedAt === null);
      case "COMPLETED": return this.list.filter(item => item.completedAt !== null);
      default: return this.list;
    }
  }

  private handleSubmit(event: HTMLFormElement) {
    // 최대큰 수를 찾습니다.
    const id = this.list.reduce((curr, acc) => {
      return Math.max(curr, acc.id);
    }, 0);

    const form = new FormData(event.currentTarget);
    this.form.id = id + 1;
    this.form.content = form.get("content") as string;
    this.form.createdAt = new Date().getTime();
    this.list.unshift({ ...this.form });
    localStorage.setItem("todolist", JSON.stringify(this.list));
    event.currentTarget.reset();
  }

  private handleCheck(index: number) {
    this.list = this.list.map((item, i) => {
      if (index === i && item.completedAt === null) {
        item.completedAt = new Date().getTime();
      } else if (index === i && item.completedAt !== null) {
        item.completedAt = null;
      }
      return item;
    });
    localStorage.setItem("todolist", JSON.stringify(this.list));
  }

  private handleDelete(index: number) {
    this.list = this.list.filter((item, i) => index !== i);
    localStorage.setItem("todolist", JSON.stringify(this.list));
  }

  private handleChangeActive(active: string) {
    this.active = active;
  }

  private handleAllDelete() {
    this.list = [];
    localStorage.setItem("todolist", JSON.stringify(this.list));
  }
}
</script>

<style lang="scss" scoped>
div.Home {
  width: 550px;
  margin: 0 auto;
  border: 1px solid #eee;
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.1);

  input.content {
    width: 548px;
    height: 65px;
    padding: 0 20px 0 70px;
    border: none;
    border-bottom: 1px solid #eee;
    outline: none;
    font-size: 28px;
    font-weight: 100;
    background-color: rgba(0, 0, 0, 0.003);
  }

  ul.list {
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;

    li.item {
      width: 550px;
      height: 65px;
      line-height: 65px;
      border-bottom: 1px solid #eee;

      div {
        display: inline-block;

        &.checkbox {
          width: 50px;
        }

        &.content {
          width: 450px;
          text-align: left;
          font-size: 24px;
          font-weight: 100;
        }

        &.remove {
          width: 50px;
        }
      }

      &.active div.content {
        color: #ddd;
        text-decoration: line-through;
      }
    }
  }

  div.buttons {
    button {
      padding: 0 5px;
    }
  }
}
</style>
