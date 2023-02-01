<template>
<the-header></the-header>
<main>
    <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
            <component :is="slotProps.Component"></component>
        </transition>
    </router-view>
</main>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
export default {
    components: {
        TheHeader,
    },
}
</script>

<style scoped>
body{
    margin: 0;
    width: 100vw;
    height: 100vh;
}
* {
    font-family: 'Roboto', sans-serif;
}
main {
    display: flex;
    justify-content: center;
    background-color: #f5f5f5;
}

.route-enter-active {
    transition: all .5s;
}

.route-enter-from {
    opacity: 0;
    transform: translateX(50px);
}

.route-enter-to {
    opacity: 1;
    transform: translateX(0);
}
</style>
