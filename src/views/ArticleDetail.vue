<template>
	<div class="container border">
		<h2 class="title">{{ articleVo.article.title }}</h2>
		<div class="box">
			<img :src="articleVo.author.avatar" class="avatar-xs" />
			<span class="meta gutter">{{ articleVo.author.nickname }}</span>
			<span class="meta gutter">
				{{ articleVo.article.createTime.date.year }}年{{ articleVo.article.createTime.date.month }}月{{ articleVo.article.createTime.date.day }}日 {{ articleVo.article.createTime.time.hour }}:{{
					articleVo.article.createTime.time.minute
				}}:{{ articleVo.article.createTime.time.second }}
			</span>
			<button class=" btn-botton1" v-on:click="clicklike">{{like_content}}</button>
		</div>
		<div v-html="articleVo.article.content"></div>
		<hr/>
		<p>精彩评论</p>
			<div>
					<textarea style="width: 600px; height: 110px ; margin-left: 80px;"  placeholder="写下你的评论" v-model="comment">{{comment}}</textarea>
					<button class="btn-botton " v-on:click="clicktext">发送</button>
				</div>
			
			<div v-for="( data,index) in comment_content" :key='index' >
				<div class="col-12 border cmtbox">
					<div>{{data.name}}评论此文章：{{data.comment}}</div>
					<button class="btn-botton"  v-on:click="deletecomment(data.id)">删除</button>
				</div>
			</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			articleVo: {},
			content:[] ,
			user_id:"",
			id:null,
			like_content:"喜欢",
			comment_content:[],
			comment:"",
		};
	},
	created() {
		this.id= this.$route.params.id;
		var user = JSON.parse(localStorage.getItem("user"));
		this.user_id =user.id ;
		this.axios.get(this.GLOBAL.baseUrl + '/article/' + this.id).then(res => {
			this.articleVo = res.data.data;
		});

		this.axios.get(this.GLOBAL.baseUrl + '/like', {params: {article: this.id,
						user:this.user_id,}
				}).then(res => {
				if(res.data.code == 1){
					this.like_content = "取消喜欢";
				}

		});
		this.axios.get(this.GLOBAL.baseUrl + '/comment' , {
			params:{
				article:this.id,
			}
		}).then(res => {
			console.log(res.data.data)
			this.comment_content=res.data.data ;
		});
	},
	computed: {},
	methods: {
		deletecomment(index){
			console.log(this.id)
			this.axios.get(this.GLOBAL.baseUrl + '/delete/comment', {params: {article: this.id,
					user:this.user_id,
					id:index,
				}
			}).then(res => {
			});
			this.$router.go(0)

		},
		clicktext(){
			console.log(this.comment)
			this.axios.get(this.GLOBAL.baseUrl + '/add/comment', {params: {article: this.id,
					user:this.user_id,
					content:this.comment,
				}
			}).then(res => {

				this.comment="" ;
			});
			this.$router.go(0)
		},
		clicklike(){

			if(this.like_content ==="喜欢"){
				this.axios.get(this.GLOBAL.baseUrl + '/add/like', {params: {article: this.id,
						user:this.user_id,}
				}).then(res => {
					console.log(res);
				});
				this.like_content = "取消喜欢";
			}else{
				this.like_content="喜欢"
				this.axios.get(this.GLOBAL.baseUrl + '/delete/like', {params: {article: this.id,
						user:this.user_id,}
				}).then(res => {
					console.log(res);
				});
			}

		}
	}
};
</script>

<style scoped="scoped">

.btn-botton1 {
        width: 120px;
		height: 40px;
	    color: #eee;
	    background: rgb(233, 30, 99,0.7);
	    border: 1px solid #E91E63;
	    border-radius: 5px;
	    padding: 5px 20px;
	    text-align: center;
	    font-size: 18px;
	
	    -webkit-transform: scale(0.7);
	  
	
}
.btn-botton {
        width: 100px;
	    color: #f56c6c;
	    background: rgb(232, 181, 152,0.3);
	    border: 1px solid rgb(232, 181, 152,0.3);
	    border-radius: 5px;
	    padding: 5px 20px;
	    text-align: center;
	    font-size: 18px;
	
	    -webkit-transform: scale(0.7);
	  
	
}
.box{
	height: 50px;
	line-height: 50px;
}
.btn{
	background-color: orangered;
	font-weight: 400;
	font-size: 15px;
	color: #fff;
	padding: 5px 0;
	width: 80px;
	height: 30px;
	border-radius: 5px;
	display: inline-block;
	text-align: center;
}
	.author{
		align-content: center;
	}
	.cmt{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

.cmtbox{
	display: flex;
	justify-content: space-around;
	height: 70px;
	padding: 10px;
}
</style>
