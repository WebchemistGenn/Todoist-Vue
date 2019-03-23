<template>
  <div id="header">
    <div class="inner">
      <div class="left">
        <Logo width="24px" height="24px" color="#fff" />
      </div>
      <div class="right">
        <form @submit.prevent="handleSubmit">
          <input type="text" v-model="form.content" placeholder="빠른 검색" />
        </form>
        <div class="button">
          <Setting class="padding" width="24px" height="24px" color="#fff" />
        </div>
        <div class="button">
          <Notification class="padding" width="24px" height="24px" color="#fff" />
        </div>
        <div class="button">
          <Karma width="24px" height="24px" color="#fff" />
          <span>{{ 200 }}</span>
        </div>
        <div class="button">
          <Plus class="padding" width="24px" height="24px" color="#fff" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Logo from "@/assets/todoist.svg";
import Plus from "@/assets/plus.svg";
import Karma from "@/assets/karma.svg";
import Notification from "@/assets/notification.svg";
import Setting from "@/assets/setting.svg";

@Component({
  components: {
    Logo,
    Plus,
    Karma,
    Notification,
    Setting,
  },
})
export default class Header extends Vue {
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
}
</script>


<style lang="scss" scoped>
div#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 43px;
  border-bottom: solid 1px #ca2100;
  background-color: #db4c3f;
  transition: height 0.2 ease-in;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  z-index: 200;

  div.inner {
    width: 950px;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;

    div.left {
      float: left;
      width: 265px;
      height: 100%;
      padding: 8px 0 0 36px;
      text-align: left;
    }

    div.right {
      position: relative;
      display: flex;
      flex-direction: row-reverse;
      float: right;
      width: 685px;
      height: 100%;
      padding: 8px 12px 0 0;
      text-align: right;

      input {
        position: absolute;
        top: 8px;
        left: 30px;
        width: 300px;
        height: 28px;
        padding-left: 24px;
        margin-left: 30px;
        border: none;
        border-radius: 3px;
        background-color: transparent;
        outline: 0;
        color: #fff;
        transition: width .2s ease-in;

        &::placeholder {
          color: #fff;
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        &:focus {
          width: calc(100% - 60px);
          border: 1px solid #eee;
          color: #202020;
          background-color: #fff;

          &::placeholder {
            color: #d1d1d1;
          }
        }
      }

      div.button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 28px;
        margin-left: 10px;
        padding: 2px 4px;
        text-align: center;
        border-radius: 3px;
        cursor: pointer;

        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        span {
          display: inline-block;
          padding-left: 5px;
          line-height: 26px;
          vertical-align: top;
          color: #fff;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
