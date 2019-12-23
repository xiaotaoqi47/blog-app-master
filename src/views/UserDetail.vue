<template>
  <div class="container">
   <div class="banner flex flex-center"><img :src="userVo.user.banner" class="cover shadow" /></div>
   <!-- <div class="info">
   	<img :src="userVo.user.avatar" class="avatar" />
   	<h2>{{ userVo.user.nickname }}</h2>
   	<p class="title-fans-left"> 写了{{userVo.user.articles}}篇文章  {{userVo.user.fans}}粉丝</p>
   	<p class="title-detail">{{ userVo.user.introduction.slice(0, 300) }}</p>
   	
   </div > -->
   <div class="info">
   			<img :src="avatar" class="avatar link" @click="handleClick()" v-if="userVo.user.id === this.id" />
   			<img :src="avatar" class="avatar link" v-else />
   			<input type="file" @change="changeAvatar($event)" style="display: none;" id="fileBox" />
   			<p>{{ userVo.user.nickname }}</p>
			<p class="title-fans-left"> 写了{{userVo.user.articles}}篇文章  {{userVo.user.fans}}粉丝</p>
			<p class="title-detail">{{ userVo.user.introduction.slice(0, 300) }}</p>
			
   		</div>
     <div class="boxx">
     	<div class="l-left">
               <div class="tab">
     			 <ul> 
     		       <li>
     			     <router-link :to="{ path: '/user_detail/'+userVo.user.id+'/essay'}">
     				      <p class="bg">文章</p>
     			     </router-link>
     			    </li>
     			</ul>
               </div>
     		  <div class="tab">
     			<ul>
     			   <li>
     			     <router-link :to="{ path: '/user_detail/'+userVo.user.id+'/dynamic'}">
     				      <p class="bg">喜欢</p>
     			     </router-link>
     			    </li>
     			</ul>
     			</div>
     	</div>
     	<div class="l-right">
     		<router-view />
     	</div>
     </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        userVo: {
          user: {},
          articleList: []
        },
		avatar: '',
					show: true,
					id: JSON.parse(localStorage.getItem('user')).id
      };
    },
    created() {
      var id = this.$route.params.id;
      this.axios.get(this.GLOBAL.baseUrl + '/user/' + id).then(res => {
        console.log(res.data.data);
        this.userVo = res.data.data;
		this.avatar = this.userVo.user.avatar;
      });
    },
    methods: {
      //点击头像，即模拟点击文件选择组件
      		handleClick: function() {
      			document.getElementById('fileBox').click();
      		},
      		changeAvatar: function() {
      			var _this = this;
      			let formData = new FormData();
      			// alert(event.target.files[0].name);
      			formData.append('file', event.target.files[0]);
      			this.$http({
      				method: 'post',
      				url: this.GLOBAL.baseUrl + '/upload',
      				headers: {
      					'Content-Type': 'multipart/form-data'
      				},
      				data: formData,
      				processData: false,
      				contentType: false
      			}).then(function(uploadFileRes) {
      				console.log(uploadFileRes.data.data);
      				_this.avatar = uploadFileRes.data.data;
      			});
      			//调用修改头像的方法
      			// this.updateAvatar();
      		},
			updateAvatar: function() {
						this.$http({
							method: 'put',
							url: this.GLOBAL.baseUrl + '/user',
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							data: {
								mobile: this.user.mobile,
								avatar: this.avatar
							}
						}).then(re => {
							console.log(res.data.code);
						});
					},
      clickdelete(index){
        var id = this.$route.params.id;
        this.axios.get(this.GLOBAL.baseUrl +'/article/delete' ,{params:{
              user : id,
            article:index ,
          }}).then(res => {
          console.log(res.data.data);
          this.userVo = res.data.data;
        });
        this.$router.go(0)
      },


      showDetail(id) {
        this.$router.push({path: '/article/' + id})
      }
    }
  };
</script>

<style scoped="scoped">
.bg{
			font-size: 15px;
			padding: 5px;
			color: #4E342E;
			font-weight: 550;

		}

.l-right{
			margin-left: 180px;
			margin-top: -110px;
		}

.boxx{
			width: 80%;
			margin-left: 80px;
			margin-top: 40px;
		}
.tab{
	margin-left: 120px;
}
.title-detail{
	font-size: 12px;
	color: rgb(170, 170, 170);
	
}
.title-fans-left{
	font-size: 16px;
	color: rgb(119, 119, 119);
	padding-top: 13px;
	padding-bottom: 10px;
	margin-left: 0px;
	word-spacing: 15px;
}
  .btn-botton {
          width: 100px;
		  height: 50px;
  	    color: #f56c6c;
  	    background: rgb(232, 181, 152,0.3);
  	    border: 1px solid rgb(232, 181, 152,0.3);
  	    border-radius: 5px;
  	    padding: 10px 25px;
  	    text-align: center;
  	    font-size: 16px;
  		margin-top: 120px;
  	    -webkit-transform: scale(0.7);
  	  
  	
  }
  .banner {
    width: 100%;
    height: 300px;
  }

  .cover {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

 .info {
 	position: relative;
 	top: -60px;
 	left: 0px;
 	margin-bottom: -50px;
 	text-align: center;
 	border-radius: 20px;
 }
.info img {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	border: 2px solid #fff;
	
}

  .row {
    margin-top: -50px;
  }
 ul {
 	width: 100%;
 }
 li {
 	width: 100%;
 	margin-bottom: 10px;
 	border-radius: 5px;
 }
 li a {
 	display: block;
 	color: rgb(51, 51, 51);
 	height: 45px;
 	width: 11%;
 	margin-left: -25px;
 	padding-top: 10px;
 	padding-left: 30px;
 }
 li a:hover {
 	background-color: rgb(240, 250, 250);
 }
 .router-link-active {
 	background-color: rgb(250, 250, 250);
 }
</style>
