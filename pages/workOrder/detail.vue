<template>
	<view>
		<view class="margincss">
			<text class="fontcss mr10" @click="logout"><image src="/static/images/index/back.png" class="homeimg2"></image></text>
			<text class="fontcss mr10">统计分析</text>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		reactive,
		toRefs
	} from 'vue'
	import {
		onShow,
		onLoad,
	} from '@dcloudio/uni-app'
	const state = reactive({
		detail: {
			title: ""
		}
	})
	onLoad((e) => {
		state.detail = JSON.parse(decodeURIComponent(e.detail));
		uni.setNavigationBarTitle({
			title: state.detail.title
		})
	})
	const {
		detail
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
