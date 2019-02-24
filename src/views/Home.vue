<template>
  <div class="Home">
    <form @submit="handleSubmit">
      <input type="text" class="content" name="content" />
      <button type="submit">ADD</button>
    </form>
    <ul class="list">
      <li class="item" v-for="item in activeList" :key="item.id">{{ item.context }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
// tslint:disable no-console
import { Component, Emit, Vue } from "vue-property-decorator";

interface Todo {
  id: number;
  context: string | null;
  createdAt: number | null;
  completedAt: number | null;
}
// enum Active { All = "All", Active = "Active", Completed = "Completed" };

@Component({})
export default class Home extends Vue {
  private list: Todo[] = JSON.parse(localStorage.getItem("todolist") || "[]");
  private active: string = "All";
  private form: Todo = {
    id: 0,
    context: "",
    createdAt: null,
    completedAt: null,
  };

  get activeList() {
    switch (this.active) {
      case "Active": return this.list.filter(item => item.completedAt === null);
      case "Completed": return this.list.filter(item => item.completedAt !== null);
      default: return this.list;
    }
  }

  private handleSubmit(event: HTMLFormElement) {
    event.preventDefault();
    // 최대큰 수를 찾습니다.
    const id = this.list.reduce((curr, acc) => {
      return Math.max(curr, acc.id);
    }, 0);

    const form = new FormData(event.currentTarget);
    this.form.id = id + 1;
    this.form.context = form.get("content") as string;
    this.form.createdAt = new Date().getTime();
    this.list.unshift({ ...this.form });
    localStorage.setItem("todolist", JSON.stringify(this.list));
    event.currentTarget.reset();
  }
}
</script>
