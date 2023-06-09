<template>
  <div class="container">
      <div class="search">
        <Input placeholder="输入内容" style="width: 500px; margin-right: 20px;"/>
        <Button @click="search" type="primary">搜索</Button>
      </div>
      <div class="content" v-html="content"></div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref} from 'vue'
import { WordSingle } from '../utils/wordSingle'
import {Button, Input} from 'ant-design-vue'
const proxy = getCurrentInstance()?.proxy

const content = ref<string | null>('')

const search = () => {
  new WordSingle(proxy, content)
}


</script>

<style lang="css" scoped>
  .container {
    margin-top: 20px;
  }

  .search {
    display: flex;
    justify-content: center;
  }






</style>