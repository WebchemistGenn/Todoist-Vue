<template>
  <div id="header">
    <div class="inner">
      <div class="left">
        <span>아이콘</span>
      </div>
      <div class="right">
        <input type="text" />
        <span>+</span>
        <span>카르마</span>
        <span>공지</span>
        <span>설정</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div#header {
  position: fixed;
  top: 0;
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
  }
}
</style>
