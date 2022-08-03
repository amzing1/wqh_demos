import { createRouter, createWebHistory } from 'vue-router';
import Bezier from '../components/Bezier.vue'

const routes = [
    {
        path: '/',
        name: 'bezier',
        component: Bezier
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;

