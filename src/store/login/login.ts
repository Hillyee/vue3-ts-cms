import { Module } from "vuex"
import { ILoginState } from './types'
import { IRootState } from '../types'
import { accountLoginRequest, requestUserInfoById, requestUserMenuByRoleId } from "@/service/login/login"
import { IAccount } from "@/service/login/type"
import LoaclCache from '@/utils/cache'
import router from "@/router"

const loginMoudule: Module<ILoginState, IRootState>  = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenu: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    // 保存用户信息到state
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    // 保存用户菜单
    changeUserMenu(state, userMenu: any) {
      state.userMenu = userMenu
    }
  },
  actions: {
    // 登录
    async accountLoginAction({commit}, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      LoaclCache.setCache('token', token)

      // 2.获取用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      LoaclCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenuResult = await requestUserMenuByRoleId(id)
      const userMenu = userMenuResult.data
      commit('changeUserMenu', userMenu)
      LoaclCache.setCache('userMenu', userMenu)

      // 4.跳到首页
      router.push('/main')
    },
    loadLoaclLogin({ commit }) {
      const token = LoaclCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }

      const userInfo = LoaclCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenu = LoaclCache.getCache('userMenu')
      if (userMenu) {
        commit('changeUserMenu', userMenu)
      }
    }
  }
}

export default loginMoudule