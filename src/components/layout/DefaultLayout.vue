<script setup>
import { RouterView } from 'vue-router'
import DefaultHeader from './DefaultHeader.vue'
import DefaultFooter from './DefaultFooter.vue';
</script>

<template>
    <div class="bg-gradient-to-br from-emerald-600 to-teal-500 min-h-screen overflow-auto">
        <DefaultHeader></DefaultHeader>

        <div class="bg-slate-200 m-4 rounded-lg p-4 shadow-md text-slate-700 md:mx-32 md:my-6  min-h-screen">
            <RouterView />
        </div>

        <DefaultFooter></DefaultFooter>
       
    </div>

</template>

<style scoped>

</style>
