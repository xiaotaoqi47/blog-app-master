<template>
	<div></div>
</template>

<script>
export default {
	data() {
		return {
			keywords:''
		};
	},
	mounted() {
		this.keywords = this.$route.query.keywords
		this.$router.push({ path: '/search', query: { keywords: this.keywords } });
	}
};
</script>

<style></style>
