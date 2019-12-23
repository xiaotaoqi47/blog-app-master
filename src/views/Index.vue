<template>
	<div>
		<div class="cont">
		  <div class="left">
		   <div class="carousel-wrap">
		   	<transition-group tag="ul" class="slide-ul" name="slide">
		   		<li v-for="(item,index) in slideList"
		   		 :key="index"
		   		  v-show="index===currentIndex" 
		   		  @mouseenter="stop"
		   		   @mouseleave="go">
		   			<a :href="item.url">
		   				<img :src="item.image" :alt="item.description">
		   			</a>
		   		</li>
		   	</transition-group>
		   	<div class="carousel-items">
		   		<span v-for="(item,index) in slideList" :class="{active:index===currentIndex}" @mouseover="change(index)"></span>
		   	</div>
		   </div>
		  </div>
		   <div class="right">
		     <h3>社区热点</h3>
			 
			 <div class="button">
			 <button class="btn btn-sm btn-rd">文学</button>
			 <button class="btn btn-sm btn-rd">流行</button>
			 <button class="btn btn-sm btn-rd">文化</button>
			 <button class="btn btn-sm btn-rd">生活</button>
			 <button class="btn btn-sm btn-rd">经管</button>
			 <button class="btn btn-sm btn-rd">科技</button>
			 <button class="btn btn-sm btn-rd">通讯</button>
			 <button class="btn btn-sm btn-rd">交互</button>
		   </div>
		   
		   <h3>关注我们</h3>
		   <br>
		   <i class="iconfont">&#xe63d;</i>
		   <h4 class="text">经典阅读</h4>
		   <p class="text1">精品文章每日推送</p>
		   <img src="../assets/img/ma.jpg" class="img">
		   </div>
		</div>
		<div class="col">
			<h3>热门作者</h3>
						<div v-for="(item, index) in users" :key="index" class="row">
							<div class="col-12 border box">
								<div class="flex-center-y">
									<router-link :to="{ path: '/user/' + item.id }">
									<img :src="item.avatar" class="avatar" />
									</router-link>
									<p class="sub-title">{{ item.nickname }}</p>
								</div>
								<div class="flex-center-y">
									<p class="meta">{{ item.fans }}个粉丝</p>
									<p class="meta">写了{{ item.articles }}篇文章</p>
								</div>
								<div  v-if="item.flag ===0 " class="flex-center-y"><button class="btn btn-follow" v-on:click="clickfans(item.id , 0 )">关注</button></div>
								<div  v-else class="flex-center-y"><button class="btn btn-follow" v-on:click="clickfans(item.id , 1 )">取消关注</button></div>
							</div>
						</div>
					</div>
		
			<div class="boxx">
				<div class="l-left">
			          <div class="tab">
						<router-link to="/index/Tab1">
							<h2>每日精选</h2>
						</router-link>
			          </div>
					  <div class="tab">
						<router-link to="/index/Tab2">
							<h2>关注动态</h2>
						</router-link>
						</div>
				</div>
				<div class="l-right">
					<router-view />
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
			id:null,
			currentIndex: 0,
			timer: null,
			count: 9,
			currentPage: 1,
			slideList: [{
					"url": "#",
					"description": "one",
					"image": "http://ww1.sinaimg.cn/large/006acpLLly1g9t75k0ox5j30l40akjs8.jpg"
				},
				{
					"url": "#",
					"description": "two",
					"image": "http://ww1.sinaimg.cn/large/006acpLLly1g9t766mu3uj30l40akqf4.jpg"
				},
				{
					"url": "#",
					"description": "three",
					"image": "http://ww1.sinaimg.cn/large/006acpLLly1g9t77itkz0j30l40akq92.jpg"
				},
				{
					"url": "#",
					"description": "four",
					"image": "http://ww1.sinaimg.cn/large/006acpLLly1g9ydgovukwj30l40akjrs.jpg"
				},
				{
					"url": "#",
					"description": "five",
					"image": "http://ww1.sinaimg.cn/large/006acpLLly1g9y8swmzutj30l40ak75q.jpg"
				}
			
			]
		};
	},
	beforeCreate() {

	},
	created() {
		var user = JSON.parse(localStorage.getItem("user"));
		this.id=user.id ;

		this.axios.get(this.GLOBAL.baseUrl + '/article').then(res => {
			// console.log(res.data.data);
			this.articles = res.data.data;
		});
		this.axios.get(this.GLOBAL.baseUrl + '/user', {params: {f_user: user.id } }).then(res => {
			// console.log(res.data.data);
			this.users = res.data.data;

		});
		this.axios.get(this.GLOBAL.baseUrl + '/topic').then(res => {
			// console.log(res.data.data);
			this.topics = res.data.data;
		});


	},
	methods:{
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
		clickfans(id  ,index ){
			if(index=== 0 ){
				this.axios.get(this.GLOBAL.baseUrl + '/userFan', {params: {f_user: this.id,
						t_user:id,}
				}).then(res => {
					console.log(res);
				});
			}else{

				this.axios.get(this.GLOBAL.baseUrl + '/userFaned', {params: {f_user: this.id,
						t_user:id,}
				}).then(res => {
					console.log(res);
				});
			}
			this.$router.go(0)
		}
	}
};
</script>

