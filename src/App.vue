<template>
<div>
    <the-header></the-header>
    <main>
        <router-view></router-view>
    </main>
</div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
export default {
    components: {
        TheHeader,
    },
}
</script>

<style>
import 
main{
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
}
*{
    font-family: 'Roboto', sans-serif;
}
</style>
