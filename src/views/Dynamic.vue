<template>
	<div >
		<div v-for="(item, index) in articles" :key="index" class="col-12">
			<div class="media-wraaper  shadow">
				<div class="media-right">
					<img :src="item.article.thumbnail" class="thumnail-xs"/>
				</div>
				<div class="media-middle ">
					<router-link :to="{ path: '/article/' + item.article.id }">
						<p class="tit">
							<span>{{ item.article.id }}</span>
							{{ item.article.title }}
						</p>
					</router-link>
					<p class="sub-title link">{{ item.article.summary }}</p>
					<p>
						<span class="meta">{{ item.article.comments }}评论</span>
						<span class="meta">{{ item.article.likes }}喜欢</span>
					</p>
				</div>
				
			</div>
		</div>

		<div class="col-12"><button class="btn btn-lg warning-fill" @click="loadMore">点击加载更多</button></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			articles: [],
			currentPage: 1,
			count: 20
		};
	},
	created() {
		this.axios
			.get(this.GLOBAL.baseUrl + '/article', {
				params: {
					page: this.currentPage,
					count: this.count
				}
			})
			.then(res => {
				console.log(res.data.data.length);
				this.articles = res.data.data;
			});
	},
	methods: {
		loadMore() {
			this.currentPage = this.currentPage + 1;
			this.axios
				.get(this.GLOBAL.baseUrl + '/article', {
					params: {
						page: this.currentPage,
						count: this.count
					}
				})
				.then(res => {
					console.log(res.data.data.length);
					let temp = [];
					temp = res.data.data;
					for (var i = 0; i < temp.length; i++) {
						this.articles.splice(this.currentPage * this.count, 0, temp[i]);
					}
					console.log(this.articles.length);
				});
		}
	}
};
</script>

<style scoped="scoped">
.tit{
	color: #E57373;
}
</style>
