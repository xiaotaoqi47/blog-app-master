<template>
	<div id="bg">
		<router-link to="/">首页</router-link>
		<div class="login-box">
			<form class="login-form">
				<div class="box">
					<label>{{accountTip}}</label>
					<i class="iconfont">&#xe74c;</i>
					<input type="text" v-model="userDto.mobile" id="mobile" />
				</div>
				<div class="box">
					
				   <i class="iconfont">&#xe675;</i>
				   <input type="password" v-model="userDto.password" />
				</div>
				<div class="code-box">
					<input type="text" v-model="userDto.code" class="code" />
					<img class="verify" @click.prevent="refresh" ref="codeImg" />
				</div>
				<input type="button" class="btn btn-lg dark-fill" value="登录" @click="signIn(userDto)" />
				<router-link to="/sign-up">没有账号？去注册</router-link>
			</form>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			userDto: {
				mobile: '',
				password: '',
				code: ''
			},
			token: ''
		};
	},
	created() {
		this.axios.get(this.GLOBAL.baseUrl + '/code', { responseType: 'blob' }).then(res => {
			// console.log(res);
			var img = this.$refs.codeImg;
			let url = window.URL.createObjectURL(res.data);
			img.src = url;
			console.log(res.headers);
			//取得后台通过响应头返回的sessionId的值
			this.token = res.headers['access-token'];
			console.log(this.token);
		});
	},
	methods: {
		signIn(userDto) {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/user/sign-in',
				data: JSON.stringify(this.userDto),
				headers: {
					'Access-Token': this.token  //将token放在请求头带到后端
				}
			}).then(res => {
				if (res.data.msg === '成功') {
					alert('登录成功');
					localStorage.setItem('user', JSON.stringify(res.data.data));
					this.$router.push('/');
				} else {
					alert(res.data.msg);
					this.userDto.code = '';
				}
			});
		},
		refresh() {
			this.axios.get(this.GLOBAL.baseUrl + '/code', { responseType: 'blob' }).then(res => {
				console.log(res);
				var img = this.$refs.codeImg;
				let url = window.URL.createObjectURL(res.data);
				img.src = url;
			});
		}
	}
};
</script>
<style scoped>
#bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url(../assets/img/bg.jpeg);
}
.login-box {
	width: 550px;
	height: 360px;
	border: 2px solid #fff;
	border-radius: 10px;
	background-color: rgb(255,255,255, 0.6);
	position: absolute;
	top: 200px;
	left: 30%;
	
}
.login-form {
	padding-top: 10px;
	width: 70%;
	margin: 0 auto;
	text-align: left;
	
}
.login-form input {
	width: 100%;
	height: 40px;
	outline: none;
	border: none;
	margin-bottom: 10px;
	border-radius: 5px;
	
}
.code{
	background-color: rgb(255,255,255, 0.6);
	padding-left: 20px;
}
.code-box {
	display: flex;
	margin-top: 10px;
	margin-bottom: 20px;
	justify-content: space-between;
}
.verify {
	flex: 0 0 40%;
	height: 40px;
	border-radius: 5px;
}
.verify:hover {
	cursor: pointer;
}
.code {
	flex: 0 0 40%;
	height: 40px;
}
a {
	color: #008b8b;
	font-weight: 700;
}
@font-face {
	font-family: 'iconfont';  /* project id 1432360 */
	src: url('//at.alicdn.com/t/font_1432360_9n4xgigdcq5.eot');
	src: url('//at.alicdn.com/t/font_1432360_9n4xgigdcq5.eot?#iefix') format('embedded-opentype'),
	url('//at.alicdn.com/t/font_1432360_9n4xgigdcq5.woff2') format('woff2'),
	url('//at.alicdn.com/t/font_1432360_9n4xgigdcq5.woff') format('woff'),
	url('//at.alicdn.com/t/font_1432360_9n4xgigdcq5.ttf') format('truetype'),
	url('//at.alicdn.com/t/font_1432360_9n4xgigdcq5.svg#iconfont') format('svg');
			}
.iconfont{
	font-family:"iconfont"!important;
	font-size:20px;
	font-style:normal;
	color:#aaa;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}
.box{
	width: 100%;
	height: 70px;
	margin-bottom: 20px;
	
}
.box label{
	display: block;
	padding-top: 15px;
	height: 15px;
	
}
.box i{
	position: relative;
	top:33px;
	padding-left: 5px;
}
.box input{
	display: block;
	width: 100%;
	height: 43px;
	border: 0 solid #ccc;
	background-color: rgb(255,255,255, 0.6);
	padding-left: 35px;
	padding-top: 5px;
	
}
</style>
