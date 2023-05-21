import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../components/layout/DefaultLayout.vue'
import ProcurarEnderecoView from '../views/ProcurarEnderecoView.vue'
import ProcurarCEPView from '../views/ProcurarCEPView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'Procurar Endereço',
          component: ProcurarEnderecoView,
        }
      ]
    
    },
    {
      path: '/procurar-cep',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'Procurar CEP',
          component: ProcurarCEPView,
        }
      ]
    
    },
  ]
})

export default router
