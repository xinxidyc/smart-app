<template>
	<view>
		<view><l-echart class="chart" ref="chart"></l-echart></view>
	</view>
	<view class="paddcss">
		<u-tabs :list="list" @click="select"></u-tabs>
		<view v-if="index==0">
			<u--form :model="searchForm" ref="uForm" labelWidth="0">
				<u-form-item label="" prop="text" borderBottom>
					<u-input v-model="searchForm.text" border="bottom" placeholder="请输入手机号或者账号"/>
				</u-form-item>
				<u-form-item label="" prop="isDate" borderBottom>
					<input type="text" v-model="searchForm.isDate" @click="show=!show"/>
				</u-form-item>
			</u--form>
			<u-list>
				<u-list-item
					v-for="(item, index) in indexList"
					:key="index"
				>
					<u-cell
						:title="`列表长度-${index + 1}`"
					>
						<template #icon>
							<u-avatar
								shape="square"
								size="35"
								:src="item.url"
								customStyle="margin: -3px 5px -3px 0"
							></u-avatar>
						</template>
					</u-cell>
				</u-list-item>
			</u-list>
		</view>
		<view v-if="index==1">
			
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
		onReady
	} from '@dcloudio/uni-app'
	import * as echarts from 'echarts'
	import useStore from '@/store/modules/user';
	
	const datetimePicker = ref(null);
	let chart = ref(null); // 获取dom
	const keyword = ref('')
	const store = useStore()
	const state = reactive({
		detail: {
			title: ""
		},
		option:{},
		indexList: [{
			url:'https://cdn.uviewui.com/uview/album/1.jpg'
		},{
			url:'https://cdn.uviewui.com/uview/album/2.jpg'
		}],
		list:[{
			name: '按班级查询',
		}, {
			name: '按学生查询',
		}],
		index: 0,
		show: false,
		searchForm:{
			text:'',
			isDate:''
		}
	})
	const search = (e) =>{
		
	}
	const select = (index) => {
		state.index = index
	}

	const formatter =(type, value) =>{
			if (type === 'year') {
				return `${value}年`;
			}
			if (type === 'month') {
				return `${value}月`;
			}
			if (type === 'day') {
				return `${value}日`;
			}
			return value;
		}
		
	const confirm =async (e) =>{
		debugger
			state.show = false;
			const timeFormat = uni.$u.timeFormat;
			let timeValue = await timeFormat(e.value, 'yyyy-mm');
			state.searchForm.isDate = timeValue;

		}
	onLoad((e) => {
		// state.detail = JSON.parse(decodeURIComponent(e.detail));
		// uni.setNavigationBarTitle({
		// 	title: state.detail.title
		// });
		const userinfo = store.getUserInfo
		debugger
		if(userinfo.departmentName.includes('班'))
		state.option = {
		  title: {
			text: 'Referer',
			left: 'center'
		  },
		  tooltip: {
			trigger: 'item'
		  },
		  legend: {
			orient: 'vertical',
			left: 'right'
		  },
		  series: [
			{
			  name: 'Access From',
			  type: 'pie',
			  radius: '50%',
			  data: [
				{ value: 1048, name: 'Search Engine' },
				{ value: 735, name: 'Direct' },
				{ value: 580, name: 'Email' },
				{ value: 484, name: 'Union Ads' },
			  ],
			  emphasis: {
				itemStyle: {
				  shadowBlur: 10,
				  shadowOffsetX: 0,
				  shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			  }
			}
		  ]
		};
		setTimeout(()=>{
			const myChart = echarts.init(chart.value);
			myChart.setOption(state.option)
		},300)
		
	})
	const {
		detail,
		indexList,
		index,
		list,
		show,
		searchForm
	} = toRefs(state)
</script>

<style scoped lang="less">
	.chart {
		width: 700upx;
		height: 650upx;
	}
	.paddcss {
		padding: 10upx;
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
