<template>
  <div class="row">
    <div v-for="(item, index) in topics" :key="index" class="col-12">
      <div class="media-wraaper shadow">
        <div class="media-left">
          <img :src="item.logo" class="avatar-lg link"/>
          <p>{{ item.topicName }}</p>
        </div>
        <div class="media-middle">
          <p>{{ item.description.slice(0,30)}}</p>
          <p>
            <span class="meta gutter">{{ item.articles }}篇文章</span>
            <span class="meta gutter">{{ item.follows }}人关注</span>
          </p>
        </div>
        <div class="media-right">
          <button class="btn btn-lg btn-rd warning-fill">关注</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        topics: [],
        keywords: ''
      };
    },
    created() {
      this.keywords = this.$route.query.keywords;
      console.log(this.keywords);
      this.axios
        .get(this.GLOBAL.baseUrl + '/topic', {
          params: {
            keywords: this.keywords
          }
        })
        .then(res => {
          this.topics = res.data.data;
        });
    },
    methods: {}
  };
</script>
<style></style>
