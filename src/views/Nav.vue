<template>
  <div>
    <div class="nav primary-fill shadow">
      <div class="nav-bar" >
        <ul class="nav-list flex-around">
          <li class="nav-item" >
            <router-link to="/index" class="rud">主页</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/topics" class="rud">专题</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/articles" class="rud">文章</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/users" class="rud" >作者</router-link>
          </li>
          <li class="nav-item">
            <input type="text" class="input-box" placeholder="搜索" v-model="keywords"/>
          </li>
          <li class="nav-item"><i class="iconfont" @click="search">&#xe89c;</i></li>
          <li class="nav-item" v-if="!this.user">
            <router-link to="/sign-in" class="rud" >登录</router-link>
          </li>
          <!--          <router-link :to="{ path: '/user/' + user.id }" v-if="this.user">-->
          <!--            <img :src="user.avatar" @mouseenter="this.show = true" class="avatar-xs abs-center-right" />-->
          <!--          </router-link>-->

          <li v-if="this.user">
            <el-dropdown @command="handleCommand" style="background-color: #009688;border: #009688">
              <img :src="this.user.avatar" class="avatar-xs abs-center-right"/>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">个人主页</el-dropdown-item>
                <el-dropdown-item command="c">发表文章</el-dropdown-item>
                <el-dropdown-item command="b">账号设置</el-dropdown-item>
				 <el-dropdown-item command="d">VIP设置</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>

          <li class="nav-item" v-if="this.user"><a class="link" @click="logout">退出</a></li>
        </ul>
      </div>
    </div>
    <router-view class="container"/>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        user: JSON.parse(localStorage.getItem('user')),
        keywords: ''
      };
    },
    created() {
    },
    methods: {
      logout() {
        this.user = null;
        localStorage.clear();
      },
      search() {
        let currentPath = this.$route.path;
        // alert(currentPath);
        if (currentPath != '/search' || currentPath != '/search/article' || currentPath != '/search/topic' || currentPath != '/search/usere') {
          this.$router.push({path: '/search', query: {keywords: this.keywords}});
        } else {
          this.$router.push({path: '/empty', query: {keywords: this.keywords}});
        }
      },
      handleCommand(command) {
        if (command === 'a') {
          console.log(this.user.id)
          this.$router.push({path: '/user_detail/' + this.user.id})
        }
        if (command === 'b') {
          this.$router.push({path: '/setting/' + this.user.id})
        }
        if (command === 'c') {
          this.$router.push({path: '/write_article/'})
        }
		if (command === 'd') {
		  this.$router.push({path: '/topup/'})
		}
      }
    }
  };
</script>
<style scoped>
	@font-face {
	  font-family: 'iconfont';  /* project id 1432498 */
	  src: url('//at.alicdn.com/t/font_1432498_dg9j63089r.eot');
	  src: url('//at.alicdn.com/t/font_1432498_dg9j63089r.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1432498_dg9j63089r.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1432498_dg9j63089r.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1432498_dg9j63089r.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1432498_dg9j63089r.svg#iconfont') format('svg');
	}
	
	.iconfont {
		color: #000000;
		font-family: "iconfont" !important;
		font-size: 32px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
		margin-left: -70px;
	}
  /* 路由激活高亮样式 */
  .router-link-active {
    background-color: rgba(0, 0, 0, 0.35);
    font-weight: 700;
  }
  .rud{
    border-radius: 40px;
  }

  .container {
    margin-top: 80px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
