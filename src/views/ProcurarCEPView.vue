<template>
  <main class="flex flex-col space-y-2">
    <div class="flex space-x-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>

      <h1 class="-tracking-wider uppercase font-medium text-lg">Busca de CEP por UF/Cidade/Endereço</h1>
    </div>
    <div class="py-2 w-full space-y-2">
      <div class="flex space-x-2">
        <input v-model="ufInput"
          class="w-2/6 text-slate-500 placeholder-gray-500 rounded-2xl p-2 bg-transparent outline-0 focus:border-teal-500 border-2 border-emerald-600 focus:shadow-lg"
          type="text" placeholder="Digite o UF">
        <input v-model="cidadeInput"
          class="w-2/3 text-slate-500 placeholder-gray-500 rounded-2xl p-2 bg-transparent outline-0 focus:border-teal-500 border-2 border-emerald-600 focus:shadow-lg"
          type="text" placeholder="Digite a Cidade">
      </div>
      <div class="flex flex-col space-y-2">
        <input v-model="logradouroInput"
          class="w-full text-slate-500 placeholder-gray-500 rounded-2xl p-2 bg-transparent outline-0 focus:border-teal-500 border-2 border-emerald-600 focus:shadow-lg"
          type="text" placeholder="Digite o Logradouro">
        <button @click="fetchCepData"
          class="flex justify-center space-x-2 bg-emerald-600 hover:bg-teal-500 text-slate-200 uppercase tracking-wide p-2 rounded-2xl"><svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span>Buscar</span></button>
      </div>
    </div>
    <div v-if="isSearching" class="flex justify-center py-4">
      <div class="w-10 h-10 rounded-full animate-spin
                    border-4 border-solid border-teal-500 border-t-transparent shadow-md"></div>

    </div>
    <span v-if="showError" class="bg-red-100 border border-red-400 px-4 py-3 rounded-lg text-red-500">{{ error }}</span>
    <ul v-if="showCepData" >
      <li v-for="(cep, index) in cepData" :key="index" class="border-b border-slate-500 py-4">
        <ul class="px-2">
          <li><span class="font-semibold">CEP:</span> {{ cep.cep  }}</li>
          <li><span class="font-semibold">Logradouro:</span> {{ cep.logradouro }}</li>
          <li><span class="font-semibold">Complemento:</span> {{ cep.complemento }}</li>
          <li><span class="font-semibold">Bairro:</span> {{ cep.bairro }}</li>
          <li><span class="font-semibold">Cidade:</span> {{ cep.localidade }}</li>
          <li><span class="font-semibold">UF:</span> {{ cep.uf }}</li>
          <li><span class="font-semibold">DDD:</span> {{ cep.ddd }}</li>
        </ul>
      </li>
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
    const ufInput = ref('')
    const cidadeInput = ref('')
    const logradouroInput = ref('')
    const cepData = computed(() => store.getCepData)
    const error = computed(() => store.getError)
    const isSearching = ref(false)

    const fetchCepData = () => {
      isSearching.value = true
      store.cepData = null
      store.error = null
      setTimeout(async () => {
        try {
          await store.fetchCepData(ufInput.value, cidadeInput.value, logradouroInput.value)
          //cepInput.value = ''
        } catch (error) {
          console.error(error)
        } finally {
          isSearching.value = false
        }
      }, 500)
    }

    watch(router.currentRoute, () => {
      store.cepData = null
      store.error = null
    })

    return {
      ufInput,
      cidadeInput,
      logradouroInput,
      cepData,
      showCepData: computed(() => cepData.value),
      fetchCepData,
      error,
      showError: computed(() => error.value),
      isSearching,
    }
  },
})
</script>