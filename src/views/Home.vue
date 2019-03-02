<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>TODO List</v-toolbar-title>
          <v-spacer />

          <!-- <v-btn icon>
            <v-icon>add</v-icon>
          </v-btn> -->
        </v-toolbar>

        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.content"
            label="할일을 적어주세요."
            single-line
            full-width
            hide-details
            required
          ></v-text-field>
        </v-form>

        <v-divider />

        <v-list two-line class="list">
          <template v-for="(item, index) in activeList">
            <v-list-tile :key="item.id" class="item">
              <v-list-tile-action>
                <v-switch v-model="item.isCompleted" color="cyan" @change="handleCheck(index)"/>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="content" v-html="item.content"></v-list-tile-title>
                <v-list-tile-sub-title>{{ item.createdAt }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn flat color="red" class="remove" @click="handleRemove(index)">삭제</v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider :key="`divider-${item.id}`" />
          </template>
        </v-list>

        <v-card-actions>
          <v-btn flat color="cyan" class="clear" @click="handleClear">CLEAR</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="cyan" class="all" @click="active = 'ALL'">ALL</v-btn>
          <v-btn flat color="cyan" class="active" @click="active = 'ACTIVE'">ACTIVE</v-btn>
          <v-btn flat color="cyan" class="completed" @click="active = 'COMPLETED'">COMPLETED</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  <!-- <div class="Home">
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
  </div> -->
</template>

<script lang="ts">
// tslint:disable no-console
import { Component, Emit, Vue } from "vue-property-decorator";

interface Todo {
  id: number;
  isCompleted: boolean;
  content: string | null;
  createdAt: number | null;
  completedAt: number | null;
}
// enum Active { All = "All", Active = "Active", Completed = "Completed" };

@Component
export default class Home extends Vue {
  private list: Todo[] = JSON.parse(localStorage.getItem("todolist") || "[]");
  private active: string = "ALL";
  private valid: boolean = false;
  private form: Todo = {
    id: 0,
    isCompleted: false,
    content: "",
    createdAt: null,
    completedAt: null,
  };

  get activeList(): Todo[] {
    switch (this.active) {
      case "ACTIVE": return this.list.filter(item => !item.isCompleted);
      case "COMPLETED": return this.list.filter(item => item.isCompleted);
      default: return this.list;
    }
  }

  private handleSubmit(event: HTMLFormElement) {
    // 최대큰 수를 찾습니다.
    const id = this.list.reduce((curr, acc) => {
      return Math.max(curr, acc.id);
    }, 0);

    // const form = new FormData(event.currentTarget);
    this.form.id = id + 1;
    // this.form.content = form.get("content") as string;
    this.form.content = this.form.content;
    this.form.createdAt = new Date().getTime();
    this.list.unshift({ ...this.form });
    localStorage.setItem("todolist", JSON.stringify(this.list));
    // event.currentTarget.reset();
    this.form.content = "";
  }

  private handleCheck(index: number) {
    this.list = this.list.map((item, i) => {
      if (index === i && item.completedAt === null) {
        item.isCompleted = true;
        item.completedAt = new Date().getTime();
      } else if (index === i && item.completedAt !== null) {
        item.isCompleted = false;
        item.completedAt = null;
      }
      return item;
    });
    localStorage.setItem("todolist", JSON.stringify(this.list));
  }

  private handleRemove(index: number) {
    this.list = this.list.filter((item, i) => index !== i);
    localStorage.setItem("todolist", JSON.stringify(this.list));
  }

  private handleChangeActive(active: string) {
    this.active = active;
  }

  private handleClear() {
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
