<template>
  <div id="sidebar">
    <ul>
      <router-link to="/" tag="li" active-class="active" exact>
        <Management width="24px" height="24px" />
        <span>관리함</span>
      </router-link>
      <router-link to="/today" tag="li" active-class="active">
        <Today width="24px" height="24px" />
        <span>오늘</span>
      </router-link>
      <router-link to="/week" tag="li" active-class="active">
        <Week width="24px" height="24px" />
        <span>다음 7일</span>
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Management from "@/assets/management.svg";
import Today from "@/assets/today.svg";
import Week from "@/assets/week.svg";

@Component({
  components: {
    Management,
    Today,
    Week,
  },
})
export default class Sidebar extends Vue {}
</script>

<style lang="scss" scoped>
div#sidebar {
  width: 100%;
  height: 100%;

  ul {
    list-style: none;
    margin: 0;
    padding: 24px 0 0;

    li {
      display: flex;
      height: 42px;
      padding: 9px 16px 9px 5px;
      align-items: center;
      font-size: 14px;
      cursor: pointer;

      svg {
        margin-right: 10px;
      }

      &.active {
        background-color: #fff;
        font-weight: 700;
      }
    }
  }
}
</style>
