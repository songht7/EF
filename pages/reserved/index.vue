<template>
	<view class="page">
		<view class="content">
			<filter-box :location="location" :category="category" :ageGroup="ageGroup" :swiperList="swiperList"></filter-box>
		</view>
		<list-block :list="list"></list-block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
