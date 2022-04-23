import { createStore } from 'vuex'
import login from './login/login'

const store = createStore({
	state() {
		return {

		}
	},
  modules: {
    login
  }
})

// 初始化store
export function setupStore() {
  store.dispatch('login/loadLoaclLogin')
}

export default store
