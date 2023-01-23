// Global css imported
import '../public/reset.css'

// Other imports
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LoadingSpinner from './components/ui/LoadingSpinner.vue'

const app = createApp(App)
app.component(LoadingSpinner)

app.use(router)
app.use(store)
app.mount('#app')