<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>

    <nav class="flex h-[60px] text-slate-900 items-center p-4 space-x-2 bg-slate-300 bg-opacity-50 shadow-md">
        <RouterLink active-class="font-semibold" class="p-2" to="/">Procurar Endereço</RouterLink>
        <RouterLink active-class="font-semibold" class="p-2" to="/procurar-cep">Procurar CEP</RouterLink>
    </nav>

</template>

<style scoped>

</style>
