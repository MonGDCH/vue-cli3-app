<template>
	<div>
		<list 
			:loading="isLoading" 
			:finished="isFinished" 
			@load="load"
		>
			<table class="table">
				<tbody>
					<tr class="list-row" v-for="(item, index) in list" :key="index">
						<td class="order">
							<span class="label" :style="{backgroundColor: rangeColor()}">第{{item.order}}名</span>
						</td>
						<td class="opt">
							<span @click="selectUser(item)">{{item.id}}. {{item.name}}</span>
						</td>
						<td class="num">
							<span>{{item.number}}票</span>
						</td>
					</tr>
				</tbody>
			</table>
		</list>
	</div>
</template>
<script>
import { List } from 'vant';
export default {
	components: {
		List
	},
	props: {
		list: {
			type: Array,
			default: () => {
				return [];
			}
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
		isFinished: {
			type: Boolean,
			default: true
		},
	},
	computed: {
		
	},
	methods: {
		// 选择用户
		selectUser(item){
			this.$emit('select', item);
		},
		// 加载更多
		load(){
			this.$emit('load');
		},
		// 随机颜色
		rangeColor(){
			const colors = [
				'330066', '#00FF33', '009900', '000066', '003399', '0066FF', '3300CC', '3333CC', '336633', '339966', '33CC99', 
				'FF0000', 'FF3333', 'FF6699', 'FF9933'
			];

			return '#' + colors[ Math.floor(Math.random() * colors.length) ];
		}
	}
}
</script>
<style scoped>
.table{
	width: 100%;
	border-collapse: collapse;
    border-spacing: 0;
}
.table th, .table td{
	border-top: 1px solid #dddddd;
    line-height: 20px;
    padding: 8px;
    text-align: left;
    vertical-align: top;
}
.order{
	width: 58px;
}
.order .label{
	background-color: #996600;
    color: #ffffff;
    display: inline-block;
    font-size: 11.844px;
    font-weight: bold;
    line-height: 16px;
    padding: 2px 6px;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    vertical-align: baseline;
    white-space: nowrap;
    border-radius: 4px;
}
.opt{
	color: #08c
}
.num{
	width: 80px;
}

/*table{
	border-collapse: collapse;
	margin: 0 auto;
	text-align: center;
	width: 100%;
}
table td, table th{
	border: 1px solid #cad9ea;
	color: #666;
	height: 30px;
}
table thead th{
	background-color: #CCE8EB;
	width: 100px;
}
table tr:nth-child(odd){
	background: #fff;
}
table tr:nth-child(even){
	background: #F5FAFA;
}*/
</style>
