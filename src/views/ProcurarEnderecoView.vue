<template>
  <main class="flex flex-col space-y-2">
    <div class="flex space-x-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>

      <h1 class="-tracking-wider uppercase font-medium text-lg">Busca de Endereço por CEP</h1>
    </div>
    <div class="py-2 w-full">
      <input v-model="cepInput" @keypress.enter="fetchEnderecoData"
        class="w-full text-slate-500 placeholder-gray-500 rounded-2xl p-2 bg-transparent outline-0 focus:border-teal-500 border-2 border-emerald-600 focus:shadow-lg"
        type="text" placeholder="Digite o CEP">
    </div>
    <div v-if="isSearching" class="flex justify-center py-4">
      <div class="w-10 h-10 rounded-full animate-spin
                    border-4 border-solid border-teal-500 border-t-transparent shadow-md"></div>

    </div>
    <span v-if="showError" class="bg-red-100 border border-red-400 px-4 py-3 rounded-lg text-red-500">{{ error }}</span>

    <ul v-if="showEnderecoData" class="px-2">
      <li><span class="font-semibold">CEP:</span> {{ enderecoData.cep }}</li>
      <li><span class="font-semibold">Logradouro:</span> {{ enderecoData.logradouro }}</li>
      <li><span class="font-semibold">Complemento:</span> {{ enderecoData.complemento }}</li>
      <li><span class="font-semibold">Bairro:</span> {{ enderecoData.bairro }}</li>
      <li><span class="font-semibold">Cidade:</span> {{ enderecoData.localidade }}</li>
      <li><span class="font-semibold">UF:</span> {{ enderecoData.uf }}</li>
      <li><span class="font-semibold">DDD:</span> {{ enderecoData.ddd }}</li>
    </ul>
  </main>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import { useCepStore } from '../stores/cep'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useCepStore()
    const router = useRouter()
    const cepInput = ref('')
    const enderecoData = computed(() => store.getEnderecoData)
    const error = computed(() => store.getError)
    const isSearching = ref(false)

    const fetchEnderecoData = () => {
      isSearching.value = true
      store.enderecoData = null
      store.error = null
      setTimeout(async () => {
        try {
          await store.fetchEnderecoData(cepInput.value)
          cepInput.value = ''
        } catch (error) {
          console.error(error)
        } finally {
          isSearching.value = false
        }
      }, 500)
    }

    watch(router.currentRoute, () => {
        store.enderecoData = null
        store.error = null
    })

    return {
      cepInput,
      enderecoData,
      showEnderecoData: computed(() => enderecoData.value),
      fetchEnderecoData,
      error,
      showError: computed(() => error.value),
      isSearching,
    }
  },
})
</script>