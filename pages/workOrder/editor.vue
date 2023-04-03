<template>
	<view class="contenter">
		<view class="register-box">
			<view class="list">
				<u--form :model="initparam" ref="uForm" labelWidth="60" :rules="rules">
					<u-form-item label="账号" prop="actualName" borderBottom>
						<u-input v-model="initparam.actualName" border="none" placeholder="请输入手机号或者账号" />
					</u-form-item>
					<u-form-item label="昵称" prop="loginName" borderBottom>
						<u-input v-model="initparam.loginName" border="none" placeholder="请输入昵称"/>
					</u-form-item>
					<u-form-item label="性别" prop="gender" borderBottom>
						<u-radio-group
						    v-model="initparam.gender"
						    placement="row"
						  >
						    <u-radio
						      :customStyle="{marginRight: '30upx'}"
						      v-for="(item, index) in columns"
						      :key="index"
						      :label="item.label"
						      :name="item.id"
						    >
						    </u-radio>
						  </u-radio-group>
					</u-form-item>
					<u-form-item label="手机号" prop="phone" borderBottom>
						<u-input v-model="initparam.phone" border="none" placeholder="请输入密码"/>
					</u-form-item>
					<u-form-item label="角色" prop="roleIdList" borderBottom>
						<u-checkbox-group
						            v-model="initparam.roleIdList"
						            placement="column"
						        >
						            <u-checkbox
						                :customStyle="{marginBottom: '8px'}"
						                v-for="(item, index) in checkboxList"
						                :key="index"
						                :label="item.roleName"
						                :name="item.roleId"
						            >
						            </u-checkbox>
						</u-checkbox-group>
					</u-form-item>
					<u-form-item label="签到" prop="state" borderBottom>
						<text @click="show=!show" :style="{'color': initparam.state==4?'green':'red'}">{{getstate(initparam.state)}}</text>
						<u-picker :show="show" :columns="columns1" keyName="label" @cancel="show=false" @confirm="confirm" @close="show= false"></u-picker>
					</u-form-item>
					
					<u-form-item label="备注" prop="note" borderBottom v-if="initparam.state==1">
						<u--textarea v-model="initparam.note" placeholder="请输入内容" count></u--textarea>
					</u-form-item>
				</u--form>

			</view>

			<view class="button-login" hover-class="button-hover" @tap="register()">
				<text>确定</text>
			</view>

		</view>

	</view>
</template>

<script setup lang="ts">
	import {
		reactive,
		toRefs,
		ref,
		computed,
		onMounted,

	} from 'vue'
	import {
		onShow,
		onLoad,
		onUnload
	} from '@dcloudio/uni-app'

	import {userApi} from '@/api'

	onUnload(() => {
		
	})
	let timer: any;
	let popupRef = ref < any > (null)
	const state = reactive({
		initparam: {
			actualName: '',
			loginName: '',
			gender: '',
			departmentId: '2',
			disabledFlag: true,
			phone: '',
			roleIdList: [],
			roleNameList: [],
			state: ''
		},
		show: false,
		columns: [
			{
				label: '男',
				id: 1
			}, {
				label: '女',
				id: 0
			}
		],
		columns1: [
			[{
				label: '未签到',
				id: 0
			}, {
				label: '请假',
				id: 1
			}, {
				label: '旷课',
				id: 2
			}, {
				label: '迟到',
				id: 3
			}, {
				label: '已签到',
				id: 4
			}]
		],
		checkboxList: [],
		second: 0,
		agreement: true,
		showPassword: true,
	})
	const getstate = (value) =>{
		let v="未签到"
		switch(value){
			case 0:
			   v="未签到"
			   break
			case 1:
			   v="请假"
			   break
			case 2:
			   v="旷课"
			   break
			case 3:
			   v="迟到"
			   break
			case 4:
			   v="已签到"
			   break
			default:
			   break
		}
		return v
	}
	const confirm=(e) => {
		state.initparam.state = e.value[0].id
		state.show = false
	}

	const toipset = () => {}

	const change = () => {}
	const register = async () => {
		const res= await userApi.update(state.initparam)
		if(res.ok){
			uni.showToast({
				icon: 'none',
				title: '修改成功'
			})
			uni.reLaunch({
				url: '/pages/index/index',
			});
		}else{
			uni.showToast({
				icon: 'none',
				title: '修改失败'
			})
		}
	}
	const surePopup = () => {
		popupRef.value.close()
	}
	onLoad(async (e) => {
		const res= await userApi.getparmet();
		state.checkboxList = res.data
       const userinfo = JSON.parse(decodeURIComponent(e.item));
	   state.initparam = userinfo
	})
	const {
		initparam,
		showPassword,
		agreement,
		second,
		columns,
		columns1,
		checkboxList,
		show
	} = toRefs(state)
</script>

<style scoped lang="less">
	.contenter {
		display: flex;
		justify-content: center;
	}

	.register-box {
		width: 70%;
	}

	.header {
		width: 500upx;
		height: 80upx;
		margin-bottom: 30upx;
		padding-top: 80upx;
		display: flex;
		justify-content: center;
	}

	.header image {
		width: 100%;
		height: 100%;
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-top: 50upx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;
	}



	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 32upx;
		margin-left: 16upx;
	}

	.yzm {
		color: #FF7D13;
		font-size: 24upx;
		line-height: 60upx;
		padding-left: 15upx;
		padding-right: 15upx;
		width: auto;
		height: 60upx;
		border: 1upx solid #FF7D13;
		border-radius: 30upx;
	}

	.yzms {
		color: #999999 !important;
		border: 1upx solid #999999;
	}

	.button-login {
		color: #FFFFFF;
		font-size: 34upx;
		width: 470upx;
		height: 100upx;
		line-height: 100upx;
		background: linear-gradient(-90deg, rgba(193, 25, 32, 1), rgba(238, 38, 38, 1));
		border-radius: 50upx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100upx;
	}

	.button-hover {
		background: linear-gradient(-90deg, rgba(193, 25, 32, 0.8), rgba(238, 38, 38, 0.8));
	}

	.agreement {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		margin-top: 80upx;
		color: #FFA800;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}

	.agreement image {
		width: 40upx;
		height: 40upx;
	}
</style>
