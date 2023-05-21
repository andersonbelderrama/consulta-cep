import { defineStore } from 'pinia'
import axios from 'axios'

export const useCepStore = defineStore('cep', {
  state: () => ({
    enderecoData: null,
    cepData: null,
    error: null,
  }),
  getters: {
    getEnderecoData: (state)  => state.enderecoData,
    getCepData: (state)  => state.cepData,
    getError: (state) => state.error,
  },
  actions: {
    async fetchEnderecoData(cep) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        this.enderecoData = response.data
        this.error = null
      } catch (error) {
        console.error(error)
        this.enderecoData = null
        this.error = 'Erro ao buscar o CEP. Por favor, verifique o CEP e tente novamente.';
      }
    },
    async fetchCepData(uf,cidade,logradouro) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`)
        this.cepData = response.data
        this.error = null;
      } catch (error) {
        console.error(error);
        this.cepData = null;
        this.error = 'Erro ao buscar o CEP. Por favor, verifique o CEP e tente novamente.';
      }
    },
  },
})
