import { createRouter, createWebHistory } from 'vue-router';
import BoardView from '../views/BoardView.vue';
import ProjectView from '../views/ProjectView.vue';

const routes = [
	{
		path: '/',
		name: 'projects',
		component: ProjectView,
	},
	{
		path: '/board',
		name: 'board',
		component: BoardView
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
