<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <Treemap/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import Treemap from "../components/Treemap";

    export default {
        name: 'Home',
        components: {
            Treemap,
            HelloWorld
        }
    }
</script>
