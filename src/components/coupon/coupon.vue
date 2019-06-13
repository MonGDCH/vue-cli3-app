<template>
	<div class="coupon-item">
		<div class="style-six">
			<div class="info-box">
				<p class="nick">Elm平台优惠券</p>
				<div class="coupon-money">
					<div class="lay of">￥<span>10</span></div>
					<div class="lay">
						<p class="tit">优惠劵</p>
						<p class="demand">满100元可用</p>
					</div>
				</div>
			</div>
			<a href="javascript:void(0);" class="get-btn">
				<span>点击领取</span>
			</a>
		</div>
	</div>
</template>
<script>
export default {

}
</script>
<style scoped>
.coupon-item{
	border: 1px solid #ccc;
	border-radius: 4px;
	overflow: hidden;
}
.coupon-item .nick {
	padding: .66% 0;
	/*color: #CC3300;*/
}

.coupon-item .coupon-money {
	width: 100%;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	font-size: .38rem;
	align-items: center;
}

.coupon-item .coupon-money span {
	font-size: 1rem;
}

.coupon-item .coupon-money .lay:last-child {
	flex: 1;
	padding: 0 3%;
	line-height: .5rem;
}

.style-six {
	width: 100%;
	height: 2rem;
	position: relative;
	margin: 5% 0;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #fff;
	border: 1px solid #E5004F;
}

.style-six .info-box{
	-webkit-box: 1;
	-webkit-flex: 1;
	flex: 1;
	padding: 0 3% 0 5%;
	position: relative;
}

.style-six .get-btn{
	width: 24%;
	height: 2rem;
	text-align: center;
	color: #fff;
	background-color: #E5004F;
	position: relative;
}

.style-six .get-btn span {
	width: 100%;
	height: 2rem;
	line-height: 2rem;
	display: inline-block;
	font-size: .4rem;
	word-break: break-all;
}

.style-six .get-btn{
	width: 28%;
	background-color: #fff;
}

.style-six {
	background-color: #F7DBCD;
	color: #E5004F;
	border: none;
}

.style-six .get-btn span {
	color: #E5004F;
}

.coupon-item * {
	margin: 0;
	padding: 0;
}
</style>