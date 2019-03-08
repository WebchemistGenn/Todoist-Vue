<template>
  <div id="sidebar">
    <ul>
      <li><router-link to="/">관리함</router-link></li>
      <li><router-link to="/today">오늘</router-link></li>
      <li><router-link to="/week">다음 7일</router-link></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
div#sidebar {
  width: 100%;
  height: 100%;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      height: 42px;
      line-height: 42px;
      text-align: left;
    }
  }
}
</style>
