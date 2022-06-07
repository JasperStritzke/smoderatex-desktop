import {createApp} from 'vue'
import './index.css'
import App from './App.vue'
import router from "./plugins/router";
import VueFeather from "vue-feather";
import {createPinia} from "pinia";

createApp(App)
    .use(router)
    .use(createPinia())
    .component(VueFeather.name, VueFeather)
    .mount('#app')
