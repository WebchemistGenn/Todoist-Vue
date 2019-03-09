<template>
  <div id="add-todo">
    <div>
      <div>
        <Plus class="plus" width="20px" height="20px" color="#CB5647" />
      </div>
      <span>작업 추가</span>
    </div>
    <History class="history" width="20px" height="20px" color="gray" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Plus from "@/assets/plus.svg";
import History from "@/assets/history.svg";

@Component({
  components: {
    Plus,
    History,
  },
})
export default class AddTodo extends Vue {}
</script>

<style lang="scss" scoped>
div#add-todo {
  display: flex;
  height: 50px;
  padding-right: 20px;
  align-items: center;
  cursor: pointer;

  svg {
    width: 20px;
  }

  div {
    display: flex;
    flex: 1;

    div {
      display: flex;
      flex-basis: 20px;
      height: 20px;
      border-radius: 10px;
      justify-content: center;
      align-items: center;
    }

    span {
      flex-basis: calc(100% - 20px);
      font-size: 14px;
      padding-left: 10px;
    }

    &:hover {
      color: #CB5647;
      div {
        background-color: #CB5647;

        svg.plus {
          color: #fff;
        }
      }
    }
  }



  svg.history:hover {
    color: #333;
  }
}
</style>
