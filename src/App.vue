<template>
<div id="app">
    <router-view></router-view>
</div>
</template>

<script>
import cmp from "./components/Calendar.vue";

export default {
    components: {
        appCmp: cmp
    }
};
</script>

<style lang="less">

</style>
