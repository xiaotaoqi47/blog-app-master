<template>
	<div>
		<div class="row">
					<div class="col-3" v-for="(item, index) in topics" :key="index">
						<div class="card link shadow">
							<router-link :to="{ path: '/topic/' + item.id }"><img :src="item.logo" class="logo" /></router-link>
							<p class="title">{{ item.topicName }}</p>
							<p class="sub-title">{{ item.description.slice(0, 20) }}...</p>
							<p class="meta">
								<span class="gutter">{{ item.articles }}篇文章,</span>
								<span>{{ item.follows }}人关注</span>
							</p>
						</div>
					</div>
				</div>
				<div class="row"><button class="btn btn-lg btn-rd dark-fill" @click="loadMore">点击加载更多</button></div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				articles: [],
				users: [],
				topics: [],
				currentIndex: 0,
				timer: null,
				currentPage: 1,
				count: 8
			};
		},
		created() {
			// this.axios.get(this.GLOBAL.baseUrl + '/article').then(res => {
			// 	// console.log(res.data.data);
			// 	this.articles = res.data.data;
			// });
			// this.axios.get(this.GLOBAL.baseUrl + '/user').then(res => {
			// 	// console.log(res.data.data);
			// 	this.users = res.data.data;
			// });
			this.axios
				.get(this.GLOBAL.baseUrl + '/topic', {
					params: {
						page: this.currentPage,
						count: this.count
					}
				})
				.then(res => {
					// console.log(res.data.data.length);
					this.topics = res.data.data;
				});
			// this.axios.get(this.GLOBAL.baseUrl + '/topic').then(res => {
			// 	// console.log(res.data.data);
			// 	this.topics = res.data.data;
			// });
		},
		methods: {
			loadMore() {
				this.currentPage = this.currentPage + 1;
				this.axios
					.get(this.GLOBAL.baseUrl + '/topic', {
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
							this.topics.splice(this.currentPage * this.count, 0, temp[i]);
						}
						console.log(this.topics.length);
					});
			},
			go(page) {
				window.location.href = page;
			}
			
		}
	};
</script>

<style>
</style>
