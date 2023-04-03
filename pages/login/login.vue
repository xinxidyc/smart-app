<template>
	<view class="contenter bgwhite">
		<view class="status_bar"></view>
		<view class="content">
			<view>
				<image src="/static/images/login/logo.png" class="logoimg"></image>
				<u--form :model="loginForm" ref="uForm" labelWidth="60" :rules="rules">
					<u-form-item label="账号" prop="loginName" borderBottom>
						<u-input v-model="loginForm.loginName" border="bottom" placeholder="请输入手机号或者账号"/>
					</u-form-item>
					<u-form-item label="密码" prop="password" borderBottom>
						<u-input v-model="loginForm.password" border="bottom" placeholder="请输入密码"/>
					</u-form-item>
					<u-form-item label="验证码" prop="captchaCode" borderBottom>
						<u-input v-model="loginForm.captchaCode" border="bottom" placeholder="请输入验证码"/>
						<img class="captcha-img" :src="captchaBase64Image" @click="getCaptcha" />
					</u-form-item>
				</u--form>

				<button class="btn-login color-white" @click="login()">登录</button>
				<view class="agreenment">
					<navigator url="/pages/login/forget" open-type="navigate">忘记密码</navigator>
					<text>|</text>
					<navigator url="/pages/login/register" open-type="navigate">注册账户</navigator>
				</view>
			</view>
		</view>
		<view class="bottomview">
			<!-- #ifdef APP-PLUS -->
			<text class="txt-size-small color-tips">本机唯一识别码</text>
			<!-- #endif -->
			<text :selectable="true" class="txt-size-small color-normal"
				style="height: 32upx;line-height: 32upx;">登录进行更多管理</text>
			<image src="/static/images/login/ymk.png"></image>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		reactive,
		toRefs,
		ref
	} from 'vue'
	import {
		onShow,
		onLoad,
	} from '@dcloudio/uni-app'
	import {userApi} from '@/api'
	import { LOGIN_DEVICE_ENUM } from './login-device-const.js';
	import useStore from '@/store/modules/user';
	
	const state = reactive({
		initparam: {
			username: '',
			password: '',
			captchaCode: '', //验证码
		},
		loginForm: {
			loginName: 'admin',
		    password: '',
		    captchaCode: '',
		    captchaUuid: '',
		    loginDevice: LOGIN_DEVICE_ENUM.PC.value,
		},
		list: [{
			text: '点赞',
			color: 'blue',
			fontSize: 28
		}, {
			text: '分享'
		}, {
			text: '评论'
		}],
		show: true,
		nameline: "border_bottom_line",
		psline: "border_bottom_line",
		showClearIcon: false,
		showPassword: true,
	});
	const captchaBase64Image = ref('');
	const getCaptcha = async () =>{
		let captchaResult = await userApi.getCaptcha();
		console.log(captchaResult)
		if(captchaResult.ok){
			captchaBase64Image.value = captchaResult.data.captchaBase64Image;
			state.loginForm.captchaUuid = captchaResult.data.captchaUuid;
			beginRefrestCaptchaInterval(captchaResult.data.expireSeconds);
		}
	}
	let refrestCaptchaInterval = null;
	const beginRefrestCaptchaInterval=(expireSeconds) => {
	  if (refrestCaptchaInterval === null) {
	    refrestCaptchaInterval = setInterval(getCaptcha, (expireSeconds - 5) * 1000);
	  }
	}
	
	const stopRefrestCaptchaInterval = () =>{
	  if (refrestCaptchaInterval != null) {
	    clearInterval(refrestCaptchaInterval);
	    refrestCaptchaInterval = null;
	  }
	}

	const clearInput = (event) => {
		state.initparam.username = event.detail.value;
		if (event.detail.value.length > 0) {
			state.showClearIcon = true;
		} else {
			state.showClearIcon = false;
		}
	}
	const clearIcon = () => {
		state.initparam.username = '';
		state.showClearIcon = false;
	}
	const changePassword = () => {
		state.showPassword = !state.showPassword;
	}
	const rules = ref({
	  loginName: [{ required: true, message: '用户名不能为空' }],
	  password: [{ required: true, message: '密码不能为空' }],
	  captchaCode: [{ required: true, message: '验证码不能为空' }],
	})
    const uForm = ref(null)
	const store = useStore()
	const login = () => {
		uForm.value.validate().then(async rsd => {
			const res= await userApi.login(state.loginForm)
			stopRefrestCaptchaInterval();
			uni.setStorageSync('token',res.data.token ? res.data.token : '',)
			store.setUserInfo(res.data)
			uni.showToast({
				icon: 'none',
				title: '登录成功'
		    })
			uni.reLaunch({
				url: '/pages/index/index',
			});
		}).catch(errors => {
			// uni.showToast({
			// 	icon: 'none',
			// 	title: '登录失败'
		 //    })
		})
	}
	onLoad((e) => {
      getCaptcha()
	})
	const {
		initparam,
		nameline,
		psline,
		showClearIcon,
		showPassword,
		list,
		show,
		loginForm,
	} = toRefs(state)
</script>

<style scoped lang="less">
	.top-view {
		width: 100%;
		position: fixed;
		top: 0;
	}

	.topview {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.ipsetimg {
		height: 80upx;
		width: 80upx;
		padding: 16upx;
		box-sizing: border-box;

	}

	.content {
		padding: 200upx 100upx 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #ffffff;
	}

	.btn-login {
		width: 100%;
		height: 44px;
		font-size: 16px;
		border-radius: 4px;
		background-color: #146AFB;
		margin: 30upx 0 80upx;
	}

	.logoimg {
		width: 500upx;
		height: 80upx;
		margin-bottom: 80upx;
	}

	.uni-input-wrapper {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		padding: 0 10upx;
		flex-direction: row;
		align-items: center;
		width: calc(100% - 72upx);
	}

	.uni-input {
		height: 110upx;
		padding: 0;
		line-height: 110upx;
	}

	.inputrow {
		display: flex;
		height: 112upx;
		width: 100%;
		align-items: center;
	}

	.inputimg {
		width: 48upx;
		margin-left: 24upx;
		height: 40upx;
	}

	.bottomview {
		position: absolute;
		bottom: 0upx;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-bottom: 8upx;
		box-sizing: border-box;
	}

	.bottomview image {
		height: 36upx;
		width: 96upx;
	}

	.agreenment {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		color: #FFA800;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}

	.agreenment text {
		font-size: 24upx;
		margin-left: 15upx;
		margin-right: 15upx;
	}
</style>
