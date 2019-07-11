<template>
  <div id="calendal">
    <div>
      <input type="text" />
    </div>
    <div @click="handleSetDeadlineAt('today')">
      오늘
    </div>
    <div @click="handleSetDeadlineAt('tomorrow')">
      내일
    </div>
    <div @click="handleSetDeadlineAt('next week')">
      다음주
    </div>
    <div>
      달력
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import moment from "moment";

@Component
export default class Calendar extends Vue {
  @Prop(Number) private readonly deadlineAt!: number;

  private handleSetDeadlineAt(key: string) {
    switch (key) {
      case "today": this.$emit("setDeadline", moment().valueOf()); break;
      case "tomorrow": this.$emit("setDeadline", moment().add(1, "day").valueOf()); break;
      case "next week": this.$emit("setDeadline", moment().add(1, "week").valueOf()); break;
    }
  }
}
</script>

<style lang="scss" scoped>
div#calendal {
  position: absolute;
  top: 0;
  right: 0;
  width: 180px;
  background-color: #fff;
  border: 1px solid #ddd;

  input {
    width: 100%;
    height: 31px;
    padding: 0 5px;
    border: none;
    border-bottom: 1px solid #eee;
    outline: none;
  }

  div {
    height: 31px;
    line-height: 33px;
    padding: 0 5px;
    border-bottom: 1px solid #eee;

    &:nth-last-child(1) {
      border-bottom: none;
    }
  }
}
</style>
