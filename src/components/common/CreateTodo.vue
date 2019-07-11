<template>
  <div id="create">
    <input type="text" v-model="form.content" />
    <div class="calendar">
      <span>일정</span>
      <Calendar :deadlineAt="form.deadlineAt" v-on:setDeadline="handleSetDeadline" />
    </div>
    <button class="add" @click="handleCreate">작업 추가</button>
    <button class="cancel" @click="handleWrite">취소</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Calendar from "@/components/common/Calendar.vue";

@Component({
  components: {
    Calendar,
  },
})
export default class CreateTodo extends Vue {
  private form: Todo = {
    id: 0,
    isCompleted: false,
    content: "",
    deadlineAt: null,
    createdAt: null,
    completedAt: null,
  };

  get list(): Todo[] {
    return this.$store.state.list;
  }

  private handleWrite() {
    this.$emit("onWrite", false);
  }

  private handleSetDeadline(date: number) {
    this.form.deadlineAt = date;
  }

  private handleCreate() {
    if (this.form.content === "") {
      return false;
    }

    const id = this.list.reduce((curr, acc) => {
      return Math.max(curr, acc.id);
    }, 0);

    this.form.id = id + 1;
    this.form.content = this.form.content;
    this.form.createdAt = new Date().getTime();
    this.list.unshift({ ...this.form });
    localStorage.setItem("todolist", JSON.stringify(this.list));
    this.form.content = "";

    this.$emit("onWrite", false);
  }
}
</script>


<style lang="scss" scoped>
div#create {
  position: relative;
  width: 100%;
  padding: 5px 0;

  input {
    width: 100%;
    height: 31px;
    padding: 5px 105px 5px 5px;
    margin-bottom: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
    font-size: 14px;
    outline: none;
  }

  div.calendar {
    position: absolute;
    top: 5px;
    right: 0;
    width: 100px;
    height: 31px;
    line-height: 33px;
    border-left: 1px solid #ddd;
    font-size: 12px;
    padding: 0 10px;
    cursor: pointer;
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

  button.cancel {
    height: 31px;
    line-height: 31px;
    padding: 0 15px;
    border: none;
    outline: none;
    cursor: pointer;
  }
}
</style>
