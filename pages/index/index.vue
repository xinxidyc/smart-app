<template>
	<view class="contenter">
		<view class="header bgblue">
            <view class="margincss">
				<text class="fontcss mr10" @click="logout">退出<image src="/static/images/index/back.png" class="homeimg2"></image></text>
				<text class="fontcss mr10">3年级4班</text>
				<text class="fontcss">{{timenow}}</text>
			</view>
			<view class="chuqin">
			    <image src="/static/images/login/account.png" class="homeimg1"></image>
				<text class="bigsize color-white">出勤率：97 %</text>
			</view>
			<view class="centercss">
				<u-grid :border="false" col="5">
					<u-grid-item>
						<text class="grid-text color-white">总计：</text>
						<text>{{swiperList.length}} 人</text>
					</u-grid-item>
					<u-grid-item>
						  <text class="grid-text color-white">请假：</text>
						  <text :style="{'color': (qinjia==0?'green':'red')}" @click="goDetail(1)"><text>{{qinjia}}</text>人</text>
					</u-grid-item>
					<u-grid-item>
						<text class="grid-text color-white">旷课：</text>
						<text :style="{'color': swiperList.length==0?'green':'red'}" @click="goDetail(2)">{{swiperList.length}}人</text>
					</u-grid-item>
					<u-grid-item>
						<text class="grid-text color-white">迟到：</text>
						<text :style="{'color': swiperList.length==0?'green':'red'}" @click="goDetail(3)">{{swiperList.length}}人</text>
					</u-grid-item>
					<u-grid-item>
						<text class="grid-text color-white">实到：</text>
						<text>{{swiperList.filter(x=>x.state==3).length}}人</text>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="mtps">
				<u-row justify="space-between">
					<u-col span="6">
						<view class=""></view>
					</u-col>
					<u-col span="2">
						<view class="color-active">全部签到</view>
					</u-col>
					<u-col span="1">
						<view class="color-active" @click="getpage">刷新</view>
					</u-col>
					<u-col span="3">
						<view class="color-active" @click="goDetail(null)">查看统计数据</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<view class="content bgwhite">
			<u-list
				@scrolltolower="scrolltolower"
			>
			    <u-list-item>
					<u-row customStyle="margin-bottom: 2upx;margin-top: 2upx">
						<u-col span="1">
							<view class="textcenter">序号</view>
						</u-col>
						<u-col span="3">
							<view class="textcenter">姓名</view>
						</u-col>
						<u-col span="2">
							<view class="textcenter">学号</view>
						</u-col>
						<u-col span="2">
							<view class="textcenter">状态</view>
						</u-col>
						<u-col span="3">
							<view class="textcenter">操作</view>
						</u-col>
						<u-col span="1">
							<view class="textcenter">性别</view>
						</u-col>
					</u-row>
				</u-list-item>
				<u-line color="#2979ff"></u-line>
				<u-list-item
					v-for="(item, index) in swiperList"
					:key="index"
				>
					<u-row :customStyle="{'color': item.state?'green':'red'}">
						<u-col span="1">
							<view class="textcenter mb10">{{index + 1}}</view>
						</u-col>
						<u-col span="3">
							<view class="textcenter mb10" @click="editorItem(item)">{{item.actualName}}</view>
						</u-col>
						<u-col span="2">
							<view class="textcenter mb10" @click="editorItem(item)">{{item.departmentId}}</view>
						</u-col>
						<u-col span="2">
							<view class="textcenter mb10">{{item.state?item.state:'未签到'}}</view>
						</u-col>
						<u-col span="3">
							<view class="textcenter mb10" @click="deleteemple(item)">删除</view>
							<u-modal :show="showmodel" :title="titlemodel" :content='content' @confirm="confirmdelete(item)" @cancel="showmodel=false" @close="showmodel=false"></u-modal>
						</u-col>
						<u-col span="1">
							<view class="textcenter mb10">{{item.gender==1?'男':'女'}}</view>
						</u-col>
					</u-row>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		reactive,
		toRefs,
		computed
	} from 'vue'
	import {
		onLoad,
		onUnload
	} from '@dcloudio/uni-app'
    import {userApi} from '@/api'
    import useStore from '@/store/modules/user';
	
	const state = reactive({
		swiperList: ['序号', '姓名', '学号', '状态', '手机号', '性别'],
		timenow: new Date(),
		users:{
			departmentId: 0,
			disabledFlag: false,
			pageNum: 1,
			pageSize: 100,
		},
		qinjia: 0,
		showmodel: false,
		titlemodel: '删除信息',
		content: ''
	})
	let timer = null
	const store = useStore()
	onLoad(() => {
		timer = setInterval(function () {
		    state.timenow = new Date().toLocaleString()
		})
		getpage()
	})
	onUnload(()=>{
		if (timer) {
		      clearInterval(timer)
	    }
	})
	const getpage = async () =>{
		const userinfo = store.getUserInfo
		state.users.departmentId = userinfo.departmentId
		const captchaResult = await userApi.query(state.users);
		if(captchaResult.ok){
			state.swiperList=captchaResult.data.list;
			state.qinjia = state.swiperList.filter(ih=>ih==1).length
		}else{
			uni.showToast({
			  title: '查询失败',
			});
			state.swiperList=[]
			state.qinjia = 0
		}
	}
    const logout = () =>{
		uni.navigateTo({
			url: "/pages/login/login",
		});
	}
	const editorItem = (item) =>{
		uni.navigateTo({
			url: "/pages/workOrder/editor?item=" + encodeURIComponent(JSON.stringify(item)),
		});
	}
	const goDetail = (item) => {
		uni.navigateTo({
			url: "/pages/workOrder/detail?state=" + encodeURIComponent(JSON.stringify(item)),
		});
	}
	const deleteemple = (item) => {
		state.showmodel = true;
		state.content = "确认删除"+item.loginName+"的账号信息？"
	}
	const confirmdelete = async (item) => {
		const captchaResult = await userApi.deleteple([item.employeeId]);
		state.showmodel=false
		if(captchaResult.ok){
			uni.showToast({
			  title: '操作成功',
			});
			getpage()
		}else{
			uni.showToast({
			  title: '操作失败',
			});
		}
	}
	const {
		swiperList,
		timenow,
		qinjia
	} = toRefs(state)
