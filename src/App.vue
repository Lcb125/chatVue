<!-- <template>
  <div id="app">
    <chat msg="Welcome to ChatGPT Stream"/>
  </div>
</template>

<script>
import chat from './views/chatView/chat.vue'

export default {
  name: 'App',
  components: {
    chat
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style> -->

<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>