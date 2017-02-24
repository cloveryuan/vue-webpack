import Vue from 'vue'
import App from './index.vue'
import iView from 'iview';

Vue.use(iView);

new Vue({
  el: 'body',
  components: { App }
})
