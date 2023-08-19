<template>
  <div id="app">
    <HelloWorld/>
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
button{
  border-radius: 10px;
  background-color: #cccccc;
}
</style>
