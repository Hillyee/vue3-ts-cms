import { getPageListData } from '@/service/main/system/system'
import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'
import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state() {
    return {
      name: '',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data

      const roletResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roletResult.data

      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

// 初始化store
export function setupStore() {
  store.dispatch('login/loadLoaclLogin')
  // store.dispatch('getInitialDataAction')
}

// 自己的useStore
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
