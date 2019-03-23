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
