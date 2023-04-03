/*
 * 登录用户
 *
 * @Author:    1024创新实验室-主任：卓大
 * @Date:      2022-09-06 20:55:09
 * @Wechat:    zhuda1024
 * @Email:     lab1024@163.com
 * @Copyright  1024创新实验室 （ https://1024lab.net ），Since 2012
 */
import { defineStore } from 'pinia';

const userStore = defineStore('userStore', {
  state: () => ({
    userinfo: null
  }),
  getters: {
    getUserInfo: (state) => state.userinfo
  },
  actions: {
    setUserInfo(params: any) {
		this.userinfo = params;
	}
  }
})
export default userStore

