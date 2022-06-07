import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
} from 'vue-router';
import App from "../views/app/ApplicationHome.vue";
import Dashboard from "../views/app/pages/Dashboard.vue";
import Login from "../views/Login.vue";
import NotFoundPage from "../views/app/pages/NotFoundPage.vue";
import {useAuth} from "./store/auth";

const routes: RouteRecordRaw[] = [
    {
        path: "/app/",
        component: App,
        meta: {requiresAuth: true},
        children: [
            {
                name: "Dashboard",
                path: "dashboard",
                component: Dashboard
            },
            {
                path: "404",
                name: "404",
                component: NotFoundPage,
            },
        ]
    },
    {
        path: "/login",
        component: Login,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to) => {
    if (to.meta?.requiresAuth == true && !useAuth().isLoggedIn) {
        return "/login";
    }
})

router.beforeEach((to) => {
    if (to.matched.length === 0) {
        return "/app/404"
    }
})

export default router;
