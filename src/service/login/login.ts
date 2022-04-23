import myRequest from '../index'

import { IAccount, IDataType, ILoginResult } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // {{baseURL}}/users/1
  UserMenus = '/role/' // {{baseURL}}/role/4/menu
}

export function accountLoginRequest(account: IAccount) {
  // IDataType里面有ILoginResult类型
  return myRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 根据id获取用户信息
export function requestUserInfoById(id: number) {
  return myRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

// 根据id请求用户菜单
export function requestUserMenuByRoleId(id: number) {
  return myRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