</script>

<style scoped lang="less">
	.mtps {
		margin-top: 70upx;
	}
	.bigsize {
		font-size: 40upx;
	}
	.chuqin {
		height: 150upx;
		text-align: center;
	    display: flex;
	    justify-content: center;
		align-items:center;
	}
	.centercss {
		height: 50upx;
		line-height:50upx;
		padding-left: 5%;
		padding-right: 5%;
	}
	.margincss {
		padding-top: 10upx;
	}
	.homeimg {
		width: 30upx;
		height: 30upx;
	}
	.homeimg1 {
		width: 31upx;
		height: 31upx;
		margin-right: 10upx;
		line-height: 150upx;
	}
	.homeimg2 {
		width: 40upx;
		height: 40upx;
		margin-top: 10upx;
		margin-left: 10upx;
	}
    .fontcss {
		font-size: 40upx;
	}
    
	.grid-text {
		font-size: 14upx;
		padding: 10npx 0 20npx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}
	.top {
		width: calc(100% - 40upx);
		/* #ifdef APP-PLUS */
		height: 40upx;
		padding-top: calc(20upx + var(--status-bar-height));
		padding-left: 20upx;
		padding-right: 20upx;
		padding-bottom: 20upx;
		/* #endif */

		/* #ifndef APP-PLUS */
		height: 40upx;
		padding: 20upx;
		/* #endif */

		top: 0;
		left: 0;
		position: fixed;
		z-index: 999;
	}

	.ic_image,
	.ic_image image {
		width: 40upx;
		height: 40upx;
	}

	.ic_message {
		margin-left: 25upx;
	}

	.ic_logo {
		position: absolute;
		left: 50%;
		margin-left: -110upx;
		width: 220upx;
		height: 40upx;
	}

	.ic_logo image {
		width: 100%;
		height: 40upx;
	}
	.header {
		width: 100%;
		height: 400upx;
	}

	.uni-slide,
	.uni-slide uni-swiper {
		width: 750upx;
		height: 450upx;
	}

	.uni-slide image {
		width: 100%;
		height: 100%;
	}

	.uni-swiper-msg {
		width: auto;
		height: 60upx;
		display: flex;
		padding: 10upx 20upx;

		uni-swiper {
			height: 100%;
		}

		.uni-swiper-msg-icon {
			width: 60upx;
			height: 60upx;
			display: flex;
			align-items: center;

			image {
				width: 80%;
				height: 80%;
			}
		}

		.uni-swiper-msg-box {
			width: 100%;
			height: 100%;

			.uni-swiper-msg-con {
				height: 100%;
				overflow: hidden;
				display: flex;
				align-items: center;
				color: #6fd8a5;
			}
		}
	}

	.uni-nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding-top: 15upx;

		.uni-nav-con {
			width: 25%;
			text-align: center;
			margin-bottom: 15upx;
		}

		.image-view {
			width: 60upx;
			height: 60upx;
			margin: 10upx auto;
		}

		.image-view image {
			width: 100%;
			height: 100%;
		}
	}



	.event-box {
		padding: 0 20upx;
	}

	.event-box-top,
	.event-box-con {
		display: flex;
		position: relative;
	}

	.event-box-con {
		color: #666;
		padding-bottom: 20upx;
	}

	.event-box-toptitle {
		max-width: 65%;
		font-size: 28upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding: 10upx 0;
	}

	.type {
		margin: 15upx 5upx;
		padding: 0 10upx;
		border-radius: 10upx;
	}

	.event-box-conleft {
		width: 80%;
	}

	.event-box-conright {
		width: 20%;
		text-align: right;
		padding-top: 20upx;
		color: #6fd8a5;
		font-size: 28upx;
	}

	.alarmType {
		width: 30upx;
		height: 50upx;
		position: absolute;
		right: 0;
		top: 0;
	}

	.alarmType:after {
		content: "";
		width: 0;
		height: 0;
		font-size: 0;
		line-height: 0;
		border-left: 15upx solid transparent;
		border-right: 15upx solid transparent;
		border-bottom: 15upx solid #fff;
		position: absolute;
		left: 0;
		bottom: 0;
	}
</style>
