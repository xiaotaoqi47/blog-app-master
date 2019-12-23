<template>
	
  <div style="width: 600px;position: center">
	  
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item  >
        <el-upload
          class="avatar-uploader"
          action="http://localhost:9091/api/upload"
          :show-file-list="false"
          :on-success="uploadSuccess"
          name="filename">
          <el-avatar :size="100">
            <img :src="form.avatar"/>
          </el-avatar>
        </el-upload>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input type="text" v-model="form.nickname"/>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input type="text" v-model="form.mobile"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.gender" label="男">男</el-radio>
        <el-radio v-model="form.gender" label="女">女</el-radio>
		<el-radio v-model="form.gender" label="保密">保密</el-radio>
      </el-form-item>
      <el-form-item label="地址">
        <div class="num">
			<select class="se">
        
		    <option>不限</option>
		
        	<option>中国</option>
        
        	<option>美国</option>
        
        	<option>英国</option>
        
        	<option>新加坡</option>
        
        	<option>法国</option>
        
        	<option>其他...</option>
        
        	<option>其他...</option>
        
        	<option>其他...</option>
        
        	<option>其他...</option>
        
        	<option>其他...</option>
        
        	<option>其他...</option>
        
        	<option>其他...</option>
        
        	<option>其他...</option>
        
        	<option>其他...</option>
        
        	<option>其他...</option>
        
        	<option>其他...</option>
        
        	<option>其他...</option>
        
        	<option>其他...</option>
        
        
        </select>
		<select>
			
			<option>不限</option>
		
		    <option>江苏省</option>
		    		
		    <option>四川省</option>
		    		
		    <option>广东省</option>
		    		
		    <option>黑龙江省</option>
		    		
		    <option>吉林省</option>
		
			<option>其他...</option>
		
			<option>其他...</option>
		
			<option>其他...</option>
		
		
			<option>其他...</option>
		
			<option>其他...</option>
		
			<option>其他...</option>
		
			<option>其他...</option>
		
			<option>其他...</option>
		
			<option>其他...</option>
		
			<option>其他...</option>
		
		</select>
		</div>
		
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="form.address"
          type="date" placeholder="时间"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input type="text" v-model="form.introduction"/>
      </el-form-item>
      <el-form-item>
        <button class="btn-botton " @click="onSubmit">
          保存设置
        </button>
        <!--        <el-button style="background-color: #009688;border: #009688;color: #ffffff" @click="onSubmit">保存</el-button>-->
      </el-form-item>
    </el-form>
	
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          userId: 0,
          mobile: '',
          password: '',
          nickname: '',
          avatar: '',
          gender: '',
          birthday: '',
          introduction: '',
        }
      }
    },
    methods: {
      init() {
        this.form.userId = this.$router.currentRoute.params.userId
        this.axios.get(this.GLOBAL.baseUrl + '/user?userId=' + this.form.userId).then(res => {
          const user = res.data.data
          this.form.mobile = user.mobile
          this.form.password = user.password
          this.form.nickname = user.nickname
          this.form.avatar = user.avatar
          this.form.gender = user.gender
          this.form.birthday = '' + user.birthday.year + '-' + user.birthday.month + '-' + user.birthday.day
          this.form.introduction = user.introduction
        });
      },
      onSubmit() {
        let times = this.form.birthday.split('-')
        this.axios({
          method: 'post',
          url: this.GLOBAL.baseUrl + '/user/update',
          data: {
            userId: this.form.userId,
            mobile: this.form.mobile,
            password: this.form.password,
            nickname: this.form.nickname,
            avatar: this.form.avatar,
            gender: this.form.gender,
            birthday: {
              year: times[0],
              month: times[1],
              day: times[2]
            },
            introduction: this.form.introduction,
          }
        }).then(() => {
          this.init()
        })
      },
      uploadSuccess(response, file, fileList) {
        console.log(response)
        if (response.code === 0) {
          this.form.avatar = response.msg
          this.axios.post(this.GLOBAL.baseUrl + '/user/changeAvatar', {
            userId: JSON.parse(localStorage.user).id,
            avatar: this.form.avatar
          }).then((res) => {
            let user = JSON.parse(localStorage.user)
            user.avatar = this.form.avatar
            localStorage.setItem('user', JSON.stringify(user));
            location.reload()

          }).catch((err) => {
          })
        }
      }
    },
    mounted() {
      this.init()
    },
    created() {

    },
    computed: {},

  };
</script>

<style scoped>

.se{
	padding-right: 10px;
	margin-right: 10px;
}
.btn-botton {
          width: 120px;
		  height: 50px;
  	    color: #f56c6c;
  	    background: rgb(232, 181, 152,0.3);
  	    border: 1px solid rgb(232, 181, 152,0.3);
  	    border-radius: 10px;
  	    padding: 10px 25px;
  	    text-align: center;
  	    font-size: 16px;
  		margin-top: 10px;
  	    -webkit-transform: scale(0.7);
  	  
  	
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
