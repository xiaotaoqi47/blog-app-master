<template>
	<div id="bg">
		<div class="login-box">
			<form class="login-form">
				<div class="box">
					<label>{{accountTip}}</label>
					<i class="iconfont">&#xe74c;</i>
					<input type="text"  v-model="userDto.mobile" id="mobile" />
				</div>
				<div class="box">
					
				   <i class="iconfont">&#xe675;</i>
				   <input type="password" v-model="userDto.password" />
				</div>
				<input type="button" class="btn btn-lg dark-fill" value="注册" @click="signUp(userDto)" />
				<!-- <div class="header">
						
						<button class="btn-round1"@click="showBox">新增用户</button>
					</div>  -->
				<router-link to="/sign-in">已有账号？去登录</router-link>
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
				password: ''
			}
		};
	},
	created() {
		var number = Math.ceil(Math.random() * 10);
		this.codeUrl = this.GLOBAL.baseUrl + '/code?num = ' + number;
	},
	methods: {
		signUp(userDto) {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/user/sign-up',
				data: JSON.stringify(this.userDto)
			}).then(res => {
				if (res.data.msg === '成功') {
					alert('注册成功');
					this.$router.push('/sign-in');
				} else {
					alert(res.data.msg);
				}
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
	padding-top: 20px;
	width: 70%;
	margin: 0 auto;
	text-align: left;
}
.login-form input {
	width: 100%;
	height: 35px;
	outline: none;
	border: none;
	margin-bottom: 20px;
	border-radius: 5px;
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
	font-size:22px;
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
