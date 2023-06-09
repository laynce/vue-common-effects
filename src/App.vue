<script setup lang="ts">
import WordSingle from './components/WordSingle.vue'

</script>

<template>
  <div class="app">
    <ul>
      <li>
        <h3 class="title">吐字演示</h3>
        <WordSingle />
        <hr/>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .app {
    margin: 200px auto;
    width: 1000px;
    text-align: center;
  }
  
  ul, li {
    list-style: none;
  }

  .title {
    font-weight: bold;
  }
</style>
