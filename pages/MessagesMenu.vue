<template>
  <div>
    
    <UButton block size="lg" @click="getChats" color="cyan"/>

  </div>
</template>

<script lang="ts" setup>


  async function getChats (){

    const data = await $fetch('/api/getMessages')

    console.log(data)

  }


</script>

<style>

</style>