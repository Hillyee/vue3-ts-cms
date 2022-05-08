import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './types'
import {
  createPageData,
  deletePageItemData,
  editPageData,
  getPageListData
} from '@/service/main/system/system'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, list: any[]) {
      state.usersList = list
    },
    changeUsersCount(state, count: number) {
      state.usersCount = count
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        // return (state as any)[`${pageName}List`]
        switch (pageName) {
          case 'users':
            return state.usersList
          case 'role':
            return state.roleList
          case 'goods':
            return state.goodsList
          case 'menu':
            return state.menuList
        }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.usersCount
          case 'role':
            return state.roleCount
          case 'goods':
            return state.goodsCount
          case 'menu':
            return state.menuCount
        }
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1. 获取pageUrl
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }

      // 2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      // 将数据存储到state中
      const { list, totalCount } = pageResult.data

      switch (pageName) {
        case 'users':
          commit(`changeUsersList`, list)
          commit(`changeUsersCount`, totalCount)
          break
        case 'role':
          commit(`changeRoleList`, list)
          commit(`changeRoleCount`, totalCount)
          break
        case 'goods':
          commit(`changeGoodsList`, list)
          commit(`changeGoodsCount`, totalCount)
          break
        case 'menu':
          commit(`changeMenuList`, list)
          commit(`changeMenuCount`, totalCount)
          break
      }
      // commit(`change${changePageName}List`, list)
      // commit(`change${changePageName}Count`, totalCount)
    },
    async deletePageItemAction({ dispatch }, payload: any) {
      // 1.获取pageName和id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      // 2.调用删除网络请求
      await deletePageItemData(pageUrl)
      // 3.重新请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async createPageDataAction({ dispatch}, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editPageDataAction({dispatch}, payload: any) {
      const { pageName, editData, id} = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