<style scoped="scoped">
	
	.avatar{
		height: 70px;
		width: 70px;
		border-radius: 50%;
	}
	@font-face {
	  font-family: 'iconfont';  /* project id 1432498 */
	  src: url('//at.alicdn.com/t/font_1432498_0bo9jnilz6s7.eot');
	  src: url('//at.alicdn.com/t/font_1432498_0bo9jnilz6s7.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1432498_0bo9jnilz6s7.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1432498_0bo9jnilz6s7.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1432498_0bo9jnilz6s7.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1432498_0bo9jnilz6s7.svg#iconfont') format('svg');
	}
	
	.iconfont{
		color: #4CAF50;
	    font-family:"iconfont" !important;
	    font-size:32px;font-style:normal;
	    -webkit-font-smoothing: antialiased;
	    -webkit-text-stroke-width: 0.2px;
	    -moz-osx-font-smoothing: grayscale;
		}
	.cont{
	  width: 90%;
	  margin: 0 auto;
	  /* height: 600px; */
	  display: flex;
	  margin-top: 100px;
	  border: 1px solid #eee;
	 
	}
	.col{
		width: 250px;
		height: 100px;
		margin-left: 950px;
		margin-top: 10px;
		
	}
.l-right{
			margin-left: 210px;
			margin-top: -65px;
		}
.boxx{
			width: 995px;
			margin-left: -50px;
			margin-top: -80px;
		}
.img{
			width: 100px;
			height: 100px;
		}
.logo {
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}
.logo:hover {
	opacity: 0.6;
}

.btn-follow{
	    color: #f56c6c;
	    background:rgb(232, 181, 152,0.3);
	    border: 3px solid rgb(232, 181, 152,0.3);
	    border-radius: 10px;
	    padding: 10px 25px;
	    text-align: center;
	    font-size: 16px;
	    -webkit-transform: scale(0.7);
	  }
.left{
      flex: 0 0 80%;
      height: 100%;
    }
    .right{
      flex: 0 0 25%;
      height: 100%;
      margin-left: 15px;
	  margin-top: 5px;
      background-color: #FFFFFF;
    }
.carousel-wrap {
		position: relative;
		height: 400px;
		overflow: hidden;
		border: 1px solid #000000;
		
	}
	.tab{
		margin-left: 115px;
	}
	.slide-ul {
		width: 100%;
		height: 100%;
	}
	
	.slide-ul li {
		position: absolute;
		top:0;
		left:0;
		width: 100%;
		height: 100%;
	}
	
	.slide-ul li img {
		width: 100%;
		height: 100%;
	}
	
	.carousel-items {
		z-index: 100;
		position: relative;
		top: -25px;
		text-align: center;
		font-size: 0;
		
		
	}
	
	.carousel-items span {
		display: inline-block;
		width: 6px;
		height: 6px;
		margin: 0 5px;
		background-color: #eee;
		cursor: pointer;
		border-radius: 50%;
	}
	
	.carousel-items .active {
		background-color: #FFA500;
	}
	
	/* 动画 */
	.slide-enter-to {
		transition: all 1s ease;
		transform: translateX(0);
	}
	
	.slide-leave-active {
		transition: all 1s ease;
		transform: translateX(-100%)
	}
	
	.slide-enter {
		transform: translateX(100%)
	}
	
	.slide-leave {
		transform: translateX(0)
	}
</style>
