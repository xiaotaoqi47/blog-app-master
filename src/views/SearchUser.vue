<template>
	<div class="row">
		<div v-for="(item, index) in users" :key="index" class="col-12">
			<div class="media-wraaper shadow">
				<div class="media-left">
					<img :src="item.avatar" class="avatar-lg link" />
					<p>{{ item.nickname }}</p>
				</div>
				<div class="media-middle">
					<p>{{ item.introduction}}</p>
					<p>
						<span class="meta gutter">写了{{ item.articles }}篇文章</span>
						<span class="meta gutter">{{ item.fans }}个粉丝</span>
						<span class="meta gutter">关注了{{ item.follows }}人</span>
					</p>
				</div>
				<div class="media-right"><button class="btn btn-lg btn-rd warning-fill">关注</button></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			users: [],
			keywords: ''
		};
	},
	created() {
		this.keywords = this.$route.query.keywords;
		console.log(this.keywords);
		this.axios
			.get(this.GLOBAL.baseUrl + '/user', {
				params: {
					keywords: this.keywords
				}
			})
			.then(res => {
				console.log(res.data.data.length);
				this.users = res.data.data;
			});
	},
	methods: {}
};
</script>
<style></style>
