<template>
  <div id="menu-item">
    <li class="item" v-for="item in list" :key="item.id">
      <div class="inner">
        <div class="content">
          <div class="checkbox">
            <Check class="check" width="24px" height="24px" />
          </div>
          <span>{{ item.content }}</span>
          <Comment class="comment" color="gray" />
        </div>
        <div class="scheduler">
          <Scheduler color="gray" />
        </div>
      </div>

      <div class="menu">
        <Menu class="menu" color="gray" />
      </div>
    </li>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Menu from "@/assets/menu.svg";
import Scheduler from "@/assets/scheduler.svg";
import Comment from "@/assets/comment.svg";
import Check from "@/assets/check.svg";

@Component({
  components: {
    Menu,
    Scheduler,
    Comment,
    Check,
  },
})
export default class Item extends Vue {
  @Prop(Array) private readonly list!: Todo[];
}
</script>


<style lang="scss" scoped>
li.item {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  line-height: 40px;
  margin: 0 20px 0 0;

  div.inner {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ddd;

    div.content {
      display: flex;
      align-items: center;
      flex: 1;

      div.checkbox {
        position: relative;
        display: flex;
        justify-content: left;
        align-items: center;
        width: 18px;
        height: 18px;
        margin-right: 10px;
        border: 1px solid #333;
        border-radius: 9px;
        cursor: pointer;
        transition: background-color 0.2s ease-in;

        svg.check {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          visibility: hidden;
          transition: visibility 0.2s ease-in;
        }

        &:hover {
          background-color: #e1e1e1;

          svg.check {
            visibility: visible;
          }
        }
      }

      svg.comment {
        margin-left: 10px;
        visibility: hidden;
        cursor: pointer;

        &:hover {
          color: #333;
        }
      }
    }

    div.scheduler {
      display: flex;
      visibility: hidden;
      cursor: pointer;

      &:hover {
        svg {
          color: #333;
        }
      }

      svg {
        flex-basis: 20px;
      }
    }
  }

  div.menu {
    display: flex;
    margin-left: 10px;
    visibility: hidden;
    cursor: pointer;

    &:hover {
      svg {
        color: #333;
      }
    }
  }

  &:hover {
    div.menu,
    div.inner div.scheduler,
    div.inner div.content svg.comment {
      visibility: visible;
    }
  }
}
</style>
