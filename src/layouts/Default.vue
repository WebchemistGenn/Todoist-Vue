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
div.default-container {
  width: 950px;
  padding-top: 44px;
  margin: 0 auto;

  div.slidebar {
    float: left;
    width: 300px;
    height: 100%;
    padding-top: 30px;
  }

  div.main {
    float: right;
    width: 650px;
    height: 100%;
    padding-top: 30px;
    background-color: #fff;
    border-left: 1px solid #f1f1f1;
    border-right: 1px solid #f1f1f1;
  }
}
</style>


