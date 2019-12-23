<template>
	<div>
		<div class="row">
			<div v-for="(item, index) in topics" :key="index" class="col-12 flex flex-center">
				<div class="card shadow flex flex-top-y">
					<div class="card-head  flex-center">
						<img :src="item.logo"/>
						<p class="tit">{{ item.topicName }}</p>
					</div>
					<div class="card-body flex ">
						<p class="sub-tit">{{ item.description.slice(0,100) }}.....</p>
					</div>
					<p class="sub-meta">{{ item.articles }}篇文章，{{ item.follows }}人关注</p>
					<div  class="card-box flex">
						<a :href="item.homepage" class="link " @click="go(item.homepage)">专题主页</a>
					</div>
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
			topics: [],
			currentPage: 1,
			count: 6
		};
	},
	created() {
		this.axios
			.get(this.GLOBAL.baseUrl + '/topic', {
				params: {
					page: this.currentPage,
					count: this.count
				}
			})
			.then(res => {
				console.log(res.data.data.length);
				this.topics = res.data.data;
			});
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
<style scoped>
.card {
	width: 90%;
	height: 250px;
	background-image: url(../assets/img/11.jpg);
	background-size: 100%, 100%;
	margin-bottom: 50px;
	padding: 20px;
}
.card-head {
	height: 30%;
	padding: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.card-head img {
	width: 80px;
	height: 80px;
	border-radius: 10px;
	margin-left: 20px;
}
.card-body {
	width: 80%;
	margin: 0 auto;
}
.card-body > p {
	line-height: 30px;
}
.card a {
	color: rgb(0, 98, 89);
	font-weight: 700;
}
.tit{
	font-size: 16px;
	font-weight: 600;
	color: rgba(0, 0, 0, 0.7);
	margin-top: -50px;
	padding-left: 20px;
}
.sub-tit{
	font-size: 15px;
	color: rgba(0, 0, 0, 0.6);
	margin-top: 50px;
	margin-left: -60px;
	padding-bottom: -80px;
}
.sub-meta{
	font-size: 13px;
	color: #b4b4b4;
	margin-left: 150px;
	margin-bottom: -30px;
}
.card-box{
	width: 80%;
	margin-left: 40px;
}

</style>
