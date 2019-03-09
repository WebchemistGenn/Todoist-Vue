<template>
  <div id="default-layout">
    <Header />
    <div class="default-container">
      <div class="slidebar">
        <Sidebar />
      </div>
      <div class="main">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/common/Header.vue";
import Sidebar from "@/components/common/Sidebar.vue";

@Component({
  components: {
    Header,
    Sidebar,
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" scoped>
div#default-layout {
  height: 100%;

  div.default-container {
    width: 950px;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;

    div.slidebar {
      float: left;
      width: 296px;
      height: 100%;
      padding: 50px 0 0 30px;
    }

    div.main {
      float: right;
      width: 654px;
      height: 100%;
      padding: 50px 0 0;
      background-color: #fff;
      border-left: 1px solid #f1f1f1;
      border-right: 1px solid #f1f1f1;
    }
  }
}
</style>


