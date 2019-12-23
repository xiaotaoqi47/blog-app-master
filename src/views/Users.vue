<template>
	<div>
		
		<div class="row">
			
			<div v-for="(item, index) in users" :key="index" class="col-4">
				<div class="card shadow  media-wraaper ">
					<div class="card-head flex flex-center">
						<router-link :to="{ path: '/user/' + item.id }">
							<img :src="item.avatar" />
							<p class="title tit">{{ item.nickname }}</p>
							

						</router-link>
						<div class="card-box ">
							<a :href="item.homepage" class="link" @click="go(item.homepage)">个人主页</a>
						</div>
						
					</div>
					<div class="pic">
						<img src="../assets/img/3.png"  >
					</div>
					<div class="card-body flex flex-left">
						<p class="sub-title">{{ item.introduction }}</p>
						<p class="meta">
							<strong>来自：{{ item.address.slice(0,5) }}</strong>
						</p>
						<p class="meta sub">{{ item.articles }}篇文章，{{ item.fans }}个粉丝</p>
					</div>
				</div>
				<div class="flex-center-y">
					<li class="btn btn-follow" v-if="item.status" @click="changeThumbUps1(item)">关注</li>
					<li class="btn btn-follow" v-if="!item.status" @click="changeThumbUps1(item)">已关注</li>
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
				users: [],
				currentPage: 1,
				count: 6

			};
		},
		created() {
			this.axios
				.get(this.GLOBAL.baseUrl + '/user', {
					params: {
						page: this.currentPage,
						count: this.count
					}
				})
				.then(res => {
					console.log(res.data.data.length);
					this.users = res.data.data;
				});
		},
		methods: {
			loadMore() {
				this.currentPage = this.currentPage + 1;
				this.axios
					.get(this.GLOBAL.baseUrl + '/user', {
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
							this.users.splice(this.currentPage * this.count, 0, temp[i]);
						}
						console.log(this.users.length);
					});
			},
			go(page) {
				window.location.href = page;
			},
			changeThumbUps1(item) {
				if (item.status == 0) {
					item.status = 1
					item.fans--
				} else {
					item.status = 0
					item.fans++
				}
			}
		}
	};
</script>
<style scoped>
	.pic{
		width: 30px;
		height: 40px;
		margin-top: 70px;
		margin-left: -40px;
	}
	
	.tit1{
		text-align: center;
		padding-top: 5px;
		font-size: 14px;
		font-weight: 500;
	}
	.btn-follow {
		color: #f56c6c;
		background: #fef0f0;
		border: #fbc4c4 solid;
		border-radius: 10px;
		padding: 10px 20px;
		text-align: center;
		font-size: 16px;
		-webkit-transform: scale(0.7);
		margin-top: -280px;
		margin-left: -40px;
	}

	.card {
		width: 85%;
		height: 230px;
		background-size: 100%, 100%;
		margin-bottom: 30px;
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
		border-radius: 50%;
		margin-left: -20px;
	}

	.card-body {
		width: 80%;
		margin: 0 auto;
	}

	.card-body>p {
		line-height: 30px;
	}

	.card a {
		color: rgb(0, 98, 89);
		font-weight: 700;
	}

	.card-box {
		margin-top: 25px;
		margin-left: -45px;

	}

	.tit {
		margin-left: 5px;
		margin-top: 5px;
	}

	.sub {
		margin-top: 50px;
		margin-left: -95px;
	}
</style>
