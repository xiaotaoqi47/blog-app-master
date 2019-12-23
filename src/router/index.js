import Vue from 'vue'
import VueRouter from 'vue-router'

import Nav from '@/views/Nav.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'

import Index from '@/views/Index.vue'
import Articles from '@/views/Articles.vue'
import Topics from '@/views/Topics.vue'
import Users from '@/views/Users.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import TopicDetail from '@/views/TopicDetail.vue'
import UserDetail from '@/views/UserDetail.vue'

import Search from '@/views/Search.vue'
import SearchUser from '@/views/SearchUser.vue'
import SearchTopic from '@/views/SearchTopic.vue'
import SearchArticle from '@/views/SearchArticle.vue'


import Basic from '@/views/Basic.vue'
import Setting from '@/views/Setting.vue'
import Empty from '@/views/Empty.vue'
import Tab1  from '@/views/Tab1.vue'
import Tab2  from '@/views/Tab2.vue'
import Essay from '@/views/Essay.vue'
import Topup from '@/views/Topup.vue'
import Dynamic from '@/views/Dynamic.vue'

import WriteArticle from "../views/WriteArticle/WriteArticle";


Vue.use(VueRouter)

const routes = [{
		path: '/',
		component: Nav,
		children: [{
				path: '/',
				redirect: 'index'
			},
			{
				path: 'write_article',
				component: WriteArticle,
				
			},
			{
							path:'topup',
							component:Topup
						},

			{
				path: 'index',
				component: Index,
				children:[{
					path:'/',
					redirect:'tab1'
				},
				{
					path:'tab1',
					component:Tab1
				},
				{
					path:'tab2',
					component:Tab2
				},
				]
			},
			{
				path: 'articles',
				component: Articles
			},
			{
				path: 'article/:id',
				component: ArticleDetail
			},
			{
				path: 'topics',
				component: Topics
			},
			{
				path: 'topic/:id',
				component: TopicDetail
			},
			{
				path: 'users',
				component: Users
			},
			{
				path: 'user_detail/:id',
				component: UserDetail,
				children:[
				{
					path:'/',
					redirect:'essay'
				},
				{
					path:'essay',
					component:Essay
				},
				{
					path:'dynamic',
					component:Dynamic
				},
				]
			},
			{
				path: 'setting/:userId',
				component: Setting
			},
			{
					path :'search',
					component:Search,
					children:[
						{
							path: '/',
							redirect: 'article'
						},
						{
							path: 'article',
							component: SearchArticle
						},
						{
							path: 'topic',
							component: SearchTopic
						},
						{
							path: 'user',
							component: SearchUser
						}
					]
			},
			{
				path: 'empty',
				component: Empty
			}
		]
	},
	{
		path: '/sign-in',
		component: SignIn
	},
	{
		path: '/sign-up',
		component: SignUp
	}
]

const router = new VueRouter({
	routes
})

export default router
