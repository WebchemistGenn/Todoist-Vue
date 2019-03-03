<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="teal accent-4" dark>
          <v-toolbar-title>TODO List</v-toolbar-title>
          <v-spacer />
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
                <v-switch v-model="item.isCompleted" color="teal accent-4" @change="handleCheck(index)"/>
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
          <v-btn flat color="teal accent-4" class="clear" @click="handleClear">CLEAR</v-btn>
          <v-spacer></v-spacer>
          <v-btn dark :flat="active !== 'ALL'" color="teal accent-4" class="all" @click="active = 'ALL'">ALL</v-btn>
          <v-btn dark :flat="active !== 'ACTIVE'" color="teal accent-4" class="active" @click="active = 'ACTIVE'">ACTIVE</v-btn>
          <v-btn dark :flat="active !== 'COMPLETED'" color="teal accent-4" class="completed" @click="active = 'COMPLETED'">COMPLETED</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
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

@Component
export default class Home extends Vue {
  private list: Todo[] = JSON.parse(localStorage.getItem("todolist") || "[]");
  private active: string = "ALL";
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

    this.form.id = id + 1;
    this.form.content = this.form.content;
    this.form.createdAt = new Date().getTime();
    this.list.unshift({ ...this.form });
    localStorage.setItem("todolist", JSON.stringify(this.list));
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

  private handleClear() {
    this.list = [];
    localStorage.setItem("todolist", JSON.stringify(this.list));
  }
}
</script>
