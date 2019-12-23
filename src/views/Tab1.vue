<template>
	<div>
		
		<div v-for="(item, index) in articles" :key="index" class="col-12">
			<div class="media-wraaper border">
				<div class="media-left">
					<router-link :to="{ path: '/user/' + item.article.userId }">
						<img :src="item.author.avatar" class="avatar-lg link" />
					</router-link>
					<p>{{ item.author.nickname }}</p>
					<strong>来自</strong>
					<p>{{ item.topic.topicName }}</p>
				</div>
				<div class="media-middle flex flex-around flex-left">
					<router-link :to="{ path: '/article/' + item.article.id }" class="subtitle">
						{{ item.article.title }}
					</router-link>
					<p class="sub-title link">{{ item.article.summary }}</p>
					<p >
						<li class="btn meta tit" v-if="!item.status" @click="changeThumbUps1(item)"><i class="iconfont">&#xe8ad;</i>{{ item.article.likes }}赞</li>
						<li class="btn meta tit" v-if="item.status" @click="changeThumbUps1(item)" ><i class="iconfont">&#xe8ad;</i>{{ item.article.likes }}赞</li>
						<span class="meta gutter"><i class="iconfont">&#xe8b4;</i>{{ item.article.comments }}评论</span>
						
					</p>
				</div>
			</div>
		</div>
		
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
			count: 9,
			currentPage: 1,
		};
	},
	created() {
		this.axios.get(this.GLOBAL.baseUrl + '/article').then(res => {
			// console.log(res.data.data);
			this.articles = res.data.data;
		});
		this.axios.get(this.GLOBAL.baseUrl + '/user').then(res => {
			// console.log(res.data.data);
			this.users = res.data.data;
		});
		this.axios.get(this.GLOBAL.baseUrl + '/topic').then(res => {
			// console.log(res.data.data);
			this.topics = res.data.data;
		});
	},
	methods: {
		go() {
			this.timer = setInterval(() => {
				this.autoPlay()
			}, 3000)
		},
		stop() {
			clearInterval(this.timer)
			this.timer = null
		},
		change(index) {
			this.currentIndex = index
		},
		autoPlay() {
			this.currentIndex++
			if (this.currentIndex > this.slideList.length - 1) {
				this.currentIndex = 0
			}
		},
		changeThumbUps1(item) {
							if (item.status == 1) {
								item.status = 0
								item.article.likes++
							} else {
								item.status = 1
								item.article.likes--
							}
						},
	}
};
</script>

<style>
.tit{
    padding-right: 10px;
}
@font-face {
  font-family: 'iconfont';  /* project id 1432509 */
  src: url('//at.alicdn.com/t/font_1432509_z9mns755f8b.eot');
  src: url('//at.alicdn.com/t/font_1432509_z9mns755f8b.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1432509_z9mns755f8b.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1432509_z9mns755f8b.woff') format('woff'),
  url('//at.alicdn.com/t/font_1432509_z9mns755f8b.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1432509_z9mns755f8b.svg#iconfont') format('svg');
}
@font-face {
  font-family: 'iconfont';  /* project id 1432509 */
  src: url('//at.alicdn.com/t/font_1432509_u1680hy7pr.eot');
  src: url('//at.alicdn.com/t/font_1432509_u1680hy7pr.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1432509_u1680hy7pr.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1432509_u1680hy7pr.woff') format('woff'),
  url('//at.alicdn.com/t/font_1432509_u1680hy7pr.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1432509_u1680hy7pr.svg#iconfont') format('svg');
}
.iconfont{
		color: rgb(255, 126, 126);
	    font-family:"iconfont" !important;
	    font-size:18px;
		font-style:normal;
	    -webkit-font-smoothing: antialiased;
	    -webkit-text-stroke-width: 0.2px;
	    -moz-osx-font-smoothing: grayscale;
		}
</style>
